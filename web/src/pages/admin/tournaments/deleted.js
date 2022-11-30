import React, { useState, useEffect } from 'react';

import { GetUser, AdminGetAllTournaments } from '../../../utils';

export default function Deleted(props) {
    const [tournaments, setTournaments] = useState([]);

    async function loadTournaments() {
        const result = await AdminGetAllTournaments(props.socket, 'deleted')
        if (result) {
            setTournaments(result);
        }
    }

    useEffect(() => {
        const asyncFunc = async () => {
            const user = await GetUser(props.socket);
            if (!user || !user.isAdmin) {
                props.changeUrl('/login');
            }
            else {
                loadTournaments();
            }
        }
        asyncFunc();
    });

    return (
        <main className="h-full overflow-y-auto">
            <div className="container px-6 mx-auto grid">
                <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                    Deleted Tournaments
                </h2>
                <div
                    className="flex items-center justify-between p-4 mb-8 text-sm font-semibold text-gray-800 bg-gray-200 rounded-lg shadow-md focus:outline-none focus:shadow-outline-gray">
                    <div className="flex items-center">
                        <span>Now players are not able to browse</span>
                    </div>
                </div>
                <div className="px-4 py-4 mb-8 bg-white rounded-lg overflow-auto shadow-md dark:bg-gray-800">
                    <div className="w-full overflow-x-auto">
                        <h4 className="mb-4 font-semibold text-gray-600 dark:text-gray-300">
                            These all are tournaments deleted by Admin.
                        </h4>
                        <table className="w-full whitespace-no-wrap">
                            <thead>
                                <tr
                                    className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3">Current Players</th>
                                    <th className="px-4 py-3">Max Players</th>
                                    <th className="px-4 py-3">Create At</th>
                                    <th className="px-4 py-3">Start At</th>
                                    <th className="px-4 py-3">Delete At</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                                {tournaments.map((tournament, index) => (
                                    <tr key={index} className="text-gray-700 dark:text-gray-400">
                                        <td className="px-4 py-3">
                                            <p className="font-semibold">{tournament.name}</p>
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <p className="font-semibold">{tournament.playersArr.length}</p>
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
                                            <p className="font-semibold">{new Date(tournament.deleteDateTime).toLocaleDateString()} - {new Date(tournament.deleteDateTime).toLocaleTimeString()}</p>
                                        </td>
                                    </tr>
                                ))}
                                {tournaments.length === 0 &&
                                    <tr className="text-gray-700 dark:text-gray-400">
                                        <td colSpan="6" className="text-center px-4 py-3">No deleted tournaments</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}