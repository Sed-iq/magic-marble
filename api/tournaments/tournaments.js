const { getUser, setTournamentLive,
    setTournamentRoundPlayersArr, setTournamentCompleted,
    getTournament, getAllTournaments } = require("../actions/otherActions");

// variables
let io = null;
let activeSockets = [];
let upcomingTournaments = []; // {id, intervalId, startTime}
let liveTournaments = []; // {id, array of players}
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
        socket.on('addbet', (data) => {
            addBet(data);
        });

        socket.on('message', (data) => {
            addMessage(data);
        });

        socket.on("update", (data) => {
            updateSocket(socket, data);
        });

        // disconnect
        socket.on('disconnect', () => {
            console.log('user disconnected');
            removeSocket(socket.id);
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
        await addCurrentTournament(tournament); // add the tournament in liveTournaments
        messageToAllPlayers(tournamentId, 'notify', { tournamentId: tournamentId });
        // start counter for the tournament
        let seconds = 0;
        let counterInterval = setInterval(async () => {
            seconds++;
            if (seconds === 61) { // after 60 seconds start the game
                clearInterval(counterInterval);
                let index = liveTournaments.findIndex(t => t.id === tournamentId);
                liveTournaments[index].isStarted = true;
                await CreateTorunamentRound(tournamentId);
                // start bet time interval
                let timeInterval = setInterval(() => {
                    let tournamentIndex = liveTournaments.findIndex(t => t.id === tournamentId);
                    if (tournamentIndex !== -1) {
                        liveTournaments[tournamentIndex].currentPlayers.forEach((player) => {
                            if (player.no === player.playerToPlay && player.score > 0) {
                                let matchPlayer = liveTournaments[tournamentIndex].currentPlayers.find(p => p.userId === player.matchWith);
                                if (matchPlayer && matchPlayer.score > 0) {
                                    player.betTimeSeconds++;
                                    if (player.betTimeSeconds > liveTournaments[tournamentIndex].timePerMove) {
                                        addBet({ tournamentId: tournamentId, userId: player.userId, choice: "even", bet: 1 });
                                        messageToAPlayer(tournamentId, player.userId, "autoAddBet", { tournament: liveTournaments[index] })
                                    }
                                }
                            }
                        });
                        messageToAllSockets(tournamentId, "betCounter", { tournament: { id: liveTournaments[tournamentIndex].id, timePerMove: liveTournaments[index].timePerMove, currentPlayers: liveTournaments[index].currentPlayers } })
                    }
                }, 1000);
                intervalsArr.push({ tournamentId: tournamentId, interval: timeInterval });
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
    await tournament.playersArr.forEach(async (userId) => {
        let playerDetails = await getUser(userId);
        currentPlayers.push({
            userId: userId,
            no: 0,
            username: playerDetails.username,
            totalRounds: 0,
            winRounds: 0,
            score: 0,
            role: null,
            choice: null,
            round: 0,
            bet: 0,
            betTimeSeconds: 0,
            isPlaying: false,
            matchWith: null,
            playerToPlay: null,
            logs: [],
        });
    });
    await setTournamentLive(tournament.id); // set the tournament to live in the database
    liveTournaments.push({
        id: tournament.id, isStarted: false, playersArr: tournament.playersArr,
        activeSockets: [], currentPlayers: currentPlayers, roundPlayersArr: [],
        timeBetweenRounds: tournament.timeBetweenRounds, timePerMove: tournament.timePerMove,
        rules: tournament.rules, tournamentType: tournament.tournamentType
    });
}

const CreateTorunamentRound = async (tournamentId) => {
    let index = liveTournaments.findIndex(t => t.id === tournamentId);
    if (index !== -1) {
        let currentPlayers = liveTournaments[index].currentPlayers;
        currentPlayers.forEach((player, playerIdx) => {
            while (player.matchWith === null) {
                let randomplayerIdx = Math.floor(Math.random() * currentPlayers.length);
                let randomPlayer = currentPlayers[randomplayerIdx];
                if (randomPlayer.userId !== player.userId && randomPlayer.matchWith === null) {
                    player.matchWith = randomPlayer.userId;
                    randomPlayer.matchWith = player.userId;
                    player.isPlaying = true;
                    randomPlayer.isPlaying = true;
                    player.no = 1;
                    player.choice = null;
                    player.bet = null;
                    player.score = 10;
                    player.round = 1;
                    randomPlayer.no = 2;
                    randomPlayer.choice = null;
                    randomPlayer.bet = null;
                    randomPlayer.score = 10;
                    randomPlayer.round = 1;
                    let roles = decideRoles();
                    player.role = roles[0];
                    player.betTimeSeconds = 0;
                    player.logs = [{ message: 'Welcome to Magic Marble!', type: 'info' },
                    { message: 'Players have been assigned roles randomly', type: 'info' },
                    { message: `Round 1`, type: 'round' },
                    { message: 'Make your moves', type: 'info' }];
                    randomPlayer.role = roles[1];
                    randomPlayer.betTimeSeconds = 0;
                    randomPlayer.logs = [{ message: 'Welcome to Magic Marble!', type: 'info' },
                    { message: 'Players have been assigned roles randomly', type: 'info' },
                    { message: `Round 1`, type: 'round' },
                    { message: 'Make your moves', type: 'info' }];
                    if (player.role === "hider") {
                        player.playerToPlay = 1;
                        randomPlayer.playerToPlay = 1;
                    } else {
                        player.playerToPlay = 2;
                        randomPlayer.playerToPlay = 2;
                    }
                    // updating current players
                    currentPlayers[playerIdx] = player;
                    currentPlayers[randomplayerIdx] = randomPlayer;
                }
            }
        });
        liveTournaments[index].currentPlayers = currentPlayers;
        let roundPlayers = [];
        currentPlayers.forEach(player => {
            if (player.isPlaying) {
                roundPlayers.push(player.userId);
            }
        });
        liveTournaments[index].roundPlayersArr.push(roundPlayers);
        await setTournamentRoundPlayersArr(tournamentId, liveTournaments[index].roundPlayersArr); // update from database

        messageToAllSockets(tournamentId, "update", { tournament: liveTournaments[index] });
    }
}

const decideRoles = () => {
    const result = Math.floor(Math.random() * 2);
    let role1 = ((result === 0) ? "hider" : "guesser");
    let role2 = ((result === 0) ? "guesser" : "hider");
    return [role1, role2];
}

const checkValidSocket = (socket, data) => {
    let index = liveTournaments.findIndex(tournament => tournament.id === data.tournamentId);
    if (index != -1) {
        let player = liveTournaments[index].currentPlayers.find(p => p.userId === data.userId);
        if (player) {
            let asIndex = liveTournaments[index].activeSockets.findIndex(as => as.socketId === socket.id);
            if (asIndex === -1) {
                liveTournaments[index].activeSockets.push({ socketId: socket.id, userId: data.userId });
            }
            asIndex = activeSockets.findIndex(as => as.socketId === socket.id);
            if (asIndex === -1) {
                activeSockets.push({ socketId: socket.id, userId: data.userId });
            }
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
    let tournament = getLiveTournament(data);
    if (tournament) {
        socket.emit("update", { tournament: tournament });
    }
}

const getLiveTournament = (data) => {
    let tournament = liveTournaments.find(tour => tour.id === data.tournamentId);
    if (tournament) {
        let player = tournament.currentPlayers.find(p => p.userId === data.userId);
        if (player) {
            if (tournament.isStarted) {
                return tournament;
            }
        }
        else {
            return null;
        }
    }
    else {
        return null;
    }
}

const addBet = async (data) => {
    let index = liveTournaments.findIndex(t => t.id === data.tournamentId);
    if (index !== -1) {
        let playerIdx = liveTournaments[index].currentPlayers.findIndex(p => p.userId === data.userId);
        if (playerIdx !== -1) {
            var playerOne = liveTournaments[index].currentPlayers[playerIdx];
            let matchWithPlayerIdx = liveTournaments[index].currentPlayers.findIndex(p => p.userId === playerOne.matchWith);
            if (matchWithPlayerIdx !== -1) {
                var playerTwo = liveTournaments[index].currentPlayers[matchWithPlayerIdx];
                playerOne.choice = data.choice;
                playerOne.bet = data.bet;
                playerOne.betTimeSeconds = 0;

                if (playerOne.role === "guesser") {
                    // resolve turn
                    let roundWinner = null;
                    let wonAmount = 0;
                    let outcome = null;
                    if (playerOne.choice === playerTwo.choice) {
                        if (liveTournaments[index].rules === "Guesser determines the wager amount") {
                            playerOne.score += Number(playerOne.bet);
                            playerTwo.score -= Number(playerOne.bet);
                        }
                        else if (liveTournaments[index].rules === "Wager amount = average bet of both players") {
                            let avgBet = Math.floor((Number(playerOne.bet) + Number(playerTwo.bet)) / 2);
                            playerOne.score += avgBet;
                            playerTwo.score -= avgBet;
                        }
                        roundWinner = playerOne.username;
                        wonAmount = playerOne.bet;
                        outcome = "guessed correctly";
                    }
                    else {
                        if (liveTournaments[index].rules === "Guesser determines the wager amount") {
                            playerOne.score -= Number(playerOne.bet);
                            playerTwo.score += Number(playerOne.bet);
                        }
                        else if (liveTournaments[index].rules === "Wager amount = average bet of both players") {
                            let avgBet = Math.floor((Number(playerOne.bet) + Number(playerTwo.bet)) / 2);
                            playerOne.score -= avgBet;
                            playerTwo.score += avgBet;
                        }
                        roundWinner = playerTwo.username;
                        wonAmount = playerOne.bet;
                        outcome = "not figured out correctly";
                    }

                    // checking winner and loser
                    if (playerOne.score <= 0) {
                        playerOne.isPlaying = false;
                        playerOne.playerToPlay = 0;
                        playerOne.totalRounds += 1;
                        playerTwo.totalRounds += 1;
                        playerTwo.winRounds += 1;
                    }
                    if (playerTwo.score <= 0) {
                        playerTwo.isPlaying = false;
                        playerTwo.playerToPlay = 0;
                        playerOne.totalRounds += 1;
                        playerTwo.totalRounds += 1;
                        playerOne.winRounds += 1;
                    }

                    playerOne.round += 1;
                    playerTwo.round = playerOne.round;

                    if (playerOne.score === 0 || playerTwo.score === 0) {
                        playerOne.logs = playerOne.logs.concat([{ message: `${roundWinner} ${outcome} and won ${wonAmount} marbles.`, type: 'info' }]);
                        playerOne.logs = playerOne.logs.concat([{ message: `${playerOne.username} bet ${playerOne.bet} as ${playerOne.role} vs ${playerTwo.username}'s ${playerTwo.bet} as ${playerTwo.role}`, type: 'info' }]);
                        playerOne.logs = playerOne.logs.concat([{ message: 'Game Over', type: 'info' }]);
                        playerOne.logs = playerOne.logs.concat([{ message: `${roundWinner} is the winner`, type: 'info' }]);
                    }
                    else {
                        playerOne.logs = playerOne.logs.concat([{ message: `${roundWinner} ${outcome} and won ${wonAmount} marbles.`, type: 'info' }]);
                        playerOne.logs = playerOne.logs.concat([{ message: `${playerOne.username} bet ${playerOne.bet} as ${playerOne.role} vs ${playerTwo.username}'s ${playerTwo.bet} as ${playerTwo.role}`, type: 'info' }]);
                        playerOne.logs = playerOne.logs.concat([{ message: `Round ${playerOne.round}`, type: 'round' }]);
                        playerOne.logs = playerOne.logs.concat([{ message: 'Make your moves', type: 'info' }]);
                    }
                    playerTwo.logs = playerOne.logs;

                    // updating player
                    liveTournaments[index].currentPlayers[playerIdx] = playerOne;
                    liveTournaments[index].currentPlayers[matchWithPlayerIdx] = playerTwo;

                    // sending messages to all sockets
                    messageToAllSockets(data.tournamentId, "winRound", { roundWinner: roundWinner, wonAmount: wonAmount, tournamentId: liveTournaments[index].id });
                    // updating player records
                    messageToAllSockets(data.tournamentId, "update", { tournament: liveTournaments[index] });

                    if (playerOne.score > 0 && playerTwo.score > 0) {
                        // Changing Roles
                        if (playerOne.score === 1) {
                            playerOne.role = "guesser";
                            playerTwo.role = "hider";
                        }
                        else if (playerTwo.score === 1) {
                            playerOne.role = "hider";
                            playerTwo.role = "guesser";
                        }
                        else if (playerOne.role === "hider") {
                            playerOne.role = "guesser";
                            playerTwo.role = "hider";
                        }
                        else if (playerOne.role === "guesser") {
                            playerOne.role = "hider";
                            playerTwo.role = "guesser";
                        }

                        // Deciding who will start
                        if (playerOne.role === "hider") {
                            playerOne.playerToPlay = playerOne.no;
                            playerTwo.playerToPlay = playerOne.no;
                        }
                        else if (playerOne.role === "guesser") {
                            playerOne.playerToPlay = playerTwo.no;
                            playerTwo.playerToPlay = playerTwo.no;
                        }
                        playerOne.betTimeSeconds = 0;
                        playerTwo.betTimeSeconds = 0;

                        // updating player
                        liveTournaments[index].currentPlayers[playerIdx] = playerOne;
                        liveTournaments[index].currentPlayers[matchWithPlayerIdx] = playerTwo;

                        messageToAllSockets(data.tournamentId, "update", { tournament: liveTournaments[index] });
                    }
                    else {
                        // admin check the status of the tournament
                        CheckTournamentStatus(data.tournamentId);
                    }
                }
                else {
                    playerOne.playerToPlay = ((playerOne.playerToPlay === 1) ? 2 : 1);
                    playerTwo.playerToPlay = ((playerTwo.playerToPlay === 1) ? 2 : 1);

                    playerOne.betTimeSeconds = 0;
                    playerTwo.betTimeSeconds = 0;

                    // updating player
                    liveTournaments[index].currentPlayers[playerIdx] = playerOne;
                    liveTournaments[index].currentPlayers[matchWithPlayerIdx] = playerTwo;

                    messageToAllSockets(data.tournamentId, "update", { tournament: liveTournaments[index] });
                }
            }
        }
        else {
            return { status: false, message: "Player not found" };
        }
    }
    else {
        return { status: false, message: "Tournament not found" };
    }
}

const addMessage = async (data) => {
    let index = liveTournaments.findIndex(t => t.id === data.tournamentId);
    if (index !== -1) {
        let playerIdx = liveTournaments[index].currentPlayers.findIndex(p => p.userId === data.userId);
        if (playerIdx !== -1) {
            var playerOne = liveTournaments[index].currentPlayers[playerIdx];
            let matchWithPlayerIdx = liveTournaments[index].currentPlayers.findIndex(p => p.userId === playerOne.matchWith);
            if (matchWithPlayerIdx !== -1) {
                var playerTwo = liveTournaments[index].currentPlayers[matchWithPlayerIdx];

                playerOne.logs = playerOne.logs.concat([{ message: data.message, by: playerOne.username, type: 'message' }]);
                playerTwo.logs = playerOne.logs;

                // updating player
                liveTournaments[index].currentPlayers[playerIdx] = playerOne;
                liveTournaments[index].currentPlayers[matchWithPlayerIdx] = playerTwo;

                // updating player records
                messageToAllSockets(data.tournamentId, "message", { by: playerOne.username, to: playerTwo.username, message: data.message, tournamentId: liveTournaments[index].id });
                messageToAllSockets(data.tournamentId, "update", { tournament: liveTournaments[index] });
            }
            else {
                return { status: false, message: "Player not found" };
            }
        }
        else {
            return { status: false, message: "Player not found" };
        }
    }
    else {
        return { status: false, message: "Player not found" };
    }
}

const CheckTournamentStatus = (tournamentId) => {
    setTimeout(() => {
        let index = liveTournaments.findIndex(tournament => tournament.id === tournamentId);
        if (index !== -1) {
            if (liveTournaments[index].isStarted) {
                liveTournaments[index].currentPlayers.forEach(async (player) => {
                    if (!player.isPlaying) {
                        if ((player.totalRounds - player.winRounds) > 0) {
                            let matchWithPlayerIdx = liveTournaments[index].currentPlayers.findIndex((p) => p.userId === player.matchWith);
                            if (matchWithPlayerIdx !== -1) {
                                liveTournaments[index].currentPlayers[matchWithPlayerIdx].matchWith = null;
                            }
                            // remove player from current players
                            liveTournaments[index].currentPlayers = liveTournaments[index].currentPlayers.filter((p) => p.userId !== player.userId);
                            messageToAPlayer(tournamentId, player.userId, "endTournament", { tournamentId: liveTournaments[index].id });
                        }
                    }
                });
                messageToAllSockets(tournamentId, "update", { tournament: liveTournaments[index] });
                setTimeout(async () => {
                    if (liveTournaments[index]) {
                        let length = liveTournaments[index].currentPlayers.length;
                        if (length === 0) {
                            liveTournaments[index].isStarted = false;
                        }
                        if (length === 1) {
                            let intervalIndex = intervalsArr.findIndex(interval => interval.tournamentId === tournamentId);
                            if (intervalIndex > -1) {
                                clearInterval(intervalsArr[intervalIndex].interval);
                            }
                            liveTournaments[index].isStarted = false;
                            await setTournamentCompleted(tournamentId, liveTournaments[index].currentPlayers[0].userId);
                            messageToAPlayer(tournamentId, liveTournaments[index].currentPlayers[0].userId, "endTournament", { tournamentId: liveTournaments[index].id });
                            liveTournaments = liveTournaments.filter(t => t.id !== tournamentId);
                        }
                        if (length === 2 || length === 4 || length === 8 || length === 16 || length === 32 || length === 64 || length === 128 || length === 256 || length === 512) {
                            await CreateTorunamentRound(tournamentId);
                        }
                    }
                }, liveTournaments[index].timeBetweenRounds * 1000);
            }
        }
    }, 10000);
}

const removeSocket = (socketId) => {
    // remove the player from the liveTournaments
    for (let i = 0; i < liveTournaments.length; i++) {
        for (let j = 0; j < liveTournaments[i].activeSockets.length; j++) {
            if (liveTournaments[i].activeSockets[j].socketId === socketId) {
                liveTournaments[i].activeSockets.splice(j, 1);
                break;
            }
        }
    }
    // remove the player from the activeSockets
    let index = activeSockets.findIndex(as => as.socketId === socketId);
    if (index !== -1) {
        activeSockets.splice(index, 1);
    }
};

// used for sending message to all sockets in tournament
const messageToAllSockets = (tournamentId, name, data) => {
    let index = liveTournaments.findIndex(t => t.id === tournamentId);
    if (index !== -1) {
        liveTournaments[index].currentPlayers.forEach((p) => {
            activeSockets.forEach(as => {
                if (p.userId === as.userId) {
                    io.sockets.to(as.socketId).emit(name, data);
                }
            });
        });
    }
};

// used for sending message to all players
const messageToAllPlayers = (tournamentId, name, data) => {
    let index = liveTournaments.findIndex(t => t.id === tournamentId);
    if (index !== -1) {
        liveTournaments[index].currentPlayers.forEach((p) => {
            var isSent = false;
            activeSockets.forEach(as => {
                if (isSent === false) {
                    if (p.userId === as.userId) {
                        if (as.socketId !== "undefined") {
                            isSent = true;
                            io.sockets.to(as.socketId).emit(name, data);
                        }
                    }
                }
            });
        });
    }
};

// used for sending message to player and opponent
const messageToAPlayer = (tournamentId, userId, name, data) => {
    let index = liveTournaments.findIndex(t => t.id === tournamentId);
    if (index !== -1) {
        liveTournaments[index].currentPlayers.forEach((player) => {
            activeSockets.forEach(activeSocket => {
                if (player.userId === activeSocket.userId) {
                    if (player.userId === userId) {
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

const removeLiveTournament = (id) => {
    let index = liveTournaments.findIndex(tournament => tournament.id === id);
    if (index !== -1) {
        messageToAllSockets(id, "deletedTournament", { tournamentId: id });
        liveTournaments.splice(index, 1);
    }
}
// end of admin functions

// admin and player functions are that both player and admin can use
const addSocket = (socketId, user) => {
    if (socketId) { // if socket is not null
        if (activeSockets.findIndex(activeSocket => activeSocket.socketId === socketId) === -1) {
            activeSockets.push({ socketId: socketId, userId: user.id });
        }
    }
};

const removeSocketsWithUserId = (userId) => {
    // remove all sockets that have the userId
    activeSockets = activeSockets.filter(activeSocket => activeSocket.userId !== userId);
    // remove the player from the liveTournaments
    for (let i = 0; i < liveTournaments.length; i++) {
        for (let j = 0; j < liveTournaments[i].activeSockets.length; j++) {
            if (liveTournaments[i].activeSockets[j].userId === userId) {
                liveTournaments[i].activeSockets.splice(j, 1);
            }
        }
    }
};
// end of admin and player functions

module.exports = {
    initServer,
    addSocket,
    addBet,
    addMessage,
    getLiveTournament,
    removeSocketsWithUserId,
    addUpcomingTournament,
    updateUpcomingTournament,
    removeUpcomingTournament,
    removeLiveTournament
}