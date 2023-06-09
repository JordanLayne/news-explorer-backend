require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { errors } = require("celebrate");
const helmet = require("helmet");
const cors = require("cors");
const limiter = require("./utils/config");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorMiddleware");
const routes = require("./routes/index");

const { PORT = 3000, MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI);
const app = express();

app.use(helmet());
const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
app.use(requestLogger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(limiter);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => {});
