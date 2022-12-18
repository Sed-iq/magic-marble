/*
    Here is our Website API...
    These all funcitons are router functions.
    Therefore each function is called with req and res.

    Router functions are called from index.js
*/

const crypto = require('../crypto/crypto');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const { addSocket, removeSocketsWithUserId, addUpcomingTournament,
    updateUpcomingTournament, removeUpcomingTournament,
    removeCurrentTournament } = require('../tournaments/tournaments');

// import the models
const Tournament = require('../models/tournament');
const User = require('../models/user');

const JWT_SECRET = "IamSECRET";


const Google = (req, res) => {
    passport.authenticate("google",["profile", "email"])
    console.log("Google");
};

const GoogleCallback = (req, res) => {
    passport.authenticate("google", {
        successRedirect: "https://squid-app-mtjl8.ondigitalocean.app/player/dashbaord",
        failureRedirect: "https://squid-app-mtjl8.ondigitalocean.app/login",
    })
    console.log("Google Callback");
};

// register
const signup = (req, res) => {
    let { username, email, password } = req.body;
    User.findOne({ $or: [{ username: username, email: email }] }, (err, user) => {
        if (err) {
            return res.status(500).json({ error: err._message });
        }
        if (user) {
            return res.status(400).json({ error: 'Username or Email already exists' });
        }
        // check valid email or not
        if (!String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )) {
            return res.status(400).json({ error: 'Email is not valid' });
        }
        let id = 0;
        User.find({}, (err, users) => {
            if (err) {
                return res.status(500).json({ error: err._message });
            }
            if (users.length > 0) {
                id = parseInt(crypto.decrypt(users[users.length - 1].id)) + 1;
            }
            const newUser = new User({
                id: crypto.encrypt(id.toString()),
                username: username,
                email: email,
                password: crypto.encrypt(password.toString()),
                isAdmin: false,
                total: 0,
                wins: 0,
                loses: 0,
                status: 'active',
                createDateTime: new Date(),
                deleteDateTime: null,
                tournamentsArr: []
            });
            newUser.save((err, user) => {
                if (err) {
                    return res.status(500).json({ error: err._message });
                }
                res.status(200).json({ message: 'User registered successfully' });
            });
        });
    });
}

// login
const login = (req, res) => {
    let { email, password } = req.body;
    User.findOne({ email: email }, (err, user) => {
        if (err) {
            return res.status(500).json({ error: err._message });
        }
        if (!user) {
            return res.status(400).json({ error: 'Email does not exist' });
        }
        if (user.status === 'inactive') {
            return res.status(400).json({ error: 'Your account has been deleted' });
        }
        if (user.signupby === 'google') {
            return res.status(400).json({ error: 'You have signed up with google' });
        }
        // decrypt password
        const decryptedPassword = crypto.decrypt(user.password);
        if (decryptedPassword !== password) {
            return res.status(400).json({ error: 'Password is incorrect' });
        }
        // create token
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1y' });
        res.status(200).json({ token: token });
    });
}

// update user like name
const updateUser = (req, res) => {
    let { userId, username } = req.body;
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            return res.status(500).json({ error: err._message });
        }
        if (user && user.id !== userId) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        User.findOneAndUpdate({ id: userId }, { username: username }, (err, user) => {
            if (err) {
                return res.status(500).json({ error: err._message });
            }
            if (!user) {
                return res.status(400).json({ error: 'User does not exist' });
            }
            if (user.status === 'inactive') {
                return res.status(400).json({ error: 'User account has been deleted' });
            }
            res.status(200).json({ user: user });
        });
    });
}

// update user like admin access
const updateUserAdminAccess = (req, res) => {
    let { userId, adminAccess } = req.body;
    User.findOne({ id: userId }, (err, user) => {
        if (err) {
            return res.status(500).json({ error: err._message });
        }
        console.log('agya hoo tum sunao');
        User.findOneAndUpdate({ id: userId }, { adminAccess: adminAccess }, (err, user) => {
            if (err) {
                return res.status(500).json({ error: err._message });
            }
            if (!user) {
                return res.status(400).json({ error: 'User does not exist' });
            }
            if (user.status === 'inactive') {
                return res.status(400).json({ error: 'User account has been deleted' });
            }
            res.status(200).json({ user: user });
        });
    });
}


