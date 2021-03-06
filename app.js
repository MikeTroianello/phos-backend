require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");

const cors = require("cors");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
// app.set('view engine', 'jade');

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

console.clear();

//MONGO

// const uri = process.env.MONGODB_URI;
const uri = "mongodb://localhost/phos";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

// app.use(
//   cors({
//     credentials: true,
//     origin: ['http://phos.surge.sh'],
//   })
// );

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    "Access-Control-Allow-Origin": "http://localhost:3000",
  })
);

//ROUTES
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var cardsRouter = require("./routes/cards");
var collectionsRouter = require("./routes/collections");

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);
app.use("/collections", collectionsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  res.json({ message: "error" });
});

module.exports = app;
