const mongoose = require('mongoose');

// Schema
const userSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email:{
        type: String,
    },
    username: {
        type: String,
        unique: true,
        required: true,
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