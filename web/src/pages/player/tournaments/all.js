import React, { useState, useEffect } from 'react';
import Loading from '../../../components/Loading';

import { GetUser, PlayerGetAllTournaments, JoinTournament } from '../../../utils';

export default function All({ socketId, username, isAdmin, changeUrl }) {
    const [popupAllowed, setPopupAllowed] = useState('');
    const [isLoading01, setIsLoading01] = useState(true);
    const [isLoading02, setIsLoading02] = useState(true);
    const [upcomingTournaments, setUpcomingTournaments] = useState([]);
    const [liveTournaments, setLiveTournaments] = useState([]);

    async function joinTournament(tournamentId) {
        const result = await JoinTournament(socketId, tournamentId);
        if (result !== null) {
            if (result) {
                changeUrl(`/player/tournaments/joined`);
            }
        }
        else {
            changeUrl('/login');
        }
    }

    function dateToAgo(dateTime) {
        let date = new Date(dateTime);
        const currentDate = new Date();
        const year = currentDate.getFullYear() - date.getFullYear();
        const month = currentDate.getMonth() - date.getMonth();
        const day = currentDate.getDate() - date.getDate();
        if (year > 0) {
            return year + " Year Ago";
        }
        else if (month > 0) {
            return month + " Month Ago";
        }
        else if (day > 0) {
            return day + " Day Ago";
        }
        else {
            return "Today";
        }
    }

    function renderTournament(key, status, tournament) {
        return (
            <div key={key} className="bg-gray-900 my-2 rounded w-64 flex-shrink-0">
                <div className="relative flex flex-col p-4">
                    <p className="mb-2 text-xl font-bold text-gray-300">
                        {tournament.name}
                    </p>
                    <p className="mb-2 text-sm font-medium text-gray-400">
                        {tournament.description}
                    </p>
                    <p className="text-xs font-semibold text-gray-400">
                        <i className="fa-solid fa-users"></i> {tournament.playersArr.length}/{tournament.maxPlayers}
                    </p>
                    <p className="text-xs mt-1 font-semibold text-gray-400">
                        <i className={"fa-solid" + (status === 'upcoming' ? " fa-hourglass-start" : " fa-check")}></i> {new Date(tournament.startDateTime).toLocaleDateString()} {new Date(tournament.startDateTime).toLocaleTimeString()}
                    </p>
                    <p className="absolute right-2 top-0 text-sm mt-1 font-semibold text-red-400">
                        <i className="animate-pulse fa-solid fa-clock"></i> {dateToAgo(new Date(tournament.startDateTime))}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                        <button onClick={(e) => changeUrl('/player/tournaments/view?id=' + tournament.id)}
                            className="px-6 py-2 w-fit mt-4 text-sm font-medium leading-5 text-green-600 transition-colors duration-150 bg-transparent border border-transparent border-green-600 rounded-lg active:bg-green-600 hover:bg-green-700 hover:text-white focus:outline-none focus:shadow-outline-green">
                            View
                        </button>
                        {(status === 'upcoming') ? <button onClick={(e) => joinTournament(tournament.id)}
                            className="animate-pulse px-6 py-2 mt-4 text-sm font-medium leading-5 text-indigo-600 transition-colors duration-150 bg-transparent border border-transparent border-indigo-600 rounded-lg active:bg-indigo-600 hover:bg-indigo-700 hover:text-white focus:outline-none focus:shadow-outline-indigo">
                            Join
                        </button> : null}
                    </div>
                </div>
            </div >
        )
    }

    async function loadTournaments(status) {
        const result = await PlayerGetAllTournaments(socketId, status, 'getTournamentsForPlayer')
        if (result) {
            if (status === 'upcoming') {
                setUpcomingTournaments(result);
                setIsLoading01(false);
            }
            else if (status === 'live') {
                setLiveTournaments(result);
                setIsLoading02(false);
            }
        }
    }

    useEffect(() => {
        setIsLoading01(true);
        setIsLoading02(true);
        const asyncFunc = async () => {
            if (socketId) {
                const user = await GetUser(socketId);
                if (!user || user.isAdmin) {
                    changeUrl('/login');
                }
                else {
                    loadTournaments('upcoming');
                    loadTournaments('live');
                }
            }
        }
        let tempWindow = window.open('', 'tempWindow', 'toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,directories=no,status=no');
        if (!tempWindow || tempWindow.closed || typeof tempWindow.closed == 'undefined') {
            setPopupAllowed('No');
        }
        else {
            asyncFunc();
            tempWindow.close();
            setPopupAllowed('Yes');
        }
    }, [socketId]);

    return (
        <main className="h-full overflow-y-auto">
            <div className="container px-6 mx-auto grid">
                <h2 className="my-6 text-2xl font-semibold text-gray-200">
                    All Tournaments
                </h2>
                <div
                    className="flex items-center justify-between p-4 mb-8 text-sm font-semibold text-orange-600 bg-orange-100 rounded-lg shadow-md focus:outline-none focus:shadow-outline-orange">
                    <div className="flex items-center">
                        <span>You can browse any tournament</span>
                    </div>
                </div>
                {popupAllowed === 'Yes' ?
                    <div className="px-4 py-4 mb-8 rounded-lg overflow-auto shadow-md bg-gray-800">
                        <div className="w-full overflow-x-auto mb-4">
                            <h4 className="font-semibold text-gray-300">
                                <i className="animate-pulse fa-solid fa-circle text-green-600"></i> Upcoming Tournaments
                            </h4>
                            <div className="flex mx-4 items-center space-x-6 overflow-x-auto">
                                {!isLoading01 && upcomingTournaments.map((tournament, index) => {
                                    return renderTournament(index, 'upcoming', tournament);
                                })}
                                {!isLoading01 && upcomingTournaments.length === 0 && (
                                    <div className="text-center px-2 py-2 text-sm text-gray-400">
                                        No Data To Show
                                    </div>
                                )}
                                {isLoading01 && (
                                    <div className="text-center px-2 py-2 text-sm text-gray-400">
                                        <Loading />
                                    </div>
                                )}
                            </div>
                        </div>
                        <hr className='border-gray-900'></hr>
                        <div className="w-full mt-2 overflow-x-auto">
                            <h4 className="font-semibold text-gray-300">
                                <i className="animate-pulse fa-solid fa-circle text-red-600 duration-150 transition"></i> Live Tournaments
                            </h4>
                            <div className="flex mx-4 items-center space-x-6 overflow-x-auto">
                                {!isLoading02 && liveTournaments.map((tournament, index) => {
                                    return renderTournament(index, 'live', tournament);
                                })}
                                {!isLoading02 && liveTournaments.length === 0 && (
                                    <div className="text-center px-2 py-2 text-sm text-gray-400">
                                        No Data To Show
                                    </div>
                                )}
                                {isLoading02 && (
                                    <div className="text-center px-2 py-2 text-sm text-gray-400">
                                        <Loading />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    :
                    popupAllowed === 'No' ?
                        <div className="px-4 py-4 mb-8 rounded-lg overflow-auto shadow-md bg-gray-800">
                            <div className="w-full overflow-x-auto mb-4">
                                <h4 className="font-semibold text-gray-300">
                                    Popup is blocked!
                                </h4>
                            </div>
                            <div className="text-sm mb-2 text-gray-400">
                                You have need to do these steps first to see the tournaments.
                            </div>
                            <div className='flex gap-2'>
                                <img className='rounded shadow-md h-64' src="/images/step01.png" alt="Open Window Blocked" />
                                <img className='rounded shadow-md h-64' src="/images/step02.png" alt="Open Window Blocked" />
                            </div>
                        </div>
                        :
                        <Loading />
                }
            </div>
        </main >
    );
}