// detete
const deleteUser = (req, res) => {
    let { userId } = req.body;
    User.findOneAndUpdate({ id: userId }, { status: 'inactive', deleteDateTime: new Date() }, (err, user) => {
        if (err) {
            return res.status(500).json({ error: err._message });
        }
        if (!user) {
            return res.status(400).json({ error: 'User does not exist' });
        }
        if (user.status === 'inactive') {
            return res.status(400).json({ error: 'User account has been already deleted' });
        }
        // remove user from upcmoing tournaments
        removeSocketsWithUserId(user.id);
        Tournament.find({ status: 'upcoming' }, (err, tournaments) => {
            if (err) {
                return res.status(500).json({ error: err._message });
            }
            if (tournaments && tournaments.length > 0) {
                tournaments.forEach(tournament => {
                    let players = tournament.players;
                    if (players && players.length > 0) {
                        let newPlayers = [];
                        players.forEach(player => {
                            if (player.id !== user.id) {
                                newPlayers.push(player);
                            }
                        });

                        Tournament.findOneAndUpdate({ id: tournament.id }, { players: newPlayers }, (err, tournament) => {
                            if (err) {
                                return res.status(500).json({ error: err._message });
                            }
                            if (!tournament) {
                                return res.status(400).json({ error: 'Tournament does not exist' });
                            }
                        });
                    }
                });
            }
        });
        res.status(200).json({ message: 'User deleted successfully' });
    });
}

// get a user
const getUser = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const socketId = req.headers.socketid;
    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to authenticate token' });
        }
        req.userId = decoded.id;
        User.findOne({ id: req.userId }, (err, user) => {
            if (err) {
                return res.status(500).json({ error: err._message });
            }
            if (!user) {
                return res.status(400).json({ error: 'User does not exist' });
            }
            if (user.status === 'inactive') {
                return res.status(400).json({ error: 'User account has been deleted' });
            }
            // set socket
            if (socketId) {
                addSocket(socketId, user);
            }
            // separate password and other attributes from user
            const { password, ...userWithoutPassword } = user._doc;
            return res.status(200).json({ user: userWithoutPassword });
        });
    });
}

// get a user
const getUserWithUserId = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const userId = req.headers.userid;
    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to authenticate token' });
        }
        User.findOne({ id: decoded.id }, (err, user) => {
            if (err) {
                return res.status(500).json({ error: err._message });
            }
            if (!user) {
                return res.status(400).json({ error: 'User does not exist' });
            }
            if (user.status === 'inactive') {
                return res.status(400).json({ error: 'User account has been deleted' });
            }
            if (!user.isAdmin) {
                return res.status(400).json({ error: 'User is not admin' });
            }
            User.findOne({ id: userId }, (err, user) => {
                if (err) {
                    return res.status(500).json({ error: err._message });
                }
                if (!user) {
                    return res.status(400).json({ error: 'User does not exist' });
                }
                if (user.status === 'inactive') {
                    return res.status(400).json({ error: 'User account has been deleted' });
                }
                // separate password and other attributes from user
                const { password, ...userWithoutPassword } = user._doc;
                return res.status(200).json({ user: userWithoutPassword });
            });
        });
    });
}

// get all players
const getAllPlayers = (req, res) => {
    let { userId } = req.query;
    User.findOne({ id: userId }, (err, user) => {
        if (err) {
            return res.status(500).json({ error: err._message });
        }
        if (!user) {
            return res.status(400).json({ error: 'User does not exist' });
        }
        if (user.status === 'inactive') {
            return res.status(400).json({ error: 'User account has been deleted' });
        }
        if (!user.isAdmin) {
            return res.status(400).json({ error: 'User is not admin' });
        }
        User.find({ isAdmin: false }, async (err, users) => {
            if (err) {
                return res.status(500).json({ error: err._message });
            }
            let usersWithoutPassword = [];
            for (let user of users) {
                const tournaments = await Tournament.find({ status: 'completed', winnerId: user.id });
                let userWithoutPassword = {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    tournamentsArr: user.tournamentsArr,
                    wins: tournaments.length,
                    status: user.status,
                    createDateTime: user.createDateTime,
                    adminAccess: user.adminAccess,
                };
                usersWithoutPassword.push(userWithoutPassword);
            }
            return res.status(200).json({ players: usersWithoutPassword });
        });
    });
}

