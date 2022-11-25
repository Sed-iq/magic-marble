/*
    Here is our Game api, THAT is the main part of the game,
    it is responsible for the game logic and the game flow.

    Important Terms used in it,
        Tournament: A tournament is a game that has a specific number of players, and a specific time between rounds.
        User: He can be a player or a admin. (Users table in Database)
        Player: A player is a user that is currently playing a tournament.
        Socket: A socket means a tab of  browser that is connected to the server.
    One player can have multiple sockets, but one socket can only be connected to one player.

    Note: I ued socket.io that helps us to communicate between the server and the client.
*/

const { updatePlayerRecord, getPlayer, setTournamentLive,
    setTournamentRoundPlayersArr, setTournamentCompleted,
    getTournament, getAllTournaments } = require("../actions/otherActions");

// variables
let io = null;
let activeSockets = [];
let upcomingTournaments = []; // {id, intervalId, startTime}
let currentTournaments = []; // {id, array of players}
let intervalsArr = []; // { tournamentId, interval }

// this function will start server and called from index.js
const initServer = (server) => {
    io = server;
    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on("valid", (data) => {
            checkValidSocket(socket, data);
        });

        // add Bet
        socket.on('addedbet', async (data) => {
            addBet(data);
        });

        socket.on("update", (data) => {
            updateSocket(socket, data);
        });

        // disconnect
        socket.on('disconnect', () => {
            console.log('user disconnected');
            removeSocket(socket);
        });
    });

    // get tournaments from database and add them to upcomingTournaments
    getAllTournaments("upcoming").then(tournaments => {
        tournaments.forEach(tournament => {
            addUpcomingTournament(tournament);
        });
    });
};


// Tournament functions
const startTournament = async (tournamentId) => {
    let tournament = await getTournament(tournamentId);
    if (tournament && tournament.playersArr.length === tournament.maxPlayers) { // check if the tournament is exist and full
        upcomingTournaments = upcomingTournaments.filter(t => t.id !== tournamentId); // remove the tournament from upcomingTournaments
        await addCurrentTournament(tournament); // add the tournament in currentTournaments
        messageToAllPlayers(tournamentId, 'notify', { tournamentId: tournamentId });
        // start counter for the tournament
        let seconds = 0;
        let counterInterval = setInterval(async () => {
            seconds++;
            if (seconds === 61) { // after 60 seconds start the game
                if (isActiveAllPlayers(tournament)) {
                    clearInterval(counterInterval);
                    messageToAllSockets(tournamentId, "startTournament", { tournamentId: tournamentId });
                    await CreateTorunamentRound(tournamentId);
                    let index = currentTournaments.findIndex(t => t.id === tournamentId);
                    currentTournaments[index].isStarted = true;
                    // start bet time interval
                    let timeInterval = setInterval(() => {
                        let tournamentIndex = currentTournaments.findIndex(t => t.id === tournamentId);
                        if (tournamentIndex !== -1) {
                            currentTournaments[tournamentIndex].currentPlayers.forEach((player) => {
                                if (player.no === player.playerToPlay && player.score > 0) {
                                    let matchPlayer = currentTournaments[tournamentIndex].currentPlayers.find(p => p.playerId === player.matchWith);
                                    if (matchPlayer && matchPlayer.score > 0) {
                                        player.betTimeSeconds++;
                                        if (player.betTimeSeconds > currentTournaments[tournamentIndex].timePerMove) {
                                            player.choice = "even";
                                            player.bet = 1;
                                            messageToAPlayer(tournamentId, player.playerId, "autoAddBet", { tournament: currentTournaments[index] })
                                            addBet({ tournamentId: tournamentId, player: player });
                                        }
                                    }
                                }
                            });
                            messageToAllSockets(tournamentId, "betCounter", { tournament: currentTournaments[tournamentIndex] })
                        }
                    }, 1000);
                    intervalsArr.push({ tournamentId: tournamentId, interval: timeInterval });
                }
                else {
                    seconds = 0;
                    messageToAllSockets(tournamentId, "message", { message: "All players are not currently active!" });
                }
            }
            else {
                messageToAllSockets(tournamentId, "counter", { seconds: seconds, tournamentId: tournamentId });
            }
        }, 1000);
        // end counter for the tournament
    };
}

