/**
 * S3 bucket handlers
 *
 */

//Import dependencies
require("dotenv").config();
var AWS = require("aws-sdk");
const sharp = require("sharp");
const path = require("path");
const constantsUtil = require("./constants.util");

//Details required to connect to the S3 bucket
const bucketName = process.env.BUCKET_NAME;
// const region = process.env.AWS_REGION;
// const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
// const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

//AWS S3 Bucket file utilities
class S3Utilities {
  /**
   * Construct S3 client for S3 handling
   */
  constructor() {
    //For live deployment
    this.s3 = new AWS.S3({
      region: "ap-southeast-2",
    });
  }

  /**
   * Process and upload an event image to S3 bucket
   * @param {*} uniqueFilename
   * @param {*} buffer
   * @param {*} mimetype
   * @returns
   */
  async uploadEventImg(uniqueFilename, buffer, mimetype) {
    //Sharp-processed image buffer
    let imgBuffer = await sharp(buffer)
      .resize(1440, 548)
      .jpeg({ quality: 80 })
      .withMetadata()
      .toBuffer();
    //Upload image to S3 bucket
    await this.uploadFile(imgBuffer, uniqueFilename, mimetype)
      .then((result) => {
        console.log("Event Image upload success");
        console.log(result);
        return uniqueFilename;
      })
      .catch((err) => {
        console.log("S3 Event Image upload failed");
        console.log(err);
      });
  }

  /**
   * Process and upload a profile image to S3 bucket
   * @param {*} uniqueFilename
   * @param {*} buffer
   * @param {*} mimetype
   */
  async uploadProfileImage(uniqueFilename, buffer, mimetype) {
    //Sharp-processed image buffer
    let imgBuffer = await sharp(buffer)
      .resize(350, 350)
      .jpeg({ quality: 80 })
      .withMetadata()
      .toBuffer();
    //Upload image to S3 bucket
    await this.uploadFile(imgBuffer, uniqueFilename, mimetype)
      .then((result) => {
        console.log("Profile Image upload success");
        console.log(result);
        return uniqueFilename;
      })
      .catch((err) => {
        console.log("S3 Profile Image upload failed");
        console.log(err);
      });
  }

  /**
   * Delete a profile image from S3 bucket
   * @param {*} filename
   */
  async deleteProfileImage(filename) {
    return await this.deleteFile(filename).catch((err) => {
      console.log("An error occured while deleting a Profile Image");
      console.log(err);
    });
  }

  /**
   * Delete an event image from S3
   * @param {*} filename
   */
  async deleteEventImage(filename) {
    //Don't delete seeded event images as they are shared
    if (!filename.includes("seed-event-images")) {
      return await this.deleteFile(filename).catch((err) => {
        console.log("An error occured while deleting an Event Image");
        console.log(err);
      });
    } else {
      console.log("Seeded event images cannot be deleted!");
      return;
    }
  }

  /**
   * Generate a unique filename for an S3 file
   * @param {*} oldFilename
   * @returns The unique filename
   */
  generateUniqueFilename(oldFilename) {
    return (
      Date.now() +
      Math.random().toString(24).slice(2, 12) +
      path.extname(oldFilename)
    );
  }

  /**
   * Upload file to S3 bucket
   * @param {*} buffer
   * @param {*} filename
   * @param {*} mimetype
   */
  async uploadFile(buffer, filename, mimetype) {
    //Upload options
    const uploadParams = {
      Bucket: bucketName,
      Body: buffer,
      Key: filename + mimetype,
      ContentType: mimetype,
      ACL: "public-read",
    };
    //Upload
    return await this.s3.upload(uploadParams, () => {}).promise();
  }

  /**
   * Delete file from S3 bucket
   * @param {*} filename
   */
  async deleteFile(filename) {
    //Delete options
    const deleteParams = {
      Bucket: bucketName,
      Key: filename + constantsUtil.IMG_EXT,
    };
    //Delete
    return await this.s3.deleteObject(deleteParams, () => {}).promise();
  }
}

//Export S3Utilities
module.exports = new S3Utilities();
