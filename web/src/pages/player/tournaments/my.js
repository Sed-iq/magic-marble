import React, { useState, useEffect } from 'react';
import Loading from '../../../components/Loading';

import { GetUser, GetAllTournaments, PlayerGetAllTournaments, LeaveTournament } from '../../../utils';

export default function My({ socketId, username, isAdmin, changeUrl }) {
    const [isLoading01, setIsLoading01] = useState(true);
    const [isLoading02, setIsLoading02] = useState(true);
    const [tournaments, setTournaments] = useState([]);
    const [createdTournaments, setCreatedTournaments] = useState([]);

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
        const result1 = await PlayerGetAllTournaments(socketId, 'upcoming');
        const result2 = await PlayerGetAllTournaments(socketId, 'live');
        if (result1 && result2) {
            // add live and upcoming attribute in results and then merge them
            const upcomingTournaments = result1.map(tournament => {
                tournament.upcoming = true;
                return tournament;
            });
            const liveTournaments = result2.map(tournament => {
                tournament.live = true;
                return tournament;
            });
            const allTournaments = [...upcomingTournaments, ...liveTournaments];
            setTournaments(allTournaments);
            setIsLoading01(false);
        }
    }

    async function loadCreatedTournaments() {
        const result1 = await GetAllTournaments(socketId, 'live');
        const result2 = await GetAllTournaments(socketId, 'upcoming');
        if (result1 && result2) {
            const user = await GetUser(socketId);
            if (!user || user.isAdmin) {
                changeUrl('/login');
            }
            else {
                console.log("sadsadasdsad");
                const createdTournaments = result1.filter(tournament => tournament.createdBy === user.id);
                const upcomingTournaments = result2.filter(tournament => tournament.createdBy === user.id);
                const allTournaments = [...createdTournaments, ...upcomingTournaments];
                setCreatedTournaments(allTournaments);
                setIsLoading02(false);
            }
        }
    }

    useEffect(() => {
        setIsLoading01(true);
        setIsLoading02(true);
        const asyncFunc = async () => {
            if (socketId) {
                const user = await GetUser(socketId);
                if (!user || user.isAdmin) {
                    changeUrl('/login');
                }
                else {
                    loadTournaments();
                    loadCreatedTournaments();
                }
            }
        }
        asyncFunc();
    }, [socketId]);

    return (
        <main className="h-full overflow-y-auto">
            <div className="container px-6 mx-auto grid">
                <h2 className="my-6 text-2xl font-semibold text-gray-200">
                    My Tournaments
                </h2>
                <div
                    className="flex items-center justify-between p-4 mb-8 text-sm font-semibold text-green-600 bg-green-100 rounded-lg shadow-md focus:outline-none focus:shadow-outline-green">
                    <div className="flex items-center">
                        <span>Your upcoming, live and created tournaments are here.</span>
                    </div>
                </div>
                <div className="px-4 py-4 mb-8 rounded-lg overflow-auto shadow-md bg-gray-800">
                    <div className="w-full overflow-x-auto">
                        <h4 className="mb-4 font-semibold text-gray-300">
                            These all are upcoming and live tournaments.
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
                                {!isLoading01 && tournaments.map((tournament, index) => (
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
                                {!isLoading01 && tournaments.length === 0 && (
                                    <tr className="text-gray-400">
                                        <td colSpan="6" className="text-center px-4 py-3">No Live tournaments</td>
                                    </tr>
                                )}
                                {isLoading01 &&
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
                <div className="px-4 py-4 mb-8 rounded-lg overflow-auto shadow-md bg-gray-800">
                    <div className="w-full overflow-x-auto">
                        <h4 className="mb-4 font-semibold text-gray-300">
                            These all are created tournaments.
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
                                {!isLoading02 && createdTournaments.map((tournament, index) => (
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
                                                {tournament.live &&
                                                    <button onClick={(e) => changeUrl('/games/magicmarble?id=' + tournament.id)}
                                                        className="my-auto px-2 py-1 font-semibold leading-tight rounded bg-green-700 text-green-100">
                                                        Play
                                                    </button>
                                                }
                                                {tournament.upcoming &&
                                                    <button onClick={(e) => leaveTournament(tournament.id)}
                                                        className="my-auto px-2 py-1 font-semibold leading-tight rounded bg-green-700 text-green-100">
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
                                {!isLoading02 && createdTournaments.length === 0 && (
                                    <tr className="text-gray-400">
                                        <td colSpan="6" className="text-center px-4 py-3">No Created tournaments</td>
                                    </tr>
                                )}
                                {isLoading02 &&
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