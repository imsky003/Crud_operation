const express = require("express");
const router = express.Router();
// var fetchUser = require("../middleware/fetchUser");
const Note = require("../models/Products");

const { body, validationResult } = require("express-validator");

// insert data
router.post('/add', [body("name", "enter valid heading").isLength({ min: 2 })], async (req, res) => {

    try {
        const { name, description, price, quantity, category } = req.body;
        // for error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        const note = new Note({
            name, description, price, quantity, category
        });
        const savednote = await note.save();
        res.json(savednote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }

});
// update data
router.put('/update/:id', async (req, res) => {
    const { name, description, price, quantity, category } = req.body;
    try {
        const newNote = {};
        if (name) {
            newNote.name = name;
        }

        if (description) {
            newNote.description = description;
        }

        if (price) {
            newNote.price = price;
        }
        if (quantity) {
            newNote.quantity = quantity;
        }
        if (category) {
            newNote.category = category;
        }
        //    find note by id
        let note = await Note.findOne(req.id);
        // console.log(note);
        if (!note) {
            return res.status(404).send("not found data");
        }

        note = await Note.findOneAndUpdate(req.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }

});
// delete data
router.delete('/delete/:id', async (req, res) => {
    // const { name, description, price, quantity, category } = req.body;
    try {


        let note = await Note.deleteOne(req.id);
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }

});
// delete all data
router.delete('/delete/', async (req, res) => {

    try {

        const notes = await Note.deleteMany();
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }

});
// get all the notes
router.get("/fetchall", async (req, res) => {
    try {
        const notes = await Note.find({});
        res.json(notes);
    } catch (error) {
        // console.error(error.message);
        res.status(500).send("internal server error occurred");
    }
});
router.get("/fetch_per/:id", async (req, res) => {
    try {
        const notes = await Note.findOne(req.id);
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error occurred");
    }
});
//fetch product whose name starts with kw
router.get("/regx", async (req, res) => {
    try {
        const notes = await Note.find({ name: { $regex: /kw/i } });
        res.json(notes);
    } catch (error) {
        // console.error(error.message);
        res.status(500).send("internal server error occurred");
    }
});
module.exports = router;