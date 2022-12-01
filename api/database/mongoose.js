/*
    Monoose used to connect to the mongo database.
    Created here a function that connects to the database.
*/

const mongoose = require('mongoose');

//Database Connection---
const connectDB = async (url) => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected');
    } catch (err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;