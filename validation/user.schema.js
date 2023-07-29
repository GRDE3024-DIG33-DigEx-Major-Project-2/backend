/**
 * User endpoint request validation schemas
 */

//Import dependencies
const enumUtil = require("../util/enum.util");
const { PhoneNumberUtil, PhoneNumberType } = require("libphonenumber-js");

/**
 * Custom validator that checks for identical old and new password
 * @param {*} oldPassword
 * @param {*} param1
 * @returns true if passwords are not identical, else throws error
 */
const notIdentical = (oldPassword, { req }) => {
  if (oldPassword === req.body.newPassword) {
    throw new Error("New password must be different!");
  }
  return true;
};

const userTypeSpecificFields = (userType, { req }) => {
  //The userType value in the request
  userType = req.body.userType;
  //Validate Organizer-specific fields
  if (userType == enumUtil.userTypes.organizer) {
    if (!req.body.organizationName || !req.body.phoneNumber) {
      throw new Error(
        "Organization name and phone number are required for Organizer",
      );
    }
  }
  //Validate Attendee-specific fields
  else if (userType == enumUtil.userTypes.attendee) {
    //Throw error if required fields are missing
    if (!req.body.firstName || !req.body.lastName || !req.body.dob) {
      throw new Error(
        "First name, last name, and date of birth are required for Attendee",
      );
    }
  }
  //Throw error if userType is not a valid type
  else {
    throw new Error("userType must be either Attendee or Organizer!");
  }
  return true;
};

/**
 * User-related request schemas
 */
const userSchemas = {
  //Reset password schema
  resetPassword: {
    oldPassword: {
      isString: true,
      isLength: {
        options: { min: 6 },
        errorMessage: "Password must be at least 6 characters",
      },
      custom: {
        options: notIdentical,
      },
      errorMessage: "Invalid old password",
    },
    newPassword: {
      isString: true,
      isLength: {
        options: { min: 6 },
        errorMessage: "Password must be at least 6 characters",
      },
      errorMessage: "Invalid new password",
    },
  },
  //Register schema
  registerUser: {
    email: {
      in: ["body", "email"],
      isEmail: true,
      errorMessage: "Invalid email",
    },
    password: {
      in: ["body", "password"],
      isString: true,
      isLength: {
        options: { min: 6 },
        errorMessage: "Password must be at least 6 characters",
      },
      errorMessage: "Invalid password",
    },
    userType: {
      in: ["body", "userType"],
      isString: true,
      isIn: {
        options: [[enumUtil.userTypes.attendee, enumUtil.userTypes.organizer]],
      },
      errorMessage: "Invalid userType",
    },
    //Custom validator for userType-related fields
    optionalFields: {
      in: ["body"],
      custom: {
        options: userTypeSpecificFields,
      },
    },
    firstName: {
      in: ["body", "firstName"],
      optional: { options: { nullable: true } },
      isString: true,
      errorMessage: "Invalid firstName",
    },
    lastName: {
      in: ["body", "lastName"],
      optional: { options: { nullable: true } },
      isString: true,
      errorMessage: "Invalid lastName",
    },
    dob: {
      in: ["body", "dob"],
      optional: { options: { nullable: true } },
      isISO8601: true,
      errorMessage: "Invalid dob",
    },
    organizationName: {
      in: ["body", "organizationName"],
      optional: { options: { nullable: true } },
      isString: true,
      errorMessage: "Invalid organizationName",
    },
    phoneNumber: {
      in: ["body", "phoneNumber"],
      optional: { options: { nullable: true } },
      custom: {
        options: (val) => {
          try {
            const phoneNumber = phoneUtil.parseAndKeepRawInput(val, "AU");

            //Check if the number is either a landline or a mobile number
            const phoneNumberType = phoneUtil.getNumberType(phoneNumber);

            if (
              phoneNumberType === PhoneNumberType.FIXED_LINE ||
              phoneNumberType === PhoneNumberType.MOBILE
            )
              return true;
            else throw new Error("Invalid phone number");
          } catch (error) {
            throw new Error("Failed to validate Organizer phone number");
          }
        },
      },
      isString: true,
      errorMessage: "Invalid phoneNumber",
    },
  },
  //Update User schema
  updateUser: {
    bio: {
      in: ["body", "bio"],
      optional: { options: { nullable: true } },
      isString: true,
      errorMessage: "Invalid bio",
    },
    phoneNumber: {
      in: ["body", "phoneNumber"],
      optional: { options: { nullable: true } },
      custom: {
        options: (val) => {
          try {
            const phoneNumber = phoneUtil.parseAndKeepRawInput(val, "AU");

            //Check if the number is either a landline or a mobile number
            const phoneNumberType = phoneUtil.getNumberType(phoneNumber);

            if (
              phoneNumberType === PhoneNumberType.FIXED_LINE ||
              phoneNumberType === PhoneNumberType.MOBILE
            )
              return true;
            else throw new Error("Invalid phone number");
          } catch (error) {
            throw new Error("Failed to validate Organizer phone number");
          }
        },
      },
      isString: true,
      errorMessage: "Invalid phoneNumber",
    },
    firstName: {
      in: ["body", "firstName"],
      optional: { options: { nullable: true } },
      isString: true,
      errorMessage: "Invalid firstName",
    },
    lastName: {
      in: ["body", "lastName"],
      optional: { options: { nullable: true } },
      isString: true,
      errorMessage: "Invalid lastName",
    },
    dob: {
      in: ["body", "dob"],
      optional: { options: { nullable: true } },
      isISO8601: true,
      errorMessage: "Invalid dob",
    },
    organizationName: {
      in: ["body", "organizationName"],
      optional: { options: { nullable: true } },
      isString: true,
      errorMessage: "Invalid organizationName",
    },
    removeImg: {
      in: ["body", "removeImg"],
      isIn: {
        options: ["true", "false"],
      },
      errorMessage: "Invalid removeImg",
    },
  },
};

//Export user-related schemas
module.exports = userSchemas;
