"use strict";
exports.__esModule = true;
var express_1 = require("express");
var morgan_1 = require("morgan");
var dotenv = require("dotenv");
dotenv.config();
var PORT = process.env.PORT || 3000;
// create an instance server
var app = (0, express_1["default"])();
// HTTP request logger middleware
app.use((0, morgan_1["default"])('dev'));
// add routing for / path
app.get('/', function (req, res) {
    res.json({
        message: 'Hello World 🌍'
    });
});
// start express server
app.listen(PORT, function () {
    console.log("Server is starting at prot:".concat(PORT));
});
exports["default"] = app;