const addCurrentTournament = async (tournament) => {
    let currentPlayers = [];
    await tournament.playersArr.forEach(async (playerId) => {
        let playerDetails = await getPlayer(playerId);
        currentPlayers.push({
            playerId: playerId,
            no: 0,
            username: playerDetails.username,
            total: playerDetails.total,
            wins: playerDetails.wins,
            loses: playerDetails.loses,
            totalRounds: 0,
            loseRounds: 0,
            winRounds: 0,
            score: 0,
            role: null,
            choice: null,
            bet: 0,
            betTimeSeconds: 0,
            isPlaying: false,
            matchWith: null,
            playerToPlay: null,
        });
    });
    await setTournamentLive(tournament.id); // set the tournament to live in the database
    currentTournaments.push({
        id: tournament.id, isStarted: false, playersArr: tournament.playersArr,
        activeSockets: [], currentPlayers: currentPlayers, roundPlayersArr: [],
        timeBetweenRounds: tournament.timeBetweenRounds, timePerMove: tournament.timePerMove,
        rules: tournament.rules, tournamentType: tournament.tournamentType
    });
}

const isActiveAllPlayers = (tournament) => {
    if (tournament) {
        tournament.playersArr.forEach(player => {
            let isFound = false;
            let index = currentTournaments.findIndex(t => t.id === tournament.id);
            currentTournaments[index].activeSockets.forEach(socket => {
                if (socket.userId === player.userId) {
                    isFound = true;
                }
            });
            if (!isFound) {
                return false;
            }
        });
        return true;
    }
    return false;
};

const CreateTorunamentRound = async (tournamentId) => {
    let index = currentTournaments.findIndex(t => t.id === tournamentId);
    if (index !== -1) {
        let currentPlayers = currentTournaments[index].currentPlayers;
        currentPlayers.forEach((player, playerIndex) => {
            while (player.matchWith === null) {
                let randomPlayerIndex = Math.floor(Math.random() * currentPlayers.length);
                let randomPlayer = currentPlayers[randomPlayerIndex];
                if (randomPlayer.playerId !== player.playerId && randomPlayer.matchWith === null) {
                    player.matchWith = randomPlayer.playerId;
                    randomPlayer.matchWith = player.playerId;
                    player.isPlaying = true;
                    randomPlayer.isPlaying = true;
                    player.no = 1;
                    player.choice = null;
                    player.bet = null;
                    player.score = 10;
                    randomPlayer.no = 2;
                    randomPlayer.choice = null;
                    randomPlayer.bet = null;
                    randomPlayer.score = 10;
                    let roles = decideRoles();
                    player.role = roles[0];
                    player.betTimeSeconds = 0;
                    randomPlayer.betTimeSeconds = 0;
                    randomPlayer.role = roles[1];
                    if (player.role === "hider") {
                        player.playerToPlay = 1;
                        randomPlayer.playerToPlay = 1;
                    } else {
                        player.playerToPlay = 2;
                        randomPlayer.playerToPlay = 2;
                    }
                    // updating current players
                    currentPlayers[playerIndex] = player;
                    currentPlayers[randomPlayerIndex] = randomPlayer;
                }
            }
        });
        currentTournaments[index].currentPlayers = currentPlayers;
        let roundPlayers = [];
        currentPlayers.forEach(player => {
            if (player.isPlaying) {
                roundPlayers.push(player.playerId);
            }
        });
        currentTournaments[index].roundPlayersArr.push(roundPlayers);
        await setTournamentRoundPlayersArr(tournamentId, currentTournaments[index].roundPlayersArr); // update from database

        messageToAllSockets(tournamentId, "startRound", { tournamentId: tournamentId });
        messageToAllSockets(tournamentId, "update", { tournament: currentTournaments[index] });
    }
}

const decideRoles = () => {
    const result = Math.floor(Math.random() * 2);
    let role1 = ((result === 0) ? "hider" : "guesser");
    let role2 = ((result === 0) ? "guesser" : "hider");
    return [role1, role2];
}