// create a new tournament
const createTournament = (req, res) => {
    let { userId, name, rules, tournamentType, maxPlayers, timePerMove, timeBetweenRounds, startDateTime, description, prizeAndDistribution, optionalLink } = req.body;
    User.findOne({ id: userId }, (err, user) => {
        if (err) {
            return res.status(500).json({ error: err._message });
        }
        if (!user) {
            return res.status(400).json({ error: 'User does not exist' });
        }
        if (user.status === 'inactive') {
            return res.status(400).json({ error: 'User account has been deleted' });
        }
        Tournament.findOne({ name: name, status: { $nin: ['deleted'] } }, (err, tournament) => {
            if (err) {
                return res.status(500).json({ error: err._message });
            }
            if (tournament) {
                return res.status(400).json({ error: 'Tournament name already exists' });
            }
            let id = 0;
            Tournament.find({}, (err, tournaments) => {
                if (err) {
                    return res.status(500).json({ error: err._message });
                }
                if (tournaments.length > 0) {
                    id = parseInt(crypto.decrypt(tournaments[tournaments.length - 1].id)) + 1;
                }
                const newTournament = new Tournament({
                    id: crypto.encrypt(id.toString()),
                    name: name,
                    status: 'upcoming',
                    rules: rules,
                    createdBy: user.id,
                    tournamentType: tournamentType,
                    maxPlayers: maxPlayers,
                    timePerMove: timePerMove,
                    timeBetweenRounds: timeBetweenRounds,
                    description: description,
                    prizeAndDistribution: prizeAndDistribution,
                    optionalLink: optionalLink,
                    createDateTime: new Date(),
                    startDateTime: startDateTime,
                    endDateTime: null,
                    deleteDateTime: null,
                    winnerId: null,
                    winner: null,
                    playersArr: [],
                    roundPlayersArr: []
                });
                newTournament.save((err, tournament) => {
                    if (err) {
                        return res.status(500).json({ error: err._message });
                    }
                    if (!tournament) {
                        return res.status(400).json({ error: 'Tournament could not be created' });
                    }
                    addUpcomingTournament(tournament);
                    return res.status(200).json({ tournament: tournament });
                });
            });
        });
    });
}

// join a tournament
const joinTournament = (req, res) => {
    let { tournamentId, userId } = req.body;
    Tournament.findOne({ id: tournamentId }, (err, tournament) => {
        if (err) {
            return res.status(500).json({ error: err._message });
        }
        if (!tournament) {
            return res.status(400).json({ error: 'Tournament does not exist' });
        }
        if (tournament.status === 'live') {
            return res.status(400).json({ error: 'Tournament has been already started' });
        }
        if (tournament.status === 'completed') {
            return res.status(400).json({ error: 'Tournament has been already ended' });
        }
        if (tournament.status === 'deleted') {
            return res.status(400).json({ error: 'Tournament has been already deleted' });
        }
        if (tournament.playersArr.length >= tournament.maxPlayers) {
            return res.status(400).json({ error: 'Tournament is full' });
        }
        User.findOne({ id: userId }, (err, user) => {
            if (err) {
                return res.status(500).json({ error: err._message });
            }
            if (!user) {
                return res.status(400).json({ error: 'User does not exist' });
            }
            if (user.status === 'inactive') {
                return res.status(400).json({ error: 'User account has been deleted' });
            }
            if (tournament.playersArr.includes(userId)) {
                return res.status(400).json({ error: 'User is already in tournament' });
            }
            user.tournamentsArr.push(tournamentId);
            tournament.playersArr.push(userId);
            user.save((err, user) => {
                if (err) {
                    return res.status(500).json({ error: err._message });
                }
                if (!user) {
                    return res.status(400).json({ error: 'User could not be added to tournament' });
                }
                tournament.save((err, tournament) => {
                    if (err) {
                        return res.status(500).json({ error: err._message });
                    }
                    if (!tournament) {
                        return res.status(400).json({ error: 'User could not join tournament' });
                    }
                    return res.status(200).json({ message: 'You have joined successfully' });
                });
            });
        });
    });
}

