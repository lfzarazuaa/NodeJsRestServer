const { Router } = require("express");

const { check } = require("express-validator"); // Validator as a middleware, before to call the function in the controller.

const { userLogin, userAuthorized } = require("../controllers/auth");


const { verifyEmailExist } = require("../helpers/db-validators"); // Import role validator reading from db.
const { validateFields } = require("../middlewares/validateFields"); // Import Middleware for verifying the check validators.
const { validateJwt } = require("../middlewares/validateWithJwt"); // Import Middleware for verifying the JWT.
const { isAdminRole } = require("../middlewares/validateRoles"); //Validate for Admin Role.

const router = Router(); // Configuring routing.

router.post(
  "/login",
  [
    check("email", "The email format is not valid.").isEmail(),
    check("password", "The password is required").not().isEmpty(),
    validateFields, //Register the middleware to valiate fields instead of do it on the controller.
  ],
  userLogin
);

router.get(
  "/authorize",
  [
    validateJwt,
    isAdminRole,
    validateFields, //Register the middleware to valiate fields instead of do it on the controller.
  ],
  userAuthorized
);
module.exports = router;
