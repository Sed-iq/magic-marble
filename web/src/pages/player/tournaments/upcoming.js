import React, { useState, useEffect } from 'react';
import Loading from '../../../components/Loading';

import { GetUser, GetAllTournaments, JoinTournament, LeaveTournament } from '../../../utils';

export default function Upcoming({ socketId, username, isAdmin, changeUrl }) {
    const [isLoading, setIsLoading] = useState(true);
    const [tournaments, setTournaments] = useState([]);

    async function joinTournament(tournamentId) {
        const result = await JoinTournament(socketId, tournamentId);
        if (result !== null) {
            if (result) {
                loadTournaments();
            }
        }
        else {
            changeUrl('/login');
        }
    }

    async function leaveTournament(tournamentId) {
        const result = await LeaveTournament(socketId, tournamentId);
        if (result !== null) {
            if (result) {
                loadTournaments();
            }
        }
        else {
            changeUrl('/login');
        }
    }

    async function loadTournaments() {
        const result = await GetAllTournaments(socketId, 'upcoming')
        if (result) {
            const user = await GetUser(socketId);
            if (!user || user.isAdmin) {
                changeUrl('/login');
            }
            else {
                for (let i = 0; i < result.length; i++) {
                    if (result[i].playersArr.findIndex(x => x === user.id) !== -1) {
                        result[i].isJoined = true;
                    }
                }
                setTournaments(result);
                setIsLoading(false);
            }
        }
    }

    useEffect(() => {
        setIsLoading(true);
        const asyncFunc = async () => {
            if (socketId) {
                const user = await GetUser(socketId);
                if (!user || user.isAdmin) {
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
                    Upcoming Tournaments
                </h2>
                <div
                    className="flex items-center justify-between p-4 mb-8 text-sm font-semibold text-orange-600 bg-orange-100 rounded-lg shadow-md focus:outline-none focus:shadow-outline-orange">
                    <div className="flex items-center">
                        <span>You can join any tournament</span>
                    </div>
                </div>
                <div className="px-4 py-4 mb-8 rounded-lg overflow-auto shadow-md bg-gray-800">
                    <div className="w-full overflow-x-auto">
                        <h4 className="mb-4 font-semibold text-gray-300">
                            These all are tournaments that are upcoming.
                        </h4>
                        <table className="w-full whitespace-no-wrap">
                            <thead>
                                <tr
                                    className="text-xs font-semibold tracking-wide text-left uppercase border-b border-gray-700 text-gray-400 bg-gray-800">
                                    <th className="px-4 py-3">Title</th>
                                    <th className="px-4 py-3">Prize Fund</th>
                                    <th className="px-4 py-3">Action</th>
                                    <th className="px-4 py-3">Buy-in</th>
                                    <th className="px-4 py-3">Max Players</th>
                                    <th className="px-4 py-3">Date & Time</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700 bg-gray-800">
                                {!isLoading && tournaments.map((tournament, index) => (
                                    <tr key={index} className="text-gray-400">
                                        <td className="px-4 py-3">
                                            <p className="font-semibold">{tournament.name}</p>
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <p className="font-semibold">{tournament.prizeAndDistribution}</p>
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <div className="flex items-center space-x-4 text-sm align-middle">
                                                <button onClick={(e) => changeUrl('/player/tournaments/view?id=' + tournament.id)}
                                                    className="my-auto px-2 py-1 font-semibold leading-tight rounded bg-yellow-700 text-yellow-100">
                                                    View
                                                </button>
                                                {!tournament.isJoined &&
                                                    <button onClick={(e) => joinTournament(tournament.id)}
                                                        className="my-auto px-2 py-1 font-semibold leading-tight rounded bg-green-700 text-green-100">
                                                        Join
                                                    </button>
                                                }
                                                {tournament.isJoined &&
                                                    <button onClick={(e) => leaveTournament(tournament.id)}
                                                        className="my-auto px-2 py-1 font-semibold leading-tight rounded bg-red-700 text-red-100">
                                                        Leave
                                                    </button>
                                                }
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <p className="font-semibold">{tournament.playersArr.length}</p>
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <p className="font-semibold">{tournament.maxPlayers}</p>
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <p className="font-semibold">{new Date(tournament.startDateTime).toLocaleDateString()}  {new Date(tournament.startDateTime).toLocaleTimeString()}</p>
                                        </td>
                                    </tr>
                                ))}
                                {!isLoading && tournaments.length === 0 && (
                                    <tr className="text-gray-400">
                                        <td colSpan="6" className="text-center px-4 py-3">No Upcoming tournaments</td>
                                    </tr>
                                )}
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