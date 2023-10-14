const Note = require("../models/Products");

// // update data
module.exports.updateProducts = async (req, res) => {
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

};
// // delete data
module.exports.deleteProducts = async (req, res) => {
    // const { name, description, price, quantity, category } = req.body;
    try {


        let note = await Note.deleteOne(req.id);
        res.json({ note });
        res.send("Deleted " + req.id);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }

};
// // delete all data
module.exports.deleteAllProducts = async (req, res) => {

    try {

        const notes = await Note.deleteMany();
        // res.json(notes);
        res.json({ message: "All Products deleted successfully" })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }

};
// get all the notes and find product by name
module.exports.find = async (req, res) => {

    const { name } = req.query;
    if (name) {

        try {
            const notes = await Note.find({ name: { $regex: name } });
            res.json(notes);
        } catch (error) {
            // console.error(error.message);
            res.status(500).send("internal server error occurred");
        }
    } else {
        const result = await Note.find()
        res.json(result);
    }

}
// add data
module.exports.add = async (req, res) => {
    try {
        const { name, description, price, quantity, category } = req.body;

        const note = new Note({
            name, description, price, quantity, category
        });
        const savednote = await note.save();
        res.json(savednote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }
}
// update

module.exports.fetchSingleProduct = async (req, res) => {
    try {
        const notes = await Note.findOne(req.id);
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error occurred");
    }
}
