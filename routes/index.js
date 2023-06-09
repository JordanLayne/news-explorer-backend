const router = require("express").Router();
const articleItem = require("./articleItems");
const { login, createUser } = require("../controllers/user");
const users = require("./users");
const NotFoundError = require("../errors/NotFoundError");
const auth = require("../middlewares/auth");
const {
  validateUserLogin,
  validateUserInfo,
} = require("../middlewares/validator");

router.use("/items", articleItem);

router.use("/users", auth, users);

router.post("/signin", validateUserLogin, login);

router.post("/signup", validateUserInfo, createUser);

router.use(() => {
  throw new NotFoundError("This route does not exist");
});

module.exports = router;
