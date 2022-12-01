import React, { useState, useEffect } from 'react';

import { GetUser, AdminGetAllTournaments } from '../../../utils';

export default function Completed({socket, username, isAdmin, changeUrl}) {
    const [tournaments, setTournaments] = useState([]);

    async function loadTournaments() {
        const result = await AdminGetAllTournaments(socket, 'completed')
        if (result) {
            setTournaments(result);
        }
    }

    useEffect(() => {
        const asyncFunc = async () => {
            const user = await GetUser(socket);
            if (!user || !user.isAdmin) {
                changeUrl('/login');
            }
            else {
                loadTournaments();
            }
        }
        asyncFunc();
    },[socket]);

    return (
        <main className="h-full overflow-y-auto">
            <div className="container px-6 mx-auto grid">
                <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                    Completed Tournaments
                </h2>
                <div
                    className="flex items-center justify-between p-4 mb-8 text-sm font-semibold text-teal-600 bg-teal-100 rounded-lg shadow-md focus:outline-none focus:shadow-outline-teal">
                    <div className="flex items-center">
                        <span>Now players are not able to browse</span>
                    </div>
                </div>
                <div className="px-4 py-4 mb-8 bg-white rounded-lg overflow-auto shadow-md dark:bg-gray-800">
                    <div className="w-full overflow-x-auto">
                        <h4 className="mb-4 font-semibold text-gray-600 dark:text-gray-300">
                            These all are tournaments already completed.
                        </h4>
                        <table className="w-full whitespace-no-wrap">
                            <thead>
                                <tr
                                    className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3">Winner</th>
                                    <th className="px-4 py-3">Max Players</th>
                                    <th className="px-4 py-3">Create At</th>
                                    <th className="px-4 py-3">Start At</th>
                                    <th className="px-4 py-3">Finish At</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                                {tournaments.map((tournament, index) => (
                                    <tr key={index} className="text-gray-700 dark:text-gray-400">
                                        <td className="px-4 py-3">
                                            <p className="font-semibold">{tournament.name}</p>
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <p className="font-semibold">{tournament.winner}</p>
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <p className="font-semibold">{tournament.maxPlayers}</p>
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <p className="font-semibold">{new Date(tournament.createDateTime).toLocaleDateString()} - {new Date(tournament.createDateTime).toLocaleTimeString()}</p>
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <p className="font-semibold">{new Date(tournament.startDateTime).toLocaleDateString()} - {new Date(tournament.startDateTime).toLocaleTimeString()}</p>
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <p className="font-semibold">${new Date(tournament.endDateTime).toLocaleDateString()} - ${new Date(tournament.endDateTime).toLocaleTimeString()}</p>
                                        </td>
                                    </tr>
                                ))}
                                {tournaments.length === 0 && (
                                    <tr className="text-gray-700 dark:text-gray-400">
                                        <td colSpan="6" className="text-center px-4 py-3">No finished tournaments</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}