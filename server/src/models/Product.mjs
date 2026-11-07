import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },

    sections: {
        type: [String],
        required: true,
        default: []
    },

    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    oldPrice: Number,

    rating: {
        type: Number,
        default: 0
    },

    reviews: {
        type: Number,
        default: 0
    },

    stock: {
        type: Number,
        default: 0
    },

    size: {
        type: [String],
        default: []
    },

    color: {
        type: String,
        default: ""
    },

    image: {
        type: String,
        default: ""
    },

    tag: String,

    description: {
        type: String,
        default: ""
    },

    brand: {
        type: String,
        default: ""
    },

    discount: {
        type: String,
        default: ""
    }

}, {
    timestamps: true
});

export const Product = mongoose.model("Product", ProductSchema);