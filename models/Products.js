const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductsSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,

    },
    category: {
        type: String,
    }
});

const Products = mongoose.model("product", ProductsSchema);
module.exports = Products;