const mongoose = require('mongoose');

const googleUserSchema = new mongoose.Schema(
    {
        googleId: {
            type: String,
            trim: true,
        },
        userName: {
            type: String,
            trim: true,
        },
        email: [
            {
                value: {
                    type: String,
                }
            }
        ],
        profilePicture: [
            {
                value: {
                    type: String,
                }
            }
        ],
    },
    { timestamps: true }
    );

// Create a model from the schema
const googleUser = mongoose.model('googleUsers', googleUserSchema);

// Export the User model
module.exports = googleUser;