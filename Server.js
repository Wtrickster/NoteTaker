// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const routes = require("./routes/routes")

// Initialize express app
const app = express();
const PORT = process.env.PORT || 8080;

// Setup data parsing
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//get routes file
app.use('/', routes);

// Setup listener
app.listen(PORT, function() {
    console.log(`Now listening to port ${PORT}. Let the good times roll!`);
})