/*
    Some that are not used in this file but are used in tournaments/tournaments.js
    To manage and update the tournament data from the database.
*/

const Tournament = require('../models/tournament');
const User = require('../models/user');

const getPlayer = async (playerId) => {
    let result = await User.findOne({ id: playerId });
    if (result) {
        return result;
    }
    return null;
}

const updatePlayerRecord = async (playerId, player) => {
    console.log(player);
    let result = await User.findOneAndUpdate({ id: playerId }, { total: player.total, wins: player.wins, loses: player.loses });
    if (result) {
        return result;
    }
    return null;
}

const getTournament = async (tournamentId) => {
    let result = await Tournament.findOne({ id: tournamentId });
    if (result) {
        return result;
    }
    return null;
}

const getAllTournaments = async (status) => {
    let result = await Tournament.find({ status: status });
    if (result) {
        return result;
    }
    return null;
}

const setTournamentLive = async (tournamentId) => {
    let result = await Tournament.findOneAndUpdate({ id: tournamentId }, { status: "live" });
    if (result) {
        return result;
    }
    return null;
}

const setTournamentCompleted = async (tournamentId, winnerId) => {
    let winner = await getPlayer(winnerId);
    let result = await Tournament.findOneAndUpdate({ id: tournamentId }, { status: "completed", winnerId: winnerId, winner: winner.username });
    if (result) {
        return result;
    }
    return null;
}

const setTournamentRoundPlayersArr = async (tournamentId, roundPlayersArr) => {
    let result = await Tournament.findOneAndUpdate({ id: tournamentId }, { roundPlayersArr: roundPlayersArr });
    if (result) {
        return result;
    }
    return null;
}

module.exports = {
    updatePlayerRecord,
    getPlayer,
    getTournament,
    getAllTournaments,
    setTournamentLive,
    setTournamentCompleted,
    setTournamentRoundPlayersArr
}