const checkValidSocket = (socket, data) => {
    let index = currentTournaments.findIndex(tournament => tournament.id === data.tournamentId);
    if (index != -1) {
        let player = currentTournaments[index].currentPlayers.find(player => player.playerId === data.userId);
        if (player) {
            currentTournaments[index].activeSockets.push({ socketId: socket.id, playerId: data.userId });
            socket.emit("valid", { valid: true });
        }
        else {
            socket.emit("valid", { valid: false });
        }
    }
    else {
        socket.emit("valid", { valid: false });
    }
}

const updateSocket = (socket, data) => {
    let tournament = currentTournaments.find(tour => tour.id === data.tournamentId);
    if (tournament) {
        let player = tournament.currentPlayers.find(p => p.playerId === data.userId);
        if (player) {
            if (tournament.isStarted) {
                socket.emit("startTournament", { tournamentId: tournament.id });
                socket.emit("update", { tournament: tournament });
            }
        }
    }
}

const addBet = async (data) => {
    let index = currentTournaments.findIndex(t => t.id === data.tournamentId);
    if (index !== -1) {
        let playerIndex = currentTournaments[index].currentPlayers.findIndex(p => p.playerId === data.player.playerId);
        if (playerIndex !== -1) {
            let matchWithPlayerIdx = currentTournaments[index].currentPlayers.findIndex(p => p.playerId === currentTournaments[index].currentPlayers[playerIndex].matchWith);
            if (matchWithPlayerIdx !== -1) {
                currentTournaments[index].currentPlayers[playerIndex] = data.player;
                if (currentTournaments[index].currentPlayers[playerIndex].role === "guesser") {
                    // resolve turn
                    let roundWinner = null;
                    let wonAmount = 0;
                    let outcome = null;
                    if (currentTournaments[index].currentPlayers[playerIndex].choice === currentTournaments[index].currentPlayers[matchWithPlayerIdx].choice) {
                        if (currentTournaments[index].rules === "Guesser determines the wager amount") {
                            currentTournaments[index].currentPlayers[playerIndex].score += Number(currentTournaments[index].currentPlayers[playerIndex].bet);
                            currentTournaments[index].currentPlayers[matchWithPlayerIdx].score -= Number(currentTournaments[index].currentPlayers[playerIndex].bet);
                        }
                        else if (currentTournaments[index].rules === "Wager amount = average bet of both players") {
                            let avgBet = Math.floor((Number(currentTournaments[index].currentPlayers[playerIndex].bet) + Number(currentTournaments[index].currentPlayers[matchWithPlayerIdx].bet)) / 2);
                            currentTournaments[index].currentPlayers[playerIndex].score += avgBet;
                            currentTournaments[index].currentPlayers[matchWithPlayerIdx].score -= avgBet;
                        }
                        roundWinner = currentTournaments[index].currentPlayers[playerIndex].username;
                        wonAmount = currentTournaments[index].currentPlayers[playerIndex].bet;
                        outcome = "guessed correctly";
                    }
                    else {
                        if (currentTournaments[index].rules === "Guesser determines the wager amount") {
                            currentTournaments[index].currentPlayers[playerIndex].score -= Number(currentTournaments[index].currentPlayers[playerIndex].bet);
                            currentTournaments[index].currentPlayers[matchWithPlayerIdx].score += Number(currentTournaments[index].currentPlayers[playerIndex].bet);
                        }
                        else if (currentTournaments[index].rules === "Wager amount = average bet of both players") {
                            let avgBet = Math.floor((Number(currentTournaments[index].currentPlayers[playerIndex].bet) + Number(currentTournaments[index].currentPlayers[matchWithPlayerIdx].bet)) / 2);
                            currentTournaments[index].currentPlayers[playerIndex].score -= avgBet;
                            currentTournaments[index].currentPlayers[matchWithPlayerIdx].score += avgBet;
                        }
                        roundWinner = currentTournaments[index].currentPlayers[matchWithPlayerIdx].username;
                        wonAmount = currentTournaments[index].currentPlayers[playerIndex].bet;
                        outcome = "not figured out correctly";
                    }

                    // checking winner and loser
                    if (currentTournaments[index].currentPlayers[playerIndex].score <= 0) {
                        currentTournaments[index].currentPlayers[playerIndex].isPlaying = false;
                        currentTournaments[index].currentPlayers[playerIndex].playerToPlay = 0;
                        currentTournaments[index].currentPlayers[playerIndex].totalRounds += 1;
                        currentTournaments[index].currentPlayers[playerIndex].loseRounds += 1;
                        currentTournaments[index].currentPlayers[matchWithPlayerIdx].totalRounds += 1;
                        currentTournaments[index].currentPlayers[matchWithPlayerIdx].winRounds += 1;
                    }
                    if (currentTournaments[index].currentPlayers[matchWithPlayerIdx].score <= 0) {
                        currentTournaments[index].currentPlayers[matchWithPlayerIdx].isPlaying = false;
                        currentTournaments[index].currentPlayers[matchWithPlayerIdx].playerToPlay = 0;
                        currentTournaments[index].currentPlayers[playerIndex].totalRounds += 1;
                        currentTournaments[index].currentPlayers[playerIndex].winRounds += 1;
                        currentTournaments[index].currentPlayers[matchWithPlayerIdx].totalRounds += 1;
                        currentTournaments[index].currentPlayers[matchWithPlayerIdx].loseRounds += 1;
                    }


                    // updating player records
                    messageToAllSockets(data.tournamentId, "updatePlayers", { tournament: currentTournaments[index] });
                    // Playing Round
                    messageToBothPlayers(data.tournamentId, currentTournaments[index].currentPlayers[playerIndex].playerId, "playRound", { roundWinner: roundWinner, wonAmount: wonAmount, outcome: outcome });
                    // updating player records
                    messageToAllSockets(data.tournamentId, "update", { tournament: currentTournaments[index] });

                    if (currentTournaments[index].currentPlayers[playerIndex].score > 0 && currentTournaments[index].currentPlayers[matchWithPlayerIdx].score > 0) {
                        // Changing Roles
                        if (currentTournaments[index].currentPlayers[playerIndex].score === 1) {
                            currentTournaments[index].currentPlayers[playerIndex].role = "guesser";
                            currentTournaments[index].currentPlayers[matchWithPlayerIdx].role = "hider";
                        }
                        else if (currentTournaments[index].currentPlayers[matchWithPlayerIdx].score === 1) {
                            currentTournaments[index].currentPlayers[playerIndex].role = "hider";
                            currentTournaments[index].currentPlayers[matchWithPlayerIdx].role = "guesser";
                        }
                        else if (currentTournaments[index].currentPlayers[playerIndex].role === "hider") {
                            currentTournaments[index].currentPlayers[playerIndex].role = "guesser";
                            currentTournaments[index].currentPlayers[matchWithPlayerIdx].role = "hider";
                        }
                        else if (currentTournaments[index].currentPlayers[playerIndex].role === "guesser") {
                            currentTournaments[index].currentPlayers[playerIndex].role = "hider";
                            currentTournaments[index].currentPlayers[matchWithPlayerIdx].role = "guesser";
                        }

                        // Deciding who will start
                        if (currentTournaments[index].currentPlayers[playerIndex].role === "hider") {
                            currentTournaments[index].currentPlayers[playerIndex].playerToPlay = currentTournaments[index].currentPlayers[playerIndex].no;
                            currentTournaments[index].currentPlayers[matchWithPlayerIdx].playerToPlay = currentTournaments[index].currentPlayers[playerIndex].no;
                        } else {
                            currentTournaments[index].currentPlayers[playerIndex].playerToPlay = currentTournaments[index].currentPlayers[matchWithPlayerIdx].no;
                            currentTournaments[index].currentPlayers[matchWithPlayerIdx].playerToPlay = currentTournaments[index].currentPlayers[matchWithPlayerIdx].no;
                        }
                        currentTournaments[index].currentPlayers[playerIndex].betTimeSeconds = 0;
                        currentTournaments[index].currentPlayers[matchWithPlayerIdx].betTimeSeconds = 0;

                        messageToAllSockets(data.tournamentId, "update", { tournament: currentTournaments[index] });
                    }
                    else {
                        messageToAllSockets(data.tournamentId, "endRound", { tournament: currentTournaments[index] });
                        // admin check the status of the tournament
                        CheckTournamentStatus(data.tournamentId);
                    }
                }
                else {
                    currentTournaments[index].currentPlayers[playerIndex].playerToPlay = ((currentTournaments[index].currentPlayers[playerIndex].playerToPlay === 1) ? 2 : 1);
                    currentTournaments[index].currentPlayers[matchWithPlayerIdx].playerToPlay = ((currentTournaments[index].currentPlayers[matchWithPlayerIdx].playerToPlay === 1) ? 2 : 1);

                    currentTournaments[index].currentPlayers[playerIndex].betTimeSeconds = 0;
                    currentTournaments[index].currentPlayers[matchWithPlayerIdx].betTimeSeconds = 0;

                    messageToAllSockets(data.tournamentId, "update", { tournament: currentTournaments[index] });
                }
            }
        }
    }
}

