//dependence
const express = require('express');

//setup ports
const app = express();
const PORT = process.env.PORT || 8080;

//public line
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
require('./routes/apiroutes')(app);
require('./routes/htmlroutes')(app);


app.listen(PORT, () => {
    console.log(`App Listening on PORT ${PORT}`);
})