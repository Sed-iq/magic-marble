import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import io from 'socket.io-client';

import './index.css';


import Home from './pages/index';
import Login from './pages/login';
import Register from './pages/register';
import Error from './pages/error';

import Admin from './pages/admin/admin';
import Player from './pages/player/player';
import MagicMarble from './pages/games/magicmarble';

const WEB_URL = 'https://magicmarble-web-k3cap.ondigitalocean.app';

// connecting to socket server (API)
let socket = io(process.env.REACT_APP_API_URL, {
  transports: ['websocket']
});

// call when user connect to socket
socket.on('connect', () => {
  console.log('Connected to server');
});

// notify when tournaemnt is started for opening tab
socket.on("notify", (data) => {
  if (window.open(`${WEB_URL}/games/magicmarble?id=${data.tournamentId}`, '_blank')) {
    window.focus();
  }
  else {
    alert(`Windows blocked to open new tab. Link is: ${WEB_URL}/games/magicmarble?id=${data.tournamentId}`);
  }
  alert("Your tournament has been lived.");
  window.location.reload();
});

// disconnect socket when user close the tab or browser or refresh the page
socket.on('disconnect', () => {
  socket = null;
  console.log('Disconnected from server');
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home socket={socket} />} />
        <Route path="/login" element={<Login socket={socket} />} />
        <Route path="/register" element={<Register socket={socket} />} />
        <Route path="/admin/*" element={<Admin socket={socket} />} />
        <Route path="/player/*" element={<Player socket={socket} />} />
        <Route path="/games/magicmarble" element={<MagicMarble socket={socket} />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
