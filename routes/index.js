var express = require('express');
var app = express();


/* GET home page. */
app.get("/", (req, res) => {
    res.json({ message: "Welcome to DressStore application." });
});



module.exports = app;
