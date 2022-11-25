import React, { useState, useEffect } from 'react';

import { GetUser, PlayerGetAllTournaments } from '../../../utils';

export default function Played(props) {
    const [tournaments, setTournaments] = useState([]);

    async function loadTournaments(userId) {
        const result = await PlayerGetAllTournaments(props.socket, 'completed', 'getPlayerTournaments')
        if (result) {
            setTournaments(result);
        }
    }

    useEffect(() => {
        const asyncFunc = async () => {
            const user = await GetUser(props.socket);
            if (!user || user.isAdmin) {
                props.changeUrl('/login');
            }
            else {
                loadTournaments(user.id);
            }
        }
        asyncFunc();
    }, []);

    return (
        <main className="h-full overflow-y-auto">
            <div className="container px-6 mx-auto grid">
                <h2 className="my-6 text-2xl font-semibold text-gray-200">
                    Played Tournaments
                </h2>
                <div
                    className="flex items-center justify-between p-4 mb-8 text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg shadow-md focus:outline-none focus:shadow-outline-gray">
                    <div className="flex items-center">
                        <span>These tournaments are closed now.</span>
                    </div>
                </div>
                <div className="px-4 py-4 rounded-lg overflow-auto shadow-md bg-gray-800">
                    <div className="w-full overflow-x-auto">
                        <h4 className="mb-4 font-semibold text-gray-300">
                            These all are tournaments you already played.
                        </h4>
                        <table className="w-full whitespace-no-wrap">
                            <thead>
                                <tr
                                    className="text-xs font-semibold tracking-wide text-left uppercase border-b border-gray-700 text-gray-400 bg-gray-800">
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3">Winner</th>
                                    <th className="px-4 py-3">Max Players</th>
                                    <th className="px-4 py-3">Start At</th>
                                    <th className="px-4 py-3">Finish At</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700 bg-gray-800">
                                {tournaments.map((tournament, index) => (
                                    <tr key={index} className="text-gray-400">
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
                                            <p className="font-semibold">{new Date(tournament.startDateTime).toLocaleDateString()} {new Date(tournament.startDateTime).toLocaleTimeString()}</p>
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <p className="font-semibold">{new Date(tournament.endDateTime).toLocaleDateString()} {new Date(tournament.endDateTime).toLocaleTimeString()}</p>
                                        </td>
                                    </tr>
                                ))}
                                {tournaments.length === 0 &&
                                    <tr className="text-gray-400">
                                        <td colSpan="6" className="text-center px-4 py-3">No played tournaments</td>
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