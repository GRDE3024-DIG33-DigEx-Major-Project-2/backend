/**
 * Auth endpoint request validation schemas
 */

/**
 * Auth-related request schemas
 */
const authSchemas = {
  //Login schema
  login: {
    email: {
      in: ["body"],
      errorMessage: "Invalid credentials",
      isEmail: true,
    },
    password: {
      in: ["body"],
      isString: true,
      isLength: {
        options: { min: 6 },
        errorMessage: "Password must be at least 6 characters",
      },
      errorMessage: "Invalid credentials",
    },
  },
};

//Export auth-related schemas
module.exports = authSchemas;
