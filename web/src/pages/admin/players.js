import React, { useState, useEffect } from 'react';

import { GetUser } from '../../utils';

export default function Players({socket, username, isAdmin, changeUrl}) {
    const [players, setPlayers] = useState([]);

    async function loadPlayers(userId) {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/getAllPlayers/?userId=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        if (!data.error) {
            setPlayers(data.players);
        }
    }

    useEffect(() => {
        const asyncFunc = async () => {
            const user = await GetUser(socket);
            if (!user || !user.isAdmin) {
                changeUrl('/login');
            }
            else {
                loadPlayers(user.id);
            }
        }
        asyncFunc();
    },[socket]);

    return (
        <main className="h-full overflow-y-auto">
            <div className="container px-6 mx-auto grid">
                <h2 className="my-6 text-2xl font-semibold text-gray-200">
                    Players
                </h2>
                <div
                    className="flex items-center justify-between p-4 mb-8 text-sm font-semibold text-indigo-600 bg-indigo-100 rounded-lg shadow-md focus:outline-none focus:shadow-outline-green">
                    <div className="flex items-center">
                        <span>Inactive player means that he has deleted his account.</span>
                    </div>
                </div>
                <div className="px-4 py-4 mb-8 bg-white rounded-lg overflow-auto shadow-md dark:bg-gray-800">
                    <div className="w-full overflow-x-auto">
                        <h4 className="mb-4 font-semibold text-gray-600 dark:text-gray-300">
                            These are all players that have created their accounts.
                        </h4>
                        <table className="w-full whitespace-no-wrap">
                            <thead>
                                <tr
                                    className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                    <th className="px-4 py-3">Username</th>
                                    <th className="px-4 py-3">Total Tournaments</th>
                                    <th className="px-4 py-3">Won Tournaments</th>
                                    <th className="px-4 py-3">Loses Tournaments</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Date & Time</th>
                                </tr>
                            </thead>
                            <tbody id="playersTable" className="divide-y divide-gray-700">
                                {players.map((player, index) => {
                                    return (
                                        <tr key={index} className="text-gray-400">
                                            <td className="px-4 py-3">
                                                {player.username}
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                {player.total}
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                {player.wins}
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                {player.loses}
                                            </td>
                                            <td className="px-4 py-3 text-xs">
                                                {player.status === 'active' ?
                                                    <span className="px-2 py-1 font-semibold leading-tight rounded-sm bg-green-700 text-green-100">
                                                        {player.status}
                                                    </span>
                                                    :
                                                    <span className="px-2 py-1 font-semibold leading-tight rounded-sm bg-red-700 text-red-100">
                                                        {player.status}
                                                    </span>
                                                }
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                {new Date(player.createDateTime).toLocaleDateString()} - {new Date(player.createDateTime).toLocaleTimeString()}
                                            </td>
                                        </tr>
                                    )
                                })}
                                {players.length === 0 &&
                                    <tr className="text-gray-400">
                                        <td colSpan="6" className="text-center px-4 py-3">
                                            No players found
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main >
    );
}