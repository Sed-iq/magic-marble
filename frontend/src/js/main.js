/*
  Main Pages controler that help us to load and render pages based on url,
    'I have added there first all pages and then loaded all pages after it on base
  of url i am rendering page.'
  Note: We can also add here other page that we want to render.
*/

import '../css/style.css';

// Pages
import Home from './pages/home.js';
import Login from './pages/login.js';
import Register from './pages/register.js';
import Error404 from './pages/error404.js';
import PlayerDashboard from './pages/player/dashboard.js';
import PlayerProfile from './pages/player/profile.js';
import PlayerSetting from './pages/player/setting.js';
import PlayerTournamentsAll from './pages/player/tournaments/all.js';
import PlayerTournamentsJoined from './pages/player/tournaments/joined.js';
import PlayerTournamentsLive from './pages/player/tournaments/live.js';
import PlayerTournamentsPlayed from './pages/player/tournaments/played.js';
import PlayerTournamentsView from './pages/player/tournaments/view.js';
import AdminDashboard from './pages/admin/dashboard.js';
import AdminPlayers from './pages/admin/players.js';
import AdminProfile from './pages/admin/profile.js';
import AdminSetting from './pages/admin/setting.js';
import AdminTournamentsCreate from './pages/admin/tournaments/create.js';
import AdminTournamentsUpcoming from './pages/admin/tournaments/upcoming.js';
import AdminTournamentsLive from './pages/admin/tournaments/live.js';
import AdminTournamentsFinished from './pages/admin/tournaments/finished';
import AdminTournamentsDeleted from './pages/admin/tournaments/deleted.js';
import AdminTournamentsView from './pages/admin/tournaments/view.js';
import AdminTournamentsEdit from './pages/admin/tournaments/edit.js';

import MarblesGame from './pages/games/marblesGame.js';

// creating page objects
let home = new Home();
let login = new Login();
let register = new Register();
let error404 = new Error404();
let playerDashboard = new PlayerDashboard();
let playerProfile = new PlayerProfile();
let playerSetting = new PlayerSetting();
let playerTournamentsAll = new PlayerTournamentsAll();
let playerTournamentsJoined = new PlayerTournamentsJoined();
let playerTournamentsLive = new PlayerTournamentsLive();
let playerTournamentsPlayed = new PlayerTournamentsPlayed();
let playerTournamentsView = new PlayerTournamentsView();
let adminDashboard = new AdminDashboard();
let adminPlayers = new AdminPlayers();
let adminProfile = new AdminProfile();
let adminSetting = new AdminSetting();
let adminTournamentsCreate = new AdminTournamentsCreate();
let adminTournamentsUpcoming = new AdminTournamentsUpcoming();
let adminTournamentsLive = new AdminTournamentsLive();
let adminTournamentsFinished = new AdminTournamentsFinished();
let adminTournamentsDeleted = new AdminTournamentsDeleted();
let adminTournamentsView = new AdminTournamentsView();
let adminTournamentsEdit = new AdminTournamentsEdit();
// games
let marbleGame = new MarblesGame();


// socket.io import
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

// connecting to socket server (API)
const socket = io(API_URL, {
  transports: ['websocket']
});

// call when user connect to socket
socket.on('connect', () => {
  console.log('Connected to server');
  SetSocket(socket);
  renderer();
  setConnectionStatus();
});

// notify when tournaemnt is started for opening tab
socket.on("notify", (data) => {
  console.log("notify", data);
  // ask user to allow popups
  

  if (window.open(`${WEB_URL}/games/marblesgame?id=${data.tournamentId}`, '_blank')) {
    window.focus();
  }
  else {
    alert(`Windows blocked to open new tab. Link is: ${WEB_URL}/games/marblesgame?id=${data.tournamentId}`);
  }
  alert("Your tournament has been lived.");
});

// disconnect socket when user close the tab or browser or refresh the page
socket.on('disconnect', () => {
  console.log('Disconnected from server');
  SetSocket(null);
  setConnectionStatus();
});

// showing icon of connection status of socket
function setConnectionStatus() {
  const status = document.querySelector('#status');
  if (status) {
    if (GetSocket() != null) {
      status.innerHTML = '<i class="fa-solid fa-wifi"></i>';
    }
    else {
      status.innerHTML = '<i class="fa-solid fa-wifi-slash"></i>';
    }
  }
}

// rendering page based on url
function renderer() {
  let location = window.location.pathname;
  if (home.urls.includes(location)) {
    renderPage(home);
  }
  else if (login.urls.includes(location)) {
    renderPage(login);
  }
  else if (register.urls.includes(location)) {
    renderPage(register);
  }
  else if (playerDashboard.urls.includes(location)) {
    renderPage(playerDashboard);
  }
  else if (playerProfile.urls.includes(location)) {
    renderPage(playerProfile);
  }
  else if (playerSetting.urls.includes(location)) {
    renderPage(playerSetting);
  }
  else if (playerTournamentsAll.urls.includes(location)) {
    renderPage(playerTournamentsAll);
  }
  else if (playerTournamentsJoined.urls.includes(location)) {
    renderPage(playerTournamentsJoined);
  }
  else if (playerTournamentsLive.urls.includes(location)) {
    renderPage(playerTournamentsLive);
  }
  else if (playerTournamentsPlayed.urls.includes(location)) {
    renderPage(playerTournamentsPlayed);
  }
  else if (playerTournamentsView.urls.includes(location)) {
    renderPage(playerTournamentsView);
  }
  else if (adminDashboard.urls.includes(location)) {
    renderPage(adminDashboard);
  }
  else if (adminPlayers.urls.includes(location)) {
    renderPage(adminPlayers);
  }
  else if (adminProfile.urls.includes(location)) {
    renderPage(adminProfile);
  }
  else if (adminSetting.urls.includes(location)) {
    renderPage(adminSetting);
  }
  else if (adminTournamentsCreate.urls.includes(location)) {
    renderPage(adminTournamentsCreate);
  }
  else if (adminTournamentsUpcoming.urls.includes(location)) {
    renderPage(adminTournamentsUpcoming);
  }
  else if (adminTournamentsLive.urls.includes(location)) {
    renderPage(adminTournamentsLive);
  }
  else if (adminTournamentsFinished.urls.includes(location)) {
    renderPage(adminTournamentsFinished);
  }
  else if (adminTournamentsDeleted.urls.includes(location)) {
    renderPage(adminTournamentsDeleted);
  }
  else if (adminTournamentsView.urls.includes(location)) {
    renderPage(adminTournamentsView);
  }
  else if (adminTournamentsEdit.urls.includes(location)) {
    renderPage(adminTournamentsEdit);
  }
  else if (marbleGame.urls.includes(location)) {
    renderPage(marbleGame);
  }
  else {
    renderPage(error404);
  }
  setConnectionStatus();
}

// rendering page
function renderPage(page) {
  document.querySelector('#app').innerHTML = page.onRender();
  page.onLoad();
}

// call renderer function when url is changed
window.onpopstate = renderer;