// leave tournament
const leaveTournament = (req, res) => {
    let { tournamentId, userId } = req.body;
    Tournament.findOne({ id: tournamentId }, (err, tournament) => {
        if (err) {
            return res.status(500).json({ error: err._message });
        }
        if (!tournament) {
            return res.status(400).json({ error: 'Tournament does not exist' });
        }
        if (tournament.status === 'live') {
            return res.status(400).json({ error: 'Tournament has been already started' });
        }
        if (tournament.status === 'completed') {
            return res.status(400).json({ error: 'Tournament has been already ended' });
        }
        if (tournament.status === 'deleted') {
            return res.status(400).json({ error: 'Tournament has been already deleted' });
        }
        User.findOne({ id: userId }, (err, user) => {
            if (err) {
                return res.status(500).json({ error: err._message });
            }
            if (!user) {
                return res.status(400).json({ error: 'User does not exist' });
            }
            if (user.status === 'inactive') {
                return res.status(400).json({ error: 'User account has been deleted' });
            }
            if (!tournament.playersArr.includes(userId)) {
                return res.status(400).json({ error: 'User is not in tournament' });
            }
            user.tournamentsArr.splice(user.tournamentsArr.indexOf(tournamentId), 1);
            tournament.playersArr.splice(tournament.playersArr.indexOf(userId), 1);
            user.save((err, user) => {
                if (err) {
                    return res.status(500).json({ error: err._message });
                }
                if (!user) {
                    return res.status(400).json({ error: 'User could not be removed from tournament' });
                }
                tournament.save((err, tournament) => {
                    if (err) {
                        return res.status(500).json({ error: err._message });
                    }
                    if (!tournament) {
                        return res.status(400).json({ error: 'User could not leave tournament' });
                    }
                    return res.status(200).json({ message: 'Left Tournament Successfully' });
                });
            });
        });
    });
}

// update tournament
const updateTournament = (req, res) => {
    let { tournamentId, userId, name, rules, tournamentType, maxPlayers, timePerMove, timeBetweenRounds, startDateTime, description, prizeAndDistribution, optionalLink } = req.body;
    User.findOne({ id: userId }, (err, user) => {
        if (err) {
            return res.status(500).json({ error: err._message });
        }
        if (!user) {
            return res.status(400).json({ error: 'User does not exist' });
        }
        if (user.status === 'inactive') {
            return res.status(400).json({ error: 'User account has been deleted' });
        }
        if (!user.isAdmin) {
            return res.status(400).json({ error: 'User is not an admin' });
        }
        Tournament.findOne({ id: tournamentId }, (err, tournament) => {
            if (err) {
                return res.status(500).json({ error: err._message });
            }
            if (!tournament) {
                return res.status(400).json({ error: 'Tournament does not exist' });
            }
            if (tournament.status === 'live') {
                return res.status(400).json({ error: 'Tournament has already started' });
            }
            if (tournament.status === 'completed') {
                return res.status(400).json({ error: 'Tournament has already ended' });
            }
            if (tournament.status === 'deleted') {
                return res.status(400).json({ error: 'Tournament has already been deleted' });
            }
            if (name) {
                tournament.name = name;
            }
            if (rules) {
                tournament.rules = rules;
            }
            if (tournamentType) {
                tournament.tournamentType = tournamentType;
            }
            if (maxPlayers) {
                if (maxPlayers < tournament.maxPlayers) {
                    if (tournament.playersArr.length > maxPlayers) {
                        return res.status(400).json({ error: 'Tournament has more players than maxPlayers' });
                    }
                }
                tournament.maxPlayers = maxPlayers;
            }
            if (timePerMove) {
                tournament.timePerMove = timePerMove;
            }
            if (timeBetweenRounds) {
                tournament.timeBetweenRounds = timeBetweenRounds;
            }
            if (startDateTime) {
                tournament.startDateTime = startDateTime;
            }
            if (description) {
                tournament.description = description;
            }
            if (prizeAndDistribution) {
                tournament.prizeAndDistribution = prizeAndDistribution;
            }
            if (optionalLink) {
                tournament.optionalLink = optionalLink;
            }
            tournament.save((err, tournament) => {
                if (err) {
                    return res.status(500).json({ error: err._message });
                }
                if (!tournament) {
                    return res.status(400).json({ error: 'Tournament could not be updated' });
                }
                updateUpcomingTournament(tournament);
                return res.status(200).json({ tournament: tournament });
            });
        });
    });
}