const CheckTournamentStatus = (tournamentId) => {
    setTimeout(() => {
        let index = currentTournaments.findIndex(tournament => tournament.id === tournamentId);
        if (index !== -1) {
            if (currentTournaments[index].isStarted) {
                currentTournaments[index].currentPlayers.forEach(async (player) => {
                    if (!player.isPlaying) {
                        if (player.loseRounds > 0) {
                            let matchWithPlayerIdx = currentTournaments[index].currentPlayers.findIndex((p) => p.playerId === player.matchWith);
                            if (matchWithPlayerIdx !== -1) {
                                currentTournaments[index].currentPlayers[matchWithPlayerIdx].matchWith = null;
                            }
                            player.total += 1;
                            player.loss += 1;
                            await updatePlayerRecord(player.playerId, player);
                            // remove player from current players
                            currentTournaments[index].currentPlayers = currentTournaments[index].currentPlayers.filter((p) => p.playerId !== player.playerId);
                            messageToAPlayer(tournamentId, player.playerId, "endTournament", { tournament: currentTournaments[index] });
                        }
                    }
                });
                messageToAllSockets(tournamentId, "update", { tournament: currentTournaments[index] });
                setTimeout(async () => {
                    if (currentTournaments[index]) {
                        let length = currentTournaments[index].currentPlayers.length;
                        if (length === 0) {
                            currentTournaments[index].isStarted = false;
                        }
                        if (length === 1) {
                            let intervalIndex = intervalsArr.findIndex(interval => interval.tournamentId === tournamentId);
                            if (intervalIndex > -1) {
                                clearInterval(intervalsArr[intervalIndex].interval);
                            }
                            currentTournaments[index].isStarted = false;
                            await setTournamentCompleted(tournamentId, currentTournaments[index].currentPlayers[0].playerId);
                            currentTournaments[index].currentPlayers[0].total += 1;
                            currentTournaments[index].currentPlayers[0].playerId.wins += 1;
                            await updatePlayerRecord(currentTournaments[index].currentPlayers[0].playerId, currentTournaments[index].currentPlayers[0]);
                            messageToAllSockets(tournamentId, "endTournament", { tournament: currentTournaments[index] });
                            currentTournaments = currentTournaments.filter(t => t.id !== tournamentId);
                        }
                        if (length === 2 || length === 4 || length === 8 || length === 16 || length === 32 || length === 64 || length === 128 || length === 256 || length === 512) {
                            await CreateTorunamentRound(tournamentId);
                        }
                    }
                }, currentTournaments[index].timeBetweenRounds * 1000);
            }
        }
    }, 10000);
}

