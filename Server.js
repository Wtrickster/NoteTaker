// Dependencies
const express = require('express');

// Set up express
const app = express();
const PORT = process.env.PORT || 8080;

// /public line is needed in order to access CSS files properly
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);



app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})