// delete tournament
const deleteTournament = (req, res) => {
    let { tournamentId, userId } = req.body;
    User.findOne({ id: userId }, (err, user) => {
        if (err) {
            return res.status(500).json({ error: err._message });
        }
        if (!user) {
            return res.status(400).json({ error: 'User does not exist' });
        }
        if (user.status === 'inactive') {
            return res.status(400).json({ error: 'User account has been deleted' });
        }
        if (!user.isAdmin) {
            return res.status(400).json({ error: 'User is not an admin' });
        }
        Tournament.findOne({ id: tournamentId }, (err, tournament) => {
            if (err) {
                return res.status(500).json({ error: err._message });
            }
            if (!tournament) {
                return res.status(400).json({ error: 'Tournament does not exist' });
            }
            if (tournament.status === 'deleted') {
                return res.status(400).json({ error: 'Tournament already deleted' });
            }
            if (tournament.status === 'live' || tournament.status === 'upcoming') {
                tournament.status = 'deleted';
                tournament.deleteDateTime = new Date();
                tournament.save((err, tournament) => {
                    if (err) {
                        return res.status(500).json({ error: err._message });
                    }
                    if (!tournament) {
                        return res.status(400).json({ error: 'Tournament could not be deleted' });
                    }
                    removeUpcomingTournament(tournament.id);
                    removeCurrentTournament(tournament.id);
                    return res.status(200).json({ message: "Tournament deleted successfully" });
                });
            }
            else {
                return res.status(400).json({ error: 'Tournament can not be able to Delete' });
            }
        });
    });
}

// get a tournament
const getTournament = (req, res) => {
    let { tournamentId } = req.query;
    let { userId } = req.query;
    User.findOne({ id: userId }, (err, user) => {
        if (err) {
            return res.status(500).json({ error: err._message });
        }
        if (!user) {
            return res.status(400).json({ error: 'User does not exist' });
        }
        if (user.status === 'inactive') {
            return res.status(400).json({ error: 'User account has been deleted' });
        }
        Tournament.findOne({ id: tournamentId }, async (err, tournament) => {
            if (err) {
                return res.status(500).json({ error: err._message });
            }
            if (!tournament) {
                return res.status(400).json({ error: 'Tournament does not exist' });
            }
            return res.status(200).json({ tournament: tournament });
        }).select('-_id -__v -id');
    });
}

// get all tournaments
const getAllTournaments = (req, res) => {
    let { status } = req.query;
    let { userId } = req.query;
    User.findOne({ id: userId }, (err, user) => {
        if (err) {
            return res.status(500).json({ error: err._message });
        }
        if (!user) {
            return res.status(400).json({ error: 'User does not exist' });
        }
        if (user.status === 'inactive') {
            return res.status(400).json({ error: 'User account has been deleted' });
        }
        Tournament.find({ status: status }, async (err, tournaments) => {
            if (err) {
                return res.status(500).json({ error: err._message });
            }
            if (!tournaments) {
                return res.status(400).json({ tournaments: [] });
            }
            return res.status(200).json({ tournaments: tournaments });
        }).select('-_id -__v');
    });
}

