const router = require("express").Router();

const {
  getArticle,
  removeArticle,
  addArticle,
} = require("../controllers/articleItems");

const auth = require("../middlewares/auth");

const { validateItemInfo, validateIds } = require("../middlewares/validator");

router.get("/", getArticle);

router.delete("/:itemId", auth, validateIds, removeArticle);

router.post("/", auth, validateItemInfo, addArticle);

module.exports = router;
