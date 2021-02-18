const path = require('path');

module.exports = (app) => {
    //get note.html
    app.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    });

    app.post('/notes', (req, res) => {
        res.send('This is a post request');
    });

    //get index.html
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

};