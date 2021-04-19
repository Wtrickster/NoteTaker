
// Dependencies
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Routing
const mainDir = path.join(__dirname, "/../public");

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    app.get("/notes", function(req, res) {
        res.sendFile(path.join(mainDir, "/notes.html"));
    });

    app.get("/api/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "../db/db.json"));
    });

    app.get("/api/notes/:id", function(req, res) {
        let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        res.json(savedNotes[Number(req.params.id)]);
    });

    // Catch all other GET requests not defined above
    app.get("*", function(req, res) {
        res.sendFile(path.join(mainDir, "index.html"));
    });

    // API POST Requests
    // Below code handles when users "saves" a note.
    app.post("/api/notes", function(req, res) {
        let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        let newNote = req.body;
        newNote.id = uuidv4();
        savedNotes.push(newNote);
    
        fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
        console.log("Note saved to db.json. Content: ", newNote);
        res.json(savedNotes);
    });

    // API DELETE Request
    // Below code handles when users "deletes" a saved note.
    app.delete("/api/notes/:id", function(req, res) {
        let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        let noteID = req.params.id;
        console.log(`Deleting note with ID ${noteID}`);
        savedNotes = savedNotes.filter(currNote => {
            return currNote.id != noteID;
        })

        fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
        res.json(savedNotes);
    })
}