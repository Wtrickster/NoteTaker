// Require db file and the fs module
const dbJSON = require('../db/db.json');
const fs = require('fs');

// NPM unqique ID module
module.uniqid_debug = true;
var uniqid = require('uniqid');


module.exports = (app) => {

    //Get the entire db.json object in JSON format
    app.get('/api/notes', (req, res) => {
        // Use FS to read the latest version of db.json
        fs.readFile('db/db.json', 'utf8', (err, data) => {
            if (err) { console.err(err) } else {
                res.json(JSON.parse(data));

            }
        })
    })


    // Get items from db.json based on the ID's; response given in JSON format

    app.get('/api/notes/:id', (req, res) => {
        // NoteId grabs the id from the url
        const noteId = req.params.id;
        // Use FS to read the latest version of db.json
        fs.readFile('db/db.json', 'utf8', (err, data) => {
            if (err) { console.err(err) } else {
                // use a for loop to find the specific item in the db.json array
                for (let i = 0; i < dbJSON.length; i++) {
                    if (noteId === dbJSON[i].id) {
                        return res.json(dbJSON[i]);
                    }
                }
            }
        })
    })


    // Post - Create a new Note after clicking the Save Button
    app.post('/api/notes', (req, res) => {
        fs.readFile('db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.err(err);
            } else {
                // Parse data from db.JSON so we can add to it
                const notesDb = JSON.parse(data);
                // Variable for the entered new note data
                const newNote = req.body;
                // variables to create a unique ID
                const idKey = "id";
                const noteId = uniqid();
                // Add ID to newNote
                newNote[idKey] = noteId;
                // push completed note to notesDb variable
                notesDb.push(newNote);
                //Use fs Write file to rewrite / replace the entire contents of db.json
                fs.writeFile('db/db.json', JSON.stringify(notesDb), (err) => {
                    if (err) throw err;
                    // Respond with the latest version  of our array by referencing the notesDB variable above   
                    res.json(notesDb);
                });
            };
        });
    });

    // Deleting Notes
    app.delete('/api/notes/:id', (req, res) => {
        // NoteId grabs the id from the url
        const noteId = req.params.id;
        // Use FS to read the latest version of db.json
        fs.readFile('db/db.json', 'utf8', (err, data) => {
            // Parse data from db.JSON so we can alter it
            const notesDb = JSON.parse(data);
            if (err) { console.err(err) } else {
                // use a for loop to find the specific item in the db.json array
                for (let i = 0; i < notesDb.length; i++) {
                    // If array item # i's ID matches req.params.id
                    if (noteId === notesDb[i].id) {
                        // Use Splice to remove the item from the array
                        notesDb.splice([i], 1)
                            // write back into the db.json file
                        fs.writeFile('db/db.json', JSON.stringify(notesDb), (err) => {
                            if (err) throw err;
                            // respond with the latest updated array
                            res.json(notesDb);
                        });
                    }
                }
            }
        });
    });
}