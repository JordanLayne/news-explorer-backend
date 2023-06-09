const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateUrl = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }

  return helpers.error("string.uri");
};

const validateEmail = (value, helpers) => {
  if (validator.isEmail(value)) {
    return value;
  }

  return helpers.error("string.email");
};

const nameValidation = Joi.string().required().min(2).max(30).messages({
  "string.min": 'The minimum length of the "name" field is 2',
  "string.max": 'The maximum length of the "name" field is 30',
  "string.empty": 'The "name" field must be filled in',
});

const imageValidation = Joi.string().required().custom(validateUrl).messages({
  "string.empty": 'The "imageUrl" field must be filled in',
  "string.uri": 'The "imageUrl" field must be a valid url',
});

const emailValidation = Joi.string().required().custom(validateEmail).messages({
  "string.empty": 'The "email" field must be filled in',
  "string.email": 'The "email" field must be a valid email address',
});

const passwordValidation = Joi.string().required().messages({
  "string.empty": 'The "password" field must be filled in',
});
const articleSchemaValidation = {
  keyword: nameValidation,
  image: imageValidation,
  title: Joi.string().required().messages({
    "string.empty": 'The "title" field must be filled in',
  }),
  text: Joi.string().required().messages({
    "string.empty": 'The "text" field must be filled in',
  }),
  date: Joi.string().required().messages({
    "string.empty": 'The "date" field must be filled in',
  }),
  source: Joi.string().required().messages({
    "string.empty": 'The "source" field must be filled in',
  }),
  link: Joi.string().required().custom(validateUrl).messages({
    "string.empty": 'The "link" field must be filled in',
    "string.uri": 'The "link" field must be a valid URL',
  }),
};

module.exports.validateItemInfo = celebrate({
  body: Joi.object(articleSchemaValidation),
});

module.exports.validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: nameValidation,
    email: emailValidation,
    password: passwordValidation,
  }),
});

module.exports.validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: emailValidation,
    password: passwordValidation,
  }),
});

module.exports.validateIds = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24).messages({
      "string.hex": "'_id' does not use hexadecimal values",
      "string.length": "'_id' length is not equal to 24",
    }),
  }),
});
