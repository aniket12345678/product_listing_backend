const { Schema, model } = require("mongoose");

const ProductModel = new Schema(
    {
        image: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        qty: {
            type: Number,
            required: true,
            min: 0,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const ProductSchema = model('products', ProductModel, 'products')

module.exports = { ProductSchema };