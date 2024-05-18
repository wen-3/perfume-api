const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
    {
        category: String,
        image: String,
        is_enabled: Number,
        origin_price: String,
        price: String,
        title: String,
        unit: String
    },
    {
        versionKey: false,
    }
)

const Product = mongoose.model('Product', productSchema)

module.exports = Product;
