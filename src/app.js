const express = require("express");
const compression = require("compression");
const cors = require("cors");
const httpStatus = require("http-status");
const helmet = require("helmet");
const { errorHandler } = require("./middlewares/error");
const routes = require("./routes/v1");
const ApiError = require("./utils/ApiError");

const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// The compression middleware automatically compresses the response body for all requests. This reduces the size of the response, leading to faster load times and reduced bandwidth usage.
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

app.use("/v1", routes);

app.use(errorHandler);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found, MSG source: app.js"));
});

module.exports = app;
