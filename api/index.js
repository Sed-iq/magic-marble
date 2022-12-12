const express = require("express");
const bodyParser = require("body-parser");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors');

const connectDB = require('./database/mongoose.js');

const { initServer } = require('./tournaments/tournaments.js');

const { register, login, updateUser, deleteUser, getUser, getAllPlayers, createTournament,
    updateTournament, deleteTournament, joinTournament, leaveTournament, getTournament,
    getAllTournaments, getAdminDashboardData, getPlayerDashboardData, getPlayerTournaments, updateUserAdminAccess, getUserWithUserId } = require('./actions/actions.js');


// app config
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5500;

// const WEB_URL = 'http://localhost:3000';
const WEB_URL = "https://squid-app-mtjl8.ondigitalocean.app";
const CONN_URL = 'mongodb+srv://tajammal:FtSTFcuiutGj5A6y@marblesdbcluster.w7hc4a9.mongodb.net/?retryWrites=true&w=majority';


// connect socket.io client
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: WEB_URL,
        methods: ["GET", "POST"]
    }
});
// init game server
initServer(io);

// connect database
connectDB(CONN_URL);


// register
app.post('/register', register);

// login
app.post('/login', login);

// update username of user
app.post('/updateUser', updateUser);

// update username of user
app.post('/updateUserAdminAccess', updateUserAdminAccess);

// delete account of user
app.post('/deleteUser', deleteUser);

// get a user
app.get('/getUser', getUser);

// get a user
app.get('/getUserWithUserId', getUserWithUserId);


// get all players except admin
app.get('/getAllPlayers', getAllPlayers);

// create tournament
app.post('/createTournament', createTournament);

// update tournament
app.post('/updateTournament', updateTournament);

// delete tournament
app.post('/deleteTournament', deleteTournament);

//  join upcoming tournament
app.post('/joinTournament', joinTournament);

// leave tournament
app.post('/leaveTournament', leaveTournament);

// get a tournament
app.get('/getTournament', getTournament);

// get all tournaments
app.get('/getAllTournaments', getAllTournaments);

// get player tournaments
app.get('/getPlayerTournaments', getPlayerTournaments);

// get admin dashboard data
app.get('/getAdminDashboardData', getAdminDashboardData);

// get player dashboard data, 
app.get('/getPlayerDashboardData', getPlayerDashboardData);

app.get('/', (req, res) => {
    res.send("Welcome to the server");
});

httpServer.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});