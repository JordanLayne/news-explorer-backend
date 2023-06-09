const router = require("express").Router();

const {
  getSavedArticles,
  removeArticle,
  addArticle,
} = require("../controllers/articleItems");

const auth = require("../middlewares/auth");

const { validateItemInfo, validateIds } = require("../middlewares/validator");

router.get("/", getSavedArticles);

router.delete("/:itemId", auth, validateIds, removeArticle);

router.post("/", auth, validateItemInfo, addArticle);

module.exports = router;
