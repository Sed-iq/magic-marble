import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Navbar from '../../components/navbar';
import Sidebar from '../../components/player/sidebar';

import Dashboard from './dashboard';
import Wallet from './wallet';
import Profile from './profile';
import Rules from './rules';
import Setting from './setting';
import All from './tournaments/all';
import Create from './tournaments/create';
import Upcoming from './tournaments/upcoming';
import My from './tournaments/my';
import History from './tournaments/history';
import View from './tournaments/view';


import { GetUser } from '../../utils';

export default function Player({ socketId }) {
    const [sideBarOpen, setSideBarOpen] = useState(localStorage.getItem('sideBarOpen') === 'true' || false);
    const [openendPage, setOpenedPage] = useState('');
    const [username, setUsername] = useState('');

    const navigate = useNavigate();

    function changeUrl(url) {
        navigate(url);
        checkPage();
    }

    function toggleSideBar() {
        localStorage.setItem('sideBarOpen', !sideBarOpen);
        setSideBarOpen(!sideBarOpen);
    }

    function checkPage() {
        console.log(window.location.pathname);
        if (window.location.pathname === '/player/dashboard') {
            setOpenedPage('Dashboard');
        } else if (window.location.pathname === '/player/wallet') {
            setOpenedPage('Wallet');
        } else if (window.location.pathname === '/player/rules') {
            setOpenedPage('Rules');
        } else if (window.location.pathname === '/player/profile') {
            setOpenedPage('Profile');
        }
        else if (window.location.pathname === '/player/setting') {
            setOpenedPage('Setting');
        } else if (window.location.pathname === '/player/tournaments/all') {
            setOpenedPage('Tournaments');
        } else if (window.location.pathname === '/player/tournaments/joined') {
            setOpenedPage('Tournaments');
        } else if (window.location.pathname === '/player/tournaments/live') {
            setOpenedPage('Tournaments');
        } else if (window.location.pathname === '/player/tournaments/history') {
            setOpenedPage('Tournaments');
        } else if (window.location.pathname === '/player/tournaments/view') {
            setOpenedPage('Tournaments');
        }
    }

    useEffect(() => {
        console.log(socketId);
        const asyncFunc = async () => {
            if (socketId) {
                const user = await GetUser(socketId);
                if (!user) {
                    changeUrl('/login');
                }
                else {
                    setUsername(user.username);
                    checkPage();
                }
            }
        }
        asyncFunc();
    }, [socketId]);


    return (
        <div className="flex h-screen bg-gray-900">
            <Sidebar socketId={socketId} username={username} isAdmin={false} sideBarOpen={sideBarOpen} openendPage={openendPage} changeUrl={changeUrl} />
            <div className="flex flex-col flex-1 w-full">
                <Navbar socketId={socketId} username={username} isAdmin={false} sideBarOpen={sideBarOpen} toggleSideBar={toggleSideBar} changeUrl={changeUrl} />
                <Routes>
                    <Route path="/dashboard" element={<Dashboard socketId={socketId} username={username} isAdmin={false} changeUrl={changeUrl} />} />
                    <Route path="/wallet" element={<Wallet socketId={socketId} username={username} isAdmin={false} changeUrl={changeUrl} />} />
                    <Route path="/rules" element={<Rules socketId={socketId} username={username} isAdmin={false} setUsername={setUsername} changeUrl={changeUrl} />} />
                    <Route path="/profile" element={<Profile socketId={socketId} username={username} isAdmin={false} changeUrl={changeUrl} />} />
                    <Route path="/setting" element={<Setting socketId={socketId} username={username} isAdmin={false} setUsername={setUsername} changeUrl={changeUrl} />} />
                    <Route path="/tournaments/all" element={<All socketId={socketId} username={username} isAdmin={false} changeUrl={changeUrl} />} />
                    <Route path="/tournaments/create" element={<Create socketId={socketId} username={username} isAdmin={false} changeUrl={changeUrl} />} />
                    <Route path="/tournaments/upcoming" element={<Upcoming socketId={socketId} username={username} isAdmin={false} changeUrl={changeUrl} />} />
                    <Route path="/tournaments/my" element={<My socketId={socketId} username={username} isAdmin={false} changeUrl={changeUrl} />} />
                    <Route path="/tournaments/history" element={<History socketId={socketId} username={username} isAdmin={false} changeUrl={changeUrl} />} />
                    <Route path="/tournaments/view" element={<View socketId={socketId} username={username} isAdmin={false} changeUrl={changeUrl} />} />
                    <Route path="*" element={<Navigate to={'/player/dashboard'} />} />
                </Routes>
            </div>
        </div>
    );
}