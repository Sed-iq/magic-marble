import React, { useState, useEffect } from 'react';

import { GetUser } from '../../utils';

export default function Dashboard(props) {
    const [playedTournaments, setPlayedTournaments] = useState(0);
    const [wonTournaments, setWonTournaments] = useState(0);
    const [joinedTournaments, setJoinedTournaments] = useState(0);
    const [liveTournaments, setLiveTournaments] = useState(0);

    async function loadData(userId) {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/getPlayerDashboardData/?userId=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (!data.error) {
            setPlayedTournaments(data.playedTournaments);
            setWonTournaments(data.wonTournaments);
            setJoinedTournaments(data.joinedTournaments);
            setLiveTournaments(data.liveTournaments);
        }
    }

    useEffect(() => {
        const asyncFunc = async () => {
            const user = await GetUser(props.socket);
            if (!user || user.isAdmin) {
                props.changeUrl('/login');
            }
            else {
                loadData(user.id);
            }
        }
        asyncFunc();
    }, []);

    return (
        <main className="h-full overflow-y-auto">
            <div className="px-6 mx-auto grid">
                <h2 className="my-6 text-2xl font-semibold text-gray-200">
                    Dashboard
                </h2>
                <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                    <div className="flex items-center p-4 rounded-lg shadow-xs bg-gray-800">
                        <div className="p-3 mr-4 rounded-full text-orange-100 bg-orange-500">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z">
                                </path>
                            </svg>
                        </div>
                        <div>
                            <p className="mb-2 text-sm font-medium text-gray-400">
                                Played Tournaments
                            </p>
                            <p className="text-lg font-semibold text-gray-200">
                                {playedTournaments}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center p-4 rounded-lg shadow-xs bg-gray-800">
                        <div className="p-3 mr-4 rounded-full text-green-100 bg-green-500">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd"
                                    d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 00-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 00.75-.75 2.25 2.25 0 00-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 01-1.112-3.173 6.73 6.73 0 002.743-1.347 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.22 49.22 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 013.16 5.337a45.6 45.6 0 012.006-.343v.256zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 01-2.863 3.207 6.72 6.72 0 00.857-3.294z"
                                    clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <p className="mb-2 text-sm font-medium text-gray-400">
                                Won Tournaments
                            </p>
                            <p className="text-lg font-semibold text-gray-200">
                                {wonTournaments}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center p-4 rounded-lg shadow-xs bg-gray-800">
                        <div className="p-3 mr-4 rounded-full text-blue-100 bg-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path
                                    d="M21.721 12.752a9.711 9.711 0 00-.945-5.003 12.754 12.754 0 01-4.339 2.708 18.991 18.991 0 01-.214 4.772 17.165 17.165 0 005.498-2.477zM14.634 15.55a17.324 17.324 0 00.332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 00.332 4.647 17.385 17.385 0 005.268 0zM9.772 17.119a18.963 18.963 0 004.456 0A17.182 17.182 0 0112 21.724a17.18 17.18 0 01-2.228-4.605zM7.777 15.23a18.87 18.87 0 01-.214-4.774 12.753 12.753 0 01-4.34-2.708 9.711 9.711 0 00-.944 5.004 17.165 17.165 0 005.498 2.477zM21.356 14.752a9.765 9.765 0 01-7.478 6.817 18.64 18.64 0 001.988-4.718 18.627 18.627 0 005.49-2.098zM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 001.988 4.718 9.765 9.765 0 01-7.478-6.816zM13.878 2.43a9.755 9.755 0 016.116 3.986 11.267 11.267 0 01-3.746 2.504 18.63 18.63 0 00-2.37-6.49zM12 2.276a17.152 17.152 0 012.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0112 2.276zM10.122 2.43a18.629 18.629 0 00-2.37 6.49 11.266 11.266 0 01-3.746-2.504 9.754 9.754 0 016.116-3.985z" />
                            </svg>
                        </div>
                        <div>
                            <p className="mb-2 text-sm font-medium text-gray-400">
                                Joined Tournaments
                            </p>
                            <p className="text-lg font-semibold text-gray-200">
                                {joinedTournaments}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center p-4 rounded-lg shadow-xs bg-gray-800">
                        <div className="p-3 mr-4 rounded-full text-blue-100 bg-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                <path fillRule="evenodd"
                                    d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                                    clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <p className="mb-2 text-sm font-medium text-gray-400">
                                Your Live Tournaments
                            </p>
                            <p className="text-lg font-semibold text-gray-200">
                                {liveTournaments}
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