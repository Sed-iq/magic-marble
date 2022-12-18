import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useFetcher } from "react-router-dom";

import { API_URL, WEB_URL } from './utils';

import io from 'socket.io-client';

import './index.css';

import Home from './pages/index';
import Login from './pages/login';
import SignUp from './pages/signup';
import Error from './pages/error';

import Admin from './pages/admin/admin';
import Player from './pages/player/player';
import MagicMarble from './pages/games/magicmarble';


// connecting to socket server (API)
let socket = io(API_URL, {
  transports: ['websocket']
});

function App() {
  const [socketId, setSocketId] = useState(null);

  useEffect(() => {
    // call when user connect to socket
    socket.on('connect', () => {
      console.log('Connected to server');
      setSocketId(socket.id);
    });

    // notify when tournaemnt is started for opening tab
    socket.on("notify", (data) => {
      if (window.open(`${WEB_URL}/games/magicmarble?id=${data.tournamentId}`, '_blank')) {
        window.focus();
      }
      else {
        alert(`Windows blocked to open new tab. Link is: ${WEB_URL}/games/magicmarble?id=${data.tournamentId}`);
        localStorage.setItem("allowPopup", false);
      }
    });

    // disconnect socket when user close the tab or browser or refresh the page
    socket.on('disconnect', () => {
      setSocketId(null);
      console.log('Disconnected from server');
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home socketId={socketId} />} />
        <Route path="/login" element={<Login socketId={socketId} />} />
        <Route path="/signup" element={<SignUp socketId={socketId} />} />
        <Route path="/admin/*" element={<Admin socketId={socketId} />} />
        <Route path="/player/*" element={<Player socketId={socketId} />} />
        <Route path="/games/magicmarble" element={<MagicMarble socketId={socketId} socket={socket} />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter >
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);