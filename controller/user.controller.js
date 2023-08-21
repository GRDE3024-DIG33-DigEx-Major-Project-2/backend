/**
 * Endpoint functions for user-related tasks
 *
 */

//Import dependencies
const enumUtil = require("../util/enum.util");
const { db } = require("../db/models/db");
//Load required db models for querying
const { Organizer, Attendee } = db.models;
//Db handler for creating users
const CreateUserHandler = require("../db/handlers/users/create.handler");
//Db handler for deleting users
const DeleteUserHandler = require("../db/handlers/users/delete.handler");
//Db handler for updaing users
const UpdateUserHandler = require("../db/handlers/users/update.handler");
//Auth-related utilities
const authUtil = require("../util/auth.util");
//S3 bucket storage utilities
const s3Util = require("../util/s3.util");
const constantsUtil = require("../util/constants.util");

//Endpoint actions for user routers
class UserController {
  /**
   * Register a new user
   * @param {*} req
   * @param {*} res
   */
  Create = async (req, res) => {
    //Find if an Attendee or Organizer is already associated with the email
    let isAttendee = await CreateUserHandler.IsEmailTaken(
      enumUtil.userTypes.attendee,
      req.body.email,
      res,
    );
    let isOrganiser = await CreateUserHandler.IsEmailTaken(
      enumUtil.userTypes.organizer,
      req.body.email,
      res,
    );

    //If email is taken regardless of user type, return 400 response
    if (isAttendee == true || isOrganiser == true) {
      let msg = "Email is taken already";
      console.log(msg);
      return res.status(400).json({
        msg: msg,
      });
    }

    //Create user in db
    let user = await CreateUserHandler.CreateUser(req.body, res);

    //Send back 201 status wih the newly created user instance
    return res.status(201).json({ user: user });
  };

  /**
   * Update a user
   * @param {*} req
   * @param {*} res
   */
  Update = async (req, res) => {
    //User data from access token
    let tokenData = req.user;
    //S3 filename of image, excluding the extension
    let profileImgFilename = "";

    //Flags if profile image has been uploaded
    let hasUploaded = false;
    //Flags if profile image filename should be updated
    let noReplacement = false;
    //Flags if profile image will see no changes
    let unchangedImg = true;

    console.clear();
    console.log("REQUEST BODY: ", req.body);
    console.log("TOKEN DATA: ", tokenData.user);

    //Updated User data in db
    try {
      let newData;
      const result = await db.transaction(async (t) => {
        //Upload profile image
        if (req.file && req.file.buffer) {
          profileImgFilename = s3Util.generateUniqueFilename(req.body.filename);
          try {
            //Upload new image
            await s3Util.uploadProfileImage(
              profileImgFilename,
              req.file.buffer,
              constantsUtil.IMG_EXT,
            );

            hasUploaded = true;
            unchangedImg = false;

            //Existing profile image exists, delete it
            if (
              tokenData.user.imgFilename != null &&
              tokenData.user.imgFilename != ""
            ) {
              console.log("One to new one");
              await s3Util.deleteProfileImage(tokenData.user.imgFilename);
              console.log("Old profile image deleted");
            } else {
              unchangedImg = false;
              console.log("None to One");
            }
          } catch (error) {
            console.log(error);
            return res.status(400).json({
              message: "Image deletion failed",
            });
          }
        }
        //Remove image without replacement
        try {
          //If profile image is flagged for removal
          if (
            tokenData.user.imgUrl != null &&
            (req.body.removeImg == "true" || req.body.removeImg == true) &&
            !req.body.filename
          ) {
            console.log("One to none");
            if (hasUploaded == false) {
              console.log("Setting profile image filename to empty string");
              noReplacement = true;
              profileImgFilename = "";
              unchangedImg = false;
            }

            console.log(
              "Deleting profile image without replacement",
              tokenData.user.imgFilename,
            );
            await s3Util
              .deleteProfileImage(tokenData.user.imgFilename)
              .then((result) => {
                console.log("Profile image deleted without replacement");
                console.log(result);
              });
          }
        } catch (error) {
          console.log(error);
          return res.status(400).json({
            message: "Profile Image removal without replacement failed",
          });
        }

        console.log("NO REPLACEMENT: ", noReplacement);

        newData = await UpdateUserHandler.Update(
          req.body,
          profileImgFilename,
          tokenData,
          t,
          noReplacement,
          unchangedImg,
        );

        //Send back 201 status wih the newly updated access token
        const accessToken = authUtil.generateAccessToken(newData);
        const refreshToken = authUtil.generateRefreshToken(newData);

        //Set refresh token as HTTP Only cookie
        res.cookie("refreshToken", refreshToken, { httpOnly: true });

        return res.status(200).json({
          accessToken: accessToken,
          user: newData,
        });
      });
    } catch (err) {
      //Delete file from S3 if it was uploaded in this instance
      if (profileImgFilename != "")
        s3Util.deleteProfileImage(profileImgFilename);
      const msg = "Failed to update user data in db";
      console.log(msg, err);
      res.status(500).json({
        msg: msg,
        error: err,
      });
    }
  };

  /**
   * Reset a user's password
   * @param {*} req
   * @param {*} res
   */
  ResetPassword = async (req, res) => {
    //The user row in the db
    let user;
    //User data from access token
    let tokenData = req.user.user;

    //Find the user in the db for password verification
    if (tokenData.userType == enumUtil.userTypes.attendee)
      user = await Attendee.findByPk(tokenData.id);
    else if (tokenData.userType == enumUtil.userTypes.organizer)
      user = await Organizer.findByPk(tokenData.id);

    //Verify current password
    if (authUtil.verify(req.body.oldPassword, user.password)) {
      //Update the user's password
      try {
        const result = await db.transaction(async (t) => {
          if (tokenData.userType == enumUtil.userTypes.attendee) {
            await Attendee.update(
              {
                password: req.body.newPassword,
              },
              {
                where: {
                  id: tokenData.id,
                },
              },
            ).then((value) => {
              //Send back 200 status after password updated
              return res
                .status(200)
                .json({ msg: "Successfully updated password" });
            });
          } else if (tokenData.userType == enumUtil.userTypes.organizer) {
            await Organizer.update(
              {
                password: req.body.newPassword,
              },
              {
                where: {
                  id: tokenData.id,
                },
              },
            ).then((value) => {
              //Send back 200 status after password updated
              return res
                .status(200)
                .json({ msg: "Successfully updated password" });
            });
          }
        });
      } catch (err) {
        const msg = "Failed to update password";
        console.log(msg, err);
        res.status(500).json({
          msg: msg,
          error: err,
        });
      }
    }
    //Password invalid, send 400 response
    else {
      return res.status(400).json({
        msg: "Invalid credentials",
      });
    }
  };

  /**
   * Delete a user and all related data in db
   * @param {*} req
   * @param {*} res
   * @returns
   */
  Delete = async (req, res) => {
    //User data from access token
    let tokenData = req.user.user;

    //Delete User-related data and images
    try {
      const result = await db.transaction(async (t) => {
        const deleteResult = await DeleteUserHandler.Delete(tokenData, t);
        //Send back 200 status once user has been deleted
        return res.status(200).json(deleteResult);
      });
    } catch (err) {
      const msg = "Failed to delete all User-related data";
      console.log(msg, err);
      res.status(500).json({
        msg: msg,
        error: err,
      });
    }
  };
}

//Export the user controller
module.exports = UserController;
