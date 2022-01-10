const { Router } = require("express");

const { check } = require("express-validator"); // Validator as a middleware, before to call the function in the controller.

const {
  verifyValidRole,
  verifyValidRoleUpdate,
  verifyEmailExist,
  verifyUserExist,
} = require("../helpers/db-validators"); // Import role validator reading from db.

const { validateFields } = require("../middlewares/validateFields"); // Import Middleware for verifying the check validators.

const {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
} = require("../controllers/users");
const router = Router(); // Configuring routing.

router.get("/text", (req, res) => {
  res.send("Sending text");
});

router.get("/", usersGet);

router.post(
  "/", // Base Route
  [
    // Validators as middlewares and pass results on the request.
    check("email", "The email format is not valid.").isEmail(),
    check("name", "The name is required").not().isEmpty(),
    check("name", "The name must be a string").not().isEmpty(),
    check("password", "The password must be at less of 6 characters").isLength({
      min: 6,
    }),
    check("role", "The role is required").not().isEmpty(),
    // check("role", "Not a valid Role (ADMIN_ROLE, USER_ROLE)").isIn(
    //   "ADMIN_ROLE",
    //   "USER_ROLE"
    // ),
    check("role").custom(verifyValidRole),
    check("email").custom(verifyEmailExist),
    validateFields, //Register the middleware to valiate fields instead of do it on the controller.
  ],
  usersPost // Controller Method call to proccess.
);

router.put(
  "/:id",
  [
    check("id", "This is not a valid MongoId").isMongoId(),
    check("id").custom(verifyUserExist),
    check("role").custom(verifyValidRoleUpdate),
    validateFields,
  ],
  usersPut
);

router.patch("/", usersPatch);

router.delete(
  "/:id",
  [
    check("id", "This is not a valid MongoId").isMongoId(),
    check("id").custom(verifyUserExist),
    validateFields,
  ],
  usersDelete
);

module.exports = router;
