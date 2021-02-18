//require db file & fs module
const dbJSON = require('../db/db.json');
const fs = require('fs');

module.uniqid_debug = true;
var uniqid = require('uniqid');


module.exports = (app) => {

    app.get('/api/notes', (req, res) => {

        fs.readFile('db/db.json', 'utf8', (err, data) => {
            if (err) { console.err(err) } else {
                res.json(JSON.parse(data));

            };
        });
    });

    app.get('/api/notes/:id', (req, res) => {

        const noteId = req.params.id;

        fs.readFile('db/db.json', 'utf8', (err, data) => {
            if (err) { console.err(err) } else {

                for (let i = 0; i < dbJSON.length; i++) {
                    if (noteId === dbJSON[i].id) {
                        return res.json(dbJSON[i]);
                    };
                };
            };
        });
    });

    app.post('/api/notes', (req, res) => {
        fs.readFile('db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.err(err);
            } else {

                const notesDb = JSON.parse(data);

                const newNote = req.body;

                const idKey = "id";
                const noteId = uniqid();

                newNote[idKey] = noteId;

                notesDb.push(newNote);

                fs.writeFile('db/db.json', JSON.stringify(notesDb), (err) => {
                    if (err) throw err;

                    res.json(notesDb);
                });
            };
        });
    });

    app.delete('/api/notes/:id', (req, res) => {

        const noteId = req.params.id;

        fs.readFile('db/db.json', 'utf8', (err, data) => {

            const notesDb = JSON.parse(data);
            if (err) { console.err(err) } else {

                for (let i = 0; i < notesDb.length; i++) {

                    if (noteId === notesDb[i].id) {

                        notesDb.splice([i], 1)

                        fs.writeFile('db/db.json', JSON.stringify(notesDb), (err) => {
                            if (err) throw err;

                            res.json(notesDb);
                        });
                    };
                };
            };
        });
    });
};