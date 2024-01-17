var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var voeuRouter = require("./routes/voeux");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// all the routes given in the filmRouter shall be secure : call the authorize middleware
app.use("/api/voeux", voeuRouter);


module.exports = app;
