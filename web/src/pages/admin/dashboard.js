import React, { useState, useEffect } from 'react';

import { GetUser, GetAdminDashboardData } from '../../utils';

export default function Dashboard({ socketId, username, isAdmin, changeUrl }) {
    const [totalPlayers, setTotalPlayers] = useState(0);
    const [upcomingTournaments, setUpcomingTournaments] = useState(0);
    const [liveTournaments, setLiveTournaments] = useState(0);
    const [completedTournaments, setCompletedTournaments] = useState(0);


    async function loadData() {
        const result = await GetAdminDashboardData(socketId);
        if (result !== null) {
            if (result) {
                setTotalPlayers(result.totalPlayers);
                setUpcomingTournaments(result.upcomingTournaments);
                setLiveTournaments(result.liveTournaments);
                setCompletedTournaments(result.completedTournaments);
            }
        }
        else {
            changeUrl('/login')
        }
    }

    useEffect(() => {
        const asyncFunc = async () => {
            if (socketId) {
                const user = await GetUser(socketId);
                if (!user || !user.isAdmin) {
                    changeUrl('/login');
                }
                else {
                    loadData();
                }
            }
        }
        asyncFunc();
    }, [socketId]);

    return (
        <main className="h-full overflow-y-auto">
            <div className="container px-6 mx-auto grid">
                <h2 className="my-6 text-2xl font-semibold text-gray-200">
                    Dashboard
                </h2>
                <a className="cusor-pointer flex items-center justify-between p-4 mb-8 text-sm font-semibold text-purple-100 bg-purple-600 rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple"
                    onClick={(e) => changeUrl('/admin/tournaments/live')}>
                    <div className="flex items-center">
                        <i className="fa-solid fa-globe mr-3"></i>
                        <span>Some Tournaments are Live Now</span>
                    </div>
                    <span className='cursor-pointer' onClick={(e) => changeUrl('/admin/tournaments/live')}>
                        See more
                        <i className="fas fa-arrow-right ml-2 align-middle"></i>
                    </span>
                </a>
                <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                    <div className="flex items-center p-4 rounded-lg shadow-xs bg-gray-800">
                        <div className="animate-bounce p-3 mr-4 rounded-full text-orange-100 bg-orange-500">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z">
                                </path>
                            </svg>
                        </div>
                        <div>
                            <p className="mb-2 text-sm font-medium text-gray-400">
                                Total Players
                            </p>
                            <p className="text-lg font-semibold text-gray-200">
                                {totalPlayers}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center p-4 rounded-lg shadow-xs bg-gray-800">
                        <div className="animate-spin p-3 mr-4 rounded-full text-green-100 bg-green-500">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                    clipRule="evenodd"></path>
                            </svg>
                        </div>
                        <div>
                            <p className="mb-2 text-sm font-medium text-gray-400">
                                Upcoming Tournaments
                            </p>
                            <p className="text-lg font-semibold text-gray-200">
                                {upcomingTournaments}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center p-4 rounded-lg shadow-xs bg-gray-800">
                        <div className="animate-pulse p-3 mr-4 rounded-full text-blue-100 bg-blue-500">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                    d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                                    clipRule="evenodd"></path>
                            </svg>
                        </div>
                        <div>
                            <p className="mb-2 text-sm font-medium text-gray-400">
                                Live Tournaments
                            </p>
                            <p className="text-lg font-semibold text-gray-200">
                                {liveTournaments}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center p-4 rounded-lg shadow-xs bg-gray-800">
                        <div className="p-3 mr-4 rounded-full text-teal-100 bg-teal-500">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                    d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clipRule="evenodd"></path>
                            </svg>
                        </div>
                        <div>
                            <p className="mb-2 text-sm font-medium text-gray-400">
                                Completed Tournaments
                            </p>
                            <p className="text-lg font-semibold text-gray-200">
                                {completedTournaments}
                            </p>
                        </div>
                    </div>
                </div>

                <h4 className="mb-4 text-lg font-semibold text-gray-300">
                    How it works?
                </h4>
                <div className="grid gap-6 mb-8 md:grid-cols-2">
                    <div className="min-w-0 p-4 rounded-lg shadow-xs bg-gray-800">
                        <h4 className="font-semibold text-gray-300">
                            Tournaments
                        </h4>
                        <p className="text-gray-400">
                            You have need to open Tournaments tab from there you can create a new Tournament. Then
                            players can join to your tournament. When maximum players are reached then tournament will start
                            automatically on time that you mentioned.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}