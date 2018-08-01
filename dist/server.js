"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _htmlroutes = require("./routes/htmlroutes.js");

var _htmlroutes2 = _interopRequireDefault(_htmlroutes);

var _backendroutes = require("./routes/backendroutes.js");

var _backendroutes2 = _interopRequireDefault(_backendroutes);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _expressHandlebars = require("express-handlebars");

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var PORT = 4040;

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraperDb";
_mongoose2.default.Promise = Promise;
_mongoose2.default.connect(MONGODB_URI);
_mongoose2.default.connection.on("error", function (err) {
    console.log("Mongoose connection err:\n" + err);
});

// Setting up Handlebars
app.engine("handlebars", (0, _expressHandlebars2.default)({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Middleware
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_express2.default.static("public"));

// Routes
app.use(_htmlroutes2.default);
app.use(_backendroutes2.default);

app.listen(PORT, function () {
    console.log("Listening on port: " + PORT);
});