// get admin dashboard data
const getAdminDashboardData = (req, res) => {
    let { userId } = req.query;
    User.findOne({ id: userId }, (err, user) => {
        if (err) {
            return res.status(500).json({ error: err._message });
        }
        if (!user) {
            return res.status(400).json({ error: 'User does not exist' });
        }
        if (user.status === 'inactive') {
            return res.status(400).json({ error: 'User account has been deleted' });
        }
        if (!user.isAdmin) {
            return res.status(400).json({ error: 'User is not an admin' });
        }
        User.find({ status: 'active', isAdmin: false }, (err, users) => {
            if (err) {
                return res.status(500).json({ error: err._message });
            }
            Tournament.find({}, (err, tournaments) => {
                if (err) {
                    return res.status(500).json({ error: err._message });
                }
                let totalPlayers = users.length;
                let upcomingTournaments = 0;
                let liveTournaments = 0;
                let completedTournaments = 0;
                tournaments.forEach(tournament => {
                    if (tournament.status === 'upcoming') {
                        upcomingTournaments++;
                    } else if (tournament.status === 'live') {
                        liveTournaments++;
                    } else if (tournament.status === 'completed') {
                        completedTournaments++;
                    }
                });
                return res.status(200).json({ totalPlayers: totalPlayers, upcomingTournaments: upcomingTournaments, liveTournaments: liveTournaments, completedTournaments: completedTournaments });
            });
        });
    });
}

// get all tournaments where player is registered
const getPlayerTournaments = (req, res) => {
    let { userId, status } = req.query;
    User.findOne({ id: userId }, (err, user) => {
        if (err) {
            return res.status(500).json({ error: err._message });
        }
        if (!user) {
            return res.status(400).json({ error: 'User does not exist' });
        }
        if (user.status === 'inactive') {
            return res.status(400).json({ error: 'User account has been deleted' });
        }
        if (user.isAdmin) {
            return res.status(400).json({ error: 'User is an admin' });
        }
        Tournament.find({ playersArr: { $in: [userId] }, status: status }, (err, tournaments) => {
            if (err) {
                return res.status(500).json({ error: err._message });
            }
            if (tournaments.length === 0) {
                return res.status(200).json({ tournaments: [] });
            }
            return res.status(200).json({ tournaments: tournaments });
        });
    });
}

// get player dashboard data
const getPlayerDashboardData = (req, res) => {
    let { userId } = req.query;
    User.findOne({ id: userId }, (err, user) => {
        if (err) {
            return res.status(500).json({ error: err._message });
        }
        if (!user) {
            return res.status(400).json({ error: 'User does not exist' });
        }
        if (user.status === 'inactive') {
            return res.status(400).json({ error: 'User account has been deleted' });
        }
        if (user.isAdmin) {
            return res.status(400).json({ error: 'User is an admin' });
        }
        let myTournaments = 0;
        let createdTournaments = 0;
        let upcomingTournaments = 0;
        Tournament.find({ status: { $ne: 'completed' } }, (err, tournaments) => {
            if (err) {
                return res.status(500).json({ error: err._message });
            }
            tournaments.forEach(tournament => {
                if (tournament.status === 'upcoming') {
                    upcomingTournaments++;
                }
                if (tournament.status === 'upcoming' && tournament.playersArr.includes(userId)) {
                    myTournaments++;
                }
                if (tournament.status === 'live' && tournament.playersArr.includes(userId)) {
                    myTournaments++;
                }
                if (tournament.createdBy === userId) {
                    createdTournaments++;
                }
            });
            return res.status(200).json({ myTournaments: myTournaments, upcomingTournaments: upcomingTournaments, createdTournaments: createdTournaments, wallet: user.wallet });
        });
    });
}

// exports
module.exports = {
    Google,
    GoogleCallback,
    signup,
    login,
    updateUser,
    updateUserAdminAccess,
    deleteUser,
    getUser,
    getUserWithUserId,
    getAllPlayers,
    createTournament,
    joinTournament,
    leaveTournament,
    updateTournament,
    deleteTournament,
    getTournament,
    getAllTournaments,
    getAdminDashboardData,
    getPlayerDashboardData,
    getPlayerTournaments,
}