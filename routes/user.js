const { Router } = require("express");
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
router.post("/", usersPost);
router.put("/", usersPut);
router.patch("/", usersPatch);
router.delete("/", usersDelete);

module.exports = router;