const removeSocket = (socket) => {
    // remove the player from the currentTournaments
    for (let i = 0; i < currentTournaments.length; i++) {
        for (let j = 0; j < currentTournaments[i].activeSockets.length; j++) {
            if (currentTournaments[i].activeSockets[j].socketId === socket.id) {
                currentTournaments[i].activeSockets.splice(j, 1);
                break;
            }
        }
    }
    // remove the player from the activeSockets
    let index = activeSockets.findIndex(activeSocket => activeSocket.socketId === socket.id);
    if (index !== -1) {
        activeSockets.splice(index, 1);
    }
};

// used for sending message to all sockets in tournament
const messageToAllSockets = (tournamentId, name, data) => {
    let index = currentTournaments.findIndex(tournament => tournament.id === tournamentId);
    if (index !== -1) {
        currentTournaments[index].currentPlayers.forEach((player) => {
            activeSockets.forEach(activeSocket => {
                if (player.playerId === activeSocket.userId) {
                    io.sockets.to(activeSocket.socketId).emit(name, data);
                }
            });
        });
    }
};

// used for sending message to all players
const messageToAllPlayers = (tournamentId, name, data) => {
    let index = currentTournaments.findIndex(tournament => tournament.id === tournamentId);
    if (index !== -1) {
        currentTournaments[index].currentPlayers.forEach((player) => {
            var isSent = false;
            activeSockets.forEach(activeSocket => {
                if (isSent == false) {
                    if (player.playerId === activeSocket.userId) {
                        isSent = true;
                        io.sockets.to(activeSocket.socketId).emit(name, data);
                    }
                }
            });
        });
    }
};

