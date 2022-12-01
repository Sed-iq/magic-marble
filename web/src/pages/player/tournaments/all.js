import React, { useState, useEffect } from 'react';

import { GetUser, PlayerGetAllTournaments, JoinTournament } from '../../../utils';

export default function All({socket, username, isAdmin, changeUrl}) {
    const [upcomingTournaments, setUpcomingTournaments] = useState([]);
    const [liveTournaments, setLiveTournaments] = useState([]);

    async function joinTournament(tournamentId) {
        const result = await JoinTournament(socket, tournamentId);
        if (result !== null) {
            if (result) {
                loadTournaments('upcoming');
                loadTournaments('live');
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
            <div key={key} className="bg-gray-100 dark:bg-gray-900 my-2 rounded w-64 flex-shrink-0">
                <div className="relative flex flex-col p-4">
                    <p className="mb-2 text-xl font-medium text-gray-700 dark:text-gray-500">
                        {tournament.name}
                    </p>
                    <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                        {tournament.description}
                    </p>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                        <i className="fa-solid fa-users"></i> {tournament.playersArr.length}/{tournament.maxPlayers}
                    </p>
                    <p className="text-xs mt-1 font-semibold text-gray-500 dark:text-gray-400">
                        <i className={"fa-solid" + (status === 'upcmoing' ? " fa-hourglass-start" : "fa-check")}></i> {new Date(tournament.startDateTime).toLocaleDateString()} {new Date(tournament.startDateTime).toLocaleTimeString()}
                    </p>
                    <p className="text-xs mt-1 font-semibold text-red-500 dark:text-red-400">
                        {dateToAgo(new Date(tournament.startDateTime))}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                        <button onClick={(e) => changeUrl('/player/tournaments/view?id=' + tournament.id)}
                            className="px-6 py-2 w-fit mt-4 text-sm font-medium leading-5 text-green-500 dark:text-green-600 transition-colors duration-150 bg-green-100 dark:bg-transparent border border-transparent dark:border-green-600 rounded-lg active:bg-green-600 hover:bg-green-700 hover:text-white dark:hover:bg-green-700 dark:hover:text-white focus:outline-none focus:shadow-outline-green">
                            View
                        </button>
                        {(status === 'upcoming') ? <button onClick={(e) => joinTournament(tournament.id)}
                            className="px-6 py-2 mt-4 text-sm font-medium leading-5 text-indigo-500 dark:text-indigo-600 transition-colors duration-150 bg-indigo-100 dark:bg-transparent border border-transparent dark:border-indigo-600 rounded-lg active:bg-indigo-600 hover:bg-indigo-700 hover:text-white dark:hover:bg-indigo-700 dark:hover:text-white focus:outline-none focus:shadow-outline-indigo">
                            Join
                        </button> : null}
                    </div>
                </div>
            </div >
        )
    }

    async function loadTournaments(status) {
        const result = await PlayerGetAllTournaments(socket, status, 'getTournamentsForPlayer')
        if (result) {
            if (status === 'upcoming') {
                setUpcomingTournaments(result);
            }
            else if (status === 'live') {
                setLiveTournaments(result);
            }
        }
    }

    useEffect(() => {
        const asyncFunc = async () => {
            const user = await GetUser(socket);
            if (!user || user.isAdmin) {
                changeUrl('/login');
            }
            else {
                loadTournaments('upcoming');
                loadTournaments('live');
            }
        }
        asyncFunc();
    },[socket]);

    return (
        <main className="h-full overflow-y-auto">
            <div className="container px-6 mx-auto grid">
                <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                    All Tournaments
                </h2>
                <div
                    className="flex items-center justify-between p-4 mb-8 text-sm font-semibold text-orange-600 bg-orange-100 rounded-lg shadow-md focus:outline-none focus:shadow-outline-orange">
                    <div className="flex items-center">
                        <span>You can browse any tournament</span>
                    </div>
                </div>
                <div className="px-4 py-4 bg-white rounded-lg overflow-auto shadow-md dark:bg-gray-800">
                    <div className="w-full overflow-x-auto mb-4">
                        <h4 className="font-semibold text-gray-600 dark:text-gray-300">
                            <i className="fa-solid fa-circle text-green-600"></i> Upcoming Tournaments
                        </h4>
                        <div className="flex mx-3 items-center space-x-6 overflow-x-auto">
                            {upcomingTournaments.map((tournament, index) => {
                                return renderTournament(index, 'upcoming', tournament);
                            })}
                            {upcomingTournaments.length === 0 && (
                                <p className="text-center px-2 py-2 text-sm text-gray-400">
                                    No Data To Show
                                </p>
                            )}
                        </div>
                    </div>
                    <hr className='border-gray-900'></hr>
                    <div className="w-full mt-2 overflow-x-auto">
                        <h4 className="font-semibold text-gray-600 dark:text-gray-300">
                            <i className="fa-solid fa-circle text-red-600"></i> Live Tournaments
                        </h4>
                        <div className="flex mx-4 items-center space-x-6 overflow-x-auto">
                            {liveTournaments.map((tournament, index) => {
                                return renderTournament(index, 'live', tournament);
                            })}
                            {liveTournaments.length === 0 && (
                                <p className="text-center px-2 py-2 text-sm text-gray-400">
                                    No Data To Show
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}