const Item = require("../models/articleItems");
const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");
const BadRequestError = require("../errors/BadRequestError");

module.exports.getSavedArticles = (req, res, next) => {
  const owner = req.user._id;

  Item.find({ owner })
    .then((articles) => res.send(articles))
    .catch((error) => {
      next(error);
    });
};

module.exports.removeArticle = async (req, res, next) => {
  const owner = req.user._id;

  Item.findById(req.params.itemId)
    .orFail(() => {
      throw new NotFoundError("Item with this ID does not exist");
    })
    .then((item) => {
      if (String(item.owner) !== owner) {
        return next(
          new ForbiddenError(
            "You do not have permission to delete this resource"
          )
        );
      }

      return item.deleteOne().then(() => res.send({ data: item }));
    })
    .catch(next);
};

module.exports.addArticle = (req, res, next) => {
  const { keyword, title, image, text, date, source, link } = req.body;
  const owner = req.user._id;

  Item.create({ keyword, title, image, text, date, source, link, owner })
    .then((item) => {
      res.status(201);
      res.send({ data: item });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Data provided is invalid"));
      } else {
        next(err);
      }
    });
};
