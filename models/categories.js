const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchema = new Schema({

    name: {
        type: String,
        required: true,
    },

});

const Products = mongoose.model("categories", CategorySchema);
module.exports = Products;