const mongoose = require('mongoose');

// Schema
const userSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    wallet: {
        type: Number,
        default: 0
    },
    adminAccess: {
        type: Boolean,
        default: true
    },
    signupby: {
        type: String,
        default: 'email'
    },
    isAdmin: Boolean,
    createDateTime: String,
    deleteDateTime: String,
    tournamentsArr: Array,
    status: String, // active or inactive
});

// compile schema to model
const User = mongoose.model('User', userSchema);

// export
module.exports = User;