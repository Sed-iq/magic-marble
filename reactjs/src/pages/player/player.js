import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Navbar from '../../components/navbar';
import Sidebar from '../../components/player/sidebar';

import Dashboard from './dashboard';
import Profile from '../../components/profile';
import Setting from '../../components/setting';
import All from './tournaments/all';
import Joined from './tournaments/joined';
import Live from './tournaments/live';
import Played from './tournaments/played';
import View from '../../components/tournaments/view';


import { GetUser } from '../../utils';

export default function Player(props) {
    const [sideBarOpen, setSideBarOpen] = useState(true);
    const [openendPage, setOpenedPage] = useState('Dashboard');
    const [username, setUsername] = useState('Admin');

    const navigate = useNavigate();

    function changeUrl(url) {
        navigate(url);
        checkPage();
    }

    function toggleSideBar() {
        setSideBarOpen(!sideBarOpen);
    }

    function checkPage() {
        if (window.location.pathname === '/player/dashboard') {
            setOpenedPage('Dashboard');
        } else if (window.location.pathname === '/player/profile') {
            setOpenedPage('Profile');
        } else if (window.location.pathname === '/player/setting') {
            setOpenedPage('Setting');
        } else if (window.location.pathname === '/player/tournaments/all') {
            setOpenedPage('Tournaments');
        } else if (window.location.pathname === '/player/tournaments/joined') {
            setOpenedPage('Tournaments');
        } else if (window.location.pathname === '/player/tournaments/live') {
            setOpenedPage('Tournaments');
        } else if (window.location.pathname === '/player/tournaments/played') {
            setOpenedPage('Tournaments');
        } else if (window.location.pathname === '/player/tournaments/view') {
            setOpenedPage('Tournaments');
        }
    }

    useEffect(() => {
        const asyncFunc = async () => {
            const user = await GetUser(props.socket);
            if (!user) {
                changeUrl('/login');
            }
            else {
                checkPage();
                setUsername(user.username);
            }
        }
        asyncFunc();
    }, []);


    return (
        <div className="flex h-screen bg-gray-900">
            <Sidebar socket={props.socket} username={username} isAdmin={false} sideBarOpen={sideBarOpen} openendPage={openendPage} changeUrl={changeUrl} />
            <div className="flex flex-col flex-1 w-full">
                <Navbar socket={props.socket} username={username} isAdmin={false} sideBarOpen={sideBarOpen} toggleSideBar={toggleSideBar} changeUrl={changeUrl} />
                <Routes>
                    <Route path="/dashboard" element={<Dashboard socket={props.socket} username={username} isAdmin={false} changeUrl={changeUrl} />} />
                    <Route path="/profile" element={<Profile socket={props.socket} username={username} isAdmin={false} changeUrl={changeUrl} />} />
                    <Route path="/setting" element={<Setting socket={props.socket} username={username} isAdmin={false} setUsername={setUsername} changeUrl={changeUrl} />} />
                    <Route path="/tournaments/all" element={<All socket={props.socket} username={username} isAdmin={false} changeUrl={changeUrl} />} />
                    <Route path="/tournaments/joined" element={<Joined socket={props.socket} username={username} isAdmin={false} changeUrl={changeUrl} />} />
                    <Route path="/tournaments/live" element={<Live socket={props.socket} username={username} isAdmin={false} changeUrl={changeUrl} />} />
                    <Route path="/tournaments/played" element={<Played socket={props.socket} username={username} isAdmin={false} changeUrl={changeUrl} />} />
                    <Route path="/tournaments/view" element={<View socket={props.socket} username={username} isAdmin={false} changeUrl={changeUrl} />} />
                    <Route path="*" element={<Navigate to={'/player/dashboard'} />} />
                </Routes>
            </div>
        </div>
    );
}