// used for sending message to player and opponent
const messageToBothPlayers = (tournamentId, playerId, name, data) => {
    let index = currentTournaments.findIndex(t => t.id === tournamentId);
    if (index !== -1) {
        currentTournaments[index].currentPlayers.forEach((player) => {
            activeSockets.forEach(activeSocket => {
                if (player.playerId === activeSocket.userId) {
                    if (player.playerId === playerId) {
                        io.sockets.to(activeSocket.socketId).emit(name, data);
                    }
                    if (player.matchWith === playerId) {
                        io.sockets.to(activeSocket.socketId).emit(name, data);
                    }
                }
            });
        });
    }
};

// used for sending message to player and opponent
const messageToAPlayer = (tournamentId, playerId, name, data) => {
    let index = currentTournaments.findIndex(t => t.id === tournamentId);
    if (index !== -1) {
        currentTournaments[index].currentPlayers.forEach((player) => {
            activeSockets.forEach(activeSocket => {
                if (player.playerId === activeSocket.userId) {
                    if (player.playerId === playerId) {
                        io.sockets.to(activeSocket.socketId).emit(name, data);
                    }
                }
            });
        });
    }
};
// end of tournament functions


// Admin functions are that only admin can use
const addUpcomingTournament = (tournament) => {
    let date = new Date(tournament.startDateTime);
    let timeInMiliseconds = date.getTime() - Date.now();
    if (timeInMiliseconds > 0) {
        let intervalId = setTimeout(() => {
            startTournament(tournament.id);
        }, timeInMiliseconds);
        upcomingTournaments.push({ id: tournament.id, intervalId: intervalId });
    }
}

const updateUpcomingTournament = (tournament) => {
    let index = upcomingTournaments.findIndex(tournament => tournament.id === tournament.id);
    if (index !== -1) {
        clearTimeout(upcomingTournaments[index].intervalId);
        let date = new Date(tournament.startDateTime);
        let intervalId = setTimeout(() => {
            startTournament(tournament.id);
        }, (date.getTime() - Date.now()));
        upcomingTournaments[index].intervalId = intervalId;
    }
    else {
        addUpcomingTournament(tournament);
    }
}

const removeUpcomingTournament = (id) => {
    let index = upcomingTournaments.findIndex(tournament => tournament.id === id);
    if (index !== -1) {
        clearTimeout(upcomingTournaments[index].intervalId);
        upcomingTournaments.splice(index, 1);
    }
}

const removeCurrentTournament = (id) => {
    let index = currentTournaments.findIndex(tournament => tournament.id === id);
    if (index !== -1) {
        messageToAllSockets(id, "deletedTournament", { tournamentId: id });
        currentTournaments.splice(index, 1);
    }
}
// end of admin functions

// admin and player functions are that both player and admin can use
const addSocket = (socketId, user) => {
    if (socketId !== null) { // if socket is not null
        if (activeSockets.findIndex(activeSocket => activeSocket.socketId === socketId) === -1) {
            activeSockets.push({ socketId: socketId, userId: user.id });
        }
    }
};
const removeSocketsWithUserId = (userId) => {
    // remove all sockets that have the userId
    activeSockets = activeSockets.filter(activeSocket => activeSocket.userId !== userId);
};
// end of admin and player functions

module.exports = {
    initServer,
    addSocket,
    removeSocketsWithUserId,
    addUpcomingTournament,
    updateUpcomingTournament,
    removeUpcomingTournament,
    removeCurrentTournament
}