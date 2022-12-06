import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Navbar from '../../components/navbar';
import Sidebar from '../../components/admin/sidebar';

import Dashboard from './dashboard';
import Wallet from './wallet';
import Players from './players';
import Profile from './profile';
import Setting from './setting';
import Create from './tournaments/create';
import Deleted from './tournaments/deleted';
import Edit from './tournaments/edit';
import Live from './tournaments/live';
import Completed from './tournaments/completed';
import Upcoming from './tournaments/upcoming';
import View from './tournaments/view';

import { GetUser } from '../../utils';

export default function Player({ socketId }) {
    const [sideBarOpen, setSideBarOpen] = useState(localStorage.getItem('sideBarOpen') === 'true' || false);
    const [openendPage, setOpenedPage] = useState('Dashboard');
    const [username, setUsername] = useState('Player');

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
        if (window.location.pathname === '/admin/dashboard') {
            setOpenedPage('Dashboard');
        }
        else if (window.location.pathname === '/admin/wallet') {
            setOpenedPage('Wallet');
        }
        else if (window.location.pathname === '/admin/players') {
            setOpenedPage('Players');
        }
        else if (window.location.pathname === '/admin/profile') {
            setOpenedPage('Profile');
        }
        else if (window.location.pathname === '/admin/setting') {
            setOpenedPage('Setting');
        }
        else if (window.location.pathname === '/admin/tournaments/create') {
            setOpenedPage('Tournaments');
        }
        else if (window.location.pathname === '/admin/tournaments/deleted') {
            setOpenedPage('Tournaments');
        }
        else if (window.location.pathname === '/admin/tournaments/edit') {
            setOpenedPage('Tournaments');
        }
        else if (window.location.pathname === '/admin/tournaments/completed') {
            setOpenedPage('Tournaments');
        }
        else if (window.location.pathname === '/admin/tournaments/live') {
            setOpenedPage('Tournaments');
        }
        else if (window.location.pathname === '/admin/tournaments/upcoming') {
            setOpenedPage('Tournaments');
        }
        else if (window.location.pathname === '/admin/tournaments/view') {
            setOpenedPage('Tournaments');
        }
    }

    useEffect(() => {
        const asyncFunc = async () => {
            if (socketId) {
                const user = await GetUser(socketId);
                if (!user) {
                    changeUrl('/login');
                }
                else {
                    checkPage();
                    setUsername(user.username);
                }
            }
        }
        asyncFunc();
    }, [socketId]);


    return (
        <div className="flex h-screen bg-gray-900">
            <Sidebar socketId={socketId} username={username} isAdmin={true} sideBarOpen={sideBarOpen} openendPage={openendPage} changeUrl={changeUrl} />
            <div className="flex flex-col flex-1 w-full">
                <Navbar socketId={socketId} username={username} isAdmin={true} sideBarOpen={sideBarOpen} toggleSideBar={toggleSideBar} changeUrl={changeUrl} />
                <Routes>
                    <Route path="/dashboard" element={<Dashboard socketId={socketId} username={username} isAdmin={true} changeUrl={changeUrl} />} />
                    <Route path="/wallet" element={<Wallet socketId={socketId} username={username} isAdmin={true} changeUrl={changeUrl} />} />
                    <Route path="/players" element={<Players socketId={socketId} username={username} isAdmin={true} changeUrl={changeUrl} />} />
                    <Route path="/profile" element={<Profile socketId={socketId} username={username} isAdmin={true} changeUrl={changeUrl} />} />
                    <Route path="/setting" element={<Setting socketId={socketId} username={username} isAdmin={true} setUsername={setUsername} changeUrl={changeUrl} />} />
                    <Route path="/tournaments/create" element={<Create socketId={socketId} username={username} isAdmin={true} changeUrl={changeUrl} />} />
                    <Route path="/tournaments/deleted" element={<Deleted socketId={socketId} username={username} isAdmin={true} changeUrl={changeUrl} />} />
                    <Route path="/tournaments/edit" element={<Edit socketId={socketId} username={username} isAdmin={true} changeUrl={changeUrl} />} />
                    <Route path="/tournaments/completed" element={<Completed socketId={socketId} username={username} isAdmin={true} changeUrl={changeUrl} />} />
                    <Route path="/tournaments/live" element={<Live socketId={socketId} username={username} isAdmin={true} changeUrl={changeUrl} />} />
                    <Route path="/tournaments/upcoming" element={<Upcoming socketId={socketId} username={username} isAdmin={true} changeUrl={changeUrl} />} />
                    <Route path="/tournaments/view" element={<View socketId={socketId} username={username} isAdmin={true} changeUrl={changeUrl} />} />
                    <Route path="*" element={<Navigate to={'/admin/dashboard'} />} />
                </Routes>
            </div>
        </div>
    );
}