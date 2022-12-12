import React, { useState, useEffect } from 'react';
import Loading from '../../../components/Loading';

import { GetUser, GetAllTournaments, DeleteTournament } from '../../../utils';

export default function Live({ socketId, username, isAdmin, changeUrl }) {
    const [isLoading, setIsLoading] = useState(true);
    const [tournaments, setTournaments] = useState([]);

    async function deleteTournament(tournamentId) {
        const result = await DeleteTournament(socketId, tournamentId);
        if (result !== null) {
            if (result) {
                loadTournaments();
            }
        }
        else {
            changeUrl('/login')
        }
    }

    async function loadTournaments() {
        const result = await GetAllTournaments(socketId, 'live')
        if (result) {
            setTournaments(result);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        const asyncFunc = async () => {
            if (socketId) {
                const user = await GetUser(socketId);
                if (!user || !user.isAdmin) {
                    changeUrl('/login');
                }
                else {
                    loadTournaments();
                }
            }
        }
        asyncFunc();
    }, [socketId]);

    return (
        <main className="h-full overflow-y-auto">
            <div className="container px-6 mx-auto grid">
                <h2 className="my-6 text-2xl font-semibold text-gray-200">
                    Live Tournaments
                </h2>
                <div
                    className="flex items-center justify-between p-4 mb-8 text-sm font-semibold text-green-600 bg-green-100 rounded-lg shadow-md focus:outline-none focus:shadow-outline-green">
                    <div className="flex items-center">
                        <span>Now other players are not able to browse</span>
                    </div>
                </div>
                <div className="px-4 py-4 mb-8 rounded-lg overflow-auto shadow-md bg-gray-800">
                    <div className="w-full overflow-x-auto">
                        <h4 className="mb-4 font-semibold text-gray-300">
                            These all are tournaments are live now.
                        </h4>
                        <table className="w-full whitespace-no-wrap">
                            <thead>
                                <tr
                                    className="text-xs font-semibold tracking-wide text-left uppercase border-b border-gray-700 text-gray-400 bg-gray-800">
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3">Current Players</th>
                                    <th className="px-4 py-3">Max Players</th>
                                    <th className="px-4 py-3">Create At</th>
                                    <th className="px-4 py-3">Start At</th>
                                    <th className="px-4 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700 bg-gray-800">
                                {!isLoading && tournaments.map((tournament, index) => (
                                    <tr key={index} className="text-gray-400">
                                        <td className="px-4 py-3">
                                            <p className="font-semibold">{tournament.name}</p>
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <p className="font-semibold">{(tournament.roundPlayersArr.length > 0) ? tournament.roundPlayersArr[tournament.roundPlayersArr.length - 1].length : tournament.maxPlayers}</p>
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
                                            <div className="flex items-center space-x-4 text-sm">
                                                <button onClick={(e) => changeUrl('/admin/tournaments/view?tournamentId=' + tournament.id)}
                                                    className="px-2 py-1 font-semibold leading-tight rounded bg-yellow-700 text-yellow-100">
                                                    View
                                                </button>
                                                <button onClick={(e) => deleteTournament(tournament.id)}
                                                    className="px-2 py-1 font-semibold leading-tight rounded bg-red-700 text-red-100">
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {!isLoading && tournaments.length === 0 &&
                                    <tr className="text-gray-400">
                                        <td colSpan="6" className="text-center px-4 py-3">No live tournaments</td>
                                    </tr>
                                }
                                {isLoading &&
                                    <tr className="text-gray-400">
                                        <td colSpan="6" className="text-center px-4 py-3">
                                            <Loading />
                                        </td>
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