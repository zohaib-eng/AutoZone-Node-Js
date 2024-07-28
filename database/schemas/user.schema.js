const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        phoneNumber: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            trim: true,
        },
        confirmPassword: {
            type: String,
            trim: true,
        },
        street: {
            type: String,
            trim: true
        },
        town: {
            type: String,
            trim: true
        },
        token: {
            type: String,
            trim: true,
        },
        otp: {
            type: String,
            trim: true,
        },
        expirationTime: {
            type: String,
            trim: true,
        },
        is_active: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
    );

// Create a model from the schema
const User = mongoose.model('users', userSchema);

// Export the User model
module.exports = User;