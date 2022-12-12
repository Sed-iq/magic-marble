const mongoose = require('mongoose');

// Schema
const tournamentSchema = new  mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    createdBy: {
        type: String,
        required: true,
    },
    name: String,
    status: String, // upcoming or live or completed or deleted
    rules: String,
    tournamentType: String, // single or double
    maxPlayers: Number,
    timePerMove: Number,
    timeBetweenRounds: Number,
    description: String,
    prizeAndDistribution: String,
    startDateTime: String,
    endDateTime: String,
    createDateTime: String,
    deleteDateTime: String,
    optionalLink: String,
    winnerId: String,
    winner: String,
    playersArr: Array,
    roundPlayersArr: Array, // array of arrays
});

// compile schema to model
const Tournament = mongoose.model('Tournament', tournamentSchema);

// export
module.exports = Tournament;