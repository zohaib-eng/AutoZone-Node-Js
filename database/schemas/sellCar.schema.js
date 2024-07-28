const mongoose = require('mongoose');

const sellCarSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        brand: {
            type: String,
            trim: true,
        },
        model: {
            type: String,
            trim: true,
        },
        year: {
            type: String,
            trim: true,
        },
        km: {
            type: String,
            trim: true,
        },
        horsepower: {
            type: String,
            trim: true
        },
        bodyType: {
            type: String,
            trim: true
        },
        fuel: {
            type: String,
            trim: true,
        },
        enginSize: {
            type: String,
            trim: true,
        },
        cylinders: {
            type: String,
            trim: true,
        },
        drive: {
            type: String,
            trim: true,
        },
        exteriorColor: {
            type: String,
            trim: true,
        },
        interiorColor: {
            type: String,
            trim: true,
        },
        seats: {
            type: String,
            trim: true,
        },
        doors: {
            type: String,
            trim: true,
        },
        condition: {
            type: String,
            trim: true,
        },
        discription: {
            type: String,
            trim: true,
        },
        addPrice: {
            type: String,
            trim: true
        },
        image: {
            type: String,
            default: 0
        },
    },
    { timestamps: true }
    );

// Create a model from the schema
const sellCar = mongoose.model('sellcars', sellCarSchema);

// Export the User model
module.exports = sellCar;