import React, { useState, useEffect } from 'react';

import { GetUser, GetPlayerDashboardData } from '../../utils';

export default function Dashboard({ socketId, username, isAdmin, changeUrl }) {
    const [myTournaments, setMyTournaments] = useState(0);
    const [upcomingTournaments, setUpcomingTournaments] = useState(0);
    const [createdTournaments, setCreatedTournaments] = useState(0);
    const [wallet, setWallet] = useState(0);

    async function loadData() {
        const result = await GetPlayerDashboardData(socketId);
        if (result !== null) {
            if (result) {
                setMyTournaments(result.myTournaments);
                setUpcomingTournaments(result.upcomingTournaments);
                setCreatedTournaments(result.createdTournaments);
                setWallet(result.wallet);
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
                if (!user || user.isAdmin) {
                    console.log('not logged in');
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
            <div className="px-6 mx-auto grid">
                <h2 className="my-6 text-2xl font-semibold text-gray-200">
                    Dashboard
                </h2>
                <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                    <div className="flex items-center p-4 rounded-lg shadow-xs bg-gray-800">
                        <div className="cursor-pointer p-3 mr-4 rounded-full text-orange-100 bg-orange-500" onClick={(e) => changeUrl('/player/tournaments/my')}>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z">
                                </path>
                            </svg>
                        </div>
                        <div>
                            <p className="mb-2 text-sm font-medium text-gray-400">
                                My Tournaments
                            </p>
                            <p className="text-lg font-semibold text-gray-200 transition-all">
                                {myTournaments}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center p-4 rounded-lg shadow-xs bg-gray-800" onClick={(e) => changeUrl('/player/tournaments/upcoming')}>
                        <div className="cursor-pointer p-3 mr-4 rounded-full text-green-100 bg-green-500">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd"
                                    d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 00-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 00.75-.75 2.25 2.25 0 00-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 01-1.112-3.173 6.73 6.73 0 002.743-1.347 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.22 49.22 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 013.16 5.337a45.6 45.6 0 012.006-.343v.256zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 01-2.863 3.207 6.72 6.72 0 00.857-3.294z"
                                    clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <p className="mb-2 text-sm font-medium text-gray-400">
                                Upcoming Tournaments
                            </p>
                            <p className="text-lg font-semibold text-gray-200 transition-all">
                                {upcomingTournaments}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center p-4 rounded-lg shadow-xs bg-gray-800"  onClick={(e)=>changeUrl('/player/tournaments/create')}>
                        <div className="cursor-pointer p-3 mr-4 rounded-full text-blue-100 bg-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path
                                    d="M21.721 12.752a9.711 9.711 0 00-.945-5.003 12.754 12.754 0 01-4.339 2.708 18.991 18.991 0 01-.214 4.772 17.165 17.165 0 005.498-2.477zM14.634 15.55a17.324 17.324 0 00.332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 00.332 4.647 17.385 17.385 0 005.268 0zM9.772 17.119a18.963 18.963 0 004.456 0A17.182 17.182 0 0112 21.724a17.18 17.18 0 01-2.228-4.605zM7.777 15.23a18.87 18.87 0 01-.214-4.774 12.753 12.753 0 01-4.34-2.708 9.711 9.711 0 00-.944 5.004 17.165 17.165 0 005.498 2.477zM21.356 14.752a9.765 9.765 0 01-7.478 6.817 18.64 18.64 0 001.988-4.718 18.627 18.627 0 005.49-2.098zM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 001.988 4.718 9.765 9.765 0 01-7.478-6.816zM13.878 2.43a9.755 9.755 0 016.116 3.986 11.267 11.267 0 01-3.746 2.504 18.63 18.63 0 00-2.37-6.49zM12 2.276a17.152 17.152 0 012.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0112 2.276zM10.122 2.43a18.629 18.629 0 00-2.37 6.49 11.266 11.266 0 01-3.746-2.504 9.754 9.754 0 016.116-3.985z" />
                            </svg>
                        </div>
                        <div>
                            <p className="mb-2 text-sm font-medium text-gray-400">
                                Create new Tournaments
                            </p>
                            <p className="text-lg font-semibold text-gray-200 transition-all">
                                {createdTournaments}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center p-4 rounded-lg shadow-xs bg-gray-800"  onClick={(e)=>changeUrl('/player/wallet')}>
                        <div className="cursor-pointer p-3 mr-4 rounded-full text-blue-100 bg-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path d="M0 8v-3c0-1.105.895-2 2-2h20c1.104 0 2 .895 2 2v3h-24zm24 3v8c0 1.104-.896 2-2 2h-20c-1.105 0-2-.896-2-2v-8h24zm-15 6h-6v1h6v-1zm3-2h-9v1h9v-1zm9 0h-3v1h3v-1z" />
                            </svg>
                        </div>
                        <div>
                            <p className="mb-2 text-sm font-medium text-gray-400">
                                My Wallet
                            </p>
                            <p className="text-lg font-semibold text-gray-200 transition-all">
                                {wallet}
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
                            Tournaments are a great way to play with friends and compete with other players.
                            For now you can only join tournaments that are created by admin.
                            We are working on a feature to create your own tournaments.
                            Join a tournament and play with your friends.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}