var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const logger = require("./config/winston"); // import "logger" from winstone

// const indexRouter = require("./routes/index");
// const usersRouter = require("./routes/users");

const apiRouter = require("./routes/api/api");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors()); // set cors
app.use(helmet());
app.use(morgan("combined", { stream: logger.stream.write })); // connect winston and morgan
// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

//* create subRoute for api
app.use("/api", apiRouter);
app.use("/api/*", (req, res) => {
    throw new Error("error throw navigate to");
});

//* create Error - wich error the client got
app.use((err, req, res, next) => {
    global.logger.error({
        method: req.method,
        error: err.massage,
        url: req.originalUrl,
    });
    next(err);
});

//* React
app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

//* GET http://localhost:3033/ -- endpoint
// app.get("/", (req, res) => {
//     res.json({ msg: "ok" });
// });

//* GET http://localhost:3033/new -- endpoint
// app.get("/new", (req, res) => {
//     res.json({ msg: "ok" });
// });

//* GET http://localhost:3033/client -- endpoint
// app.get("/client", (req, res) => {
//     res.json({ msg: "welcome" });
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;