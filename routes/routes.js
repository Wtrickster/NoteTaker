
// Dependencies
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const router = require ("express").Router();
// Routing
const mainDir = path.join(__dirname, "../public");
    // Below code handles when users "visit" a page.
    router.get("/notes", function(req, res) {
        res.sendFile(path.join(mainDir, "notes.html"));
    });

    router.get("/api/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "../db/db.json"));
    });

    router.get("/api/notes/:id", function(req, res) {
        let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        res.json(savedNotes[Number(req.params.id)]);
    });

    // Catch all other GET requests not defined above
    router.get("*", function(req, res) {
        res.sendFile(path.join(mainDir, "index.html"));
    });

    // API POST Requests
    // Below code handles when users "saves" a note.
    router.post("/api/notes", function(req, res) {
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
    router.delete("/api/notes/:id", function(req, res) {
        let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        let noteID = req.params.id;
        console.log(`Deleting note with ID ${noteID}`);
        savedNotes = savedNotes.filter(currNote => {
            return currNote.id != noteID;
        })

        fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
        res.json(savedNotes);
    })

module.exports = router;