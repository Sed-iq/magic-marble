import React, { useState, useEffect } from 'react';

import { GetUser, AdminGetAllTournaments, DeleteTournament } from '../../../utils';

export default function Upcoming(props) {
    const [tournaments, setTournaments] = useState([]);

    async function deleteTournament(tournamentId) {
        const result = await DeleteTournament(props.socket, tournamentId);
        if (result !== null) {
            if (result === true) {
                loadTournaments();
            }
        }
        else {
            props.changeUrl('/login')
        }
    }

    async function loadTournaments() {
        const result = await AdminGetAllTournaments(props.socket, 'upcoming')
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
    },[]);

    return (
        <main className="h-full overflow-y-auto">
            <div className="container px-6 mx-auto grid">
                <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                    Upcoming Tournaments
                </h2>
                <div
                    className="flex items-center justify-between p-4 mb-8 text-sm font-semibold text-orange-600 bg-orange-100 rounded-lg shadow-md focus:outline-none focus:shadow-outline-orange">
                    <div className="flex items-center">
                        <span>Now all players are able to browse</span>
                    </div>
                </div>
                <div className="px-4 py-4 mb-8 bg-white rounded-lg overflow-auto shadow-md dark:bg-gray-800">
                    <div className="w-full overflow-x-auto">
                        <h4 className="mb-4 font-semibold text-gray-600 dark:text-gray-300">
                            These all are tournaments are coming soon.
                        </h4>
                        <table className="w-full whitespace-no-wrap">
                            <thead>
                                <tr
                                    className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3">Current Players</th>
                                    <th className="px-4 py-3">Max Players</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Create At</th>
                                    <th className="px-4 py-3">Start At</th>
                                    <th className="px-4 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody id="tournamentsTable" className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
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
                                        <td className="px-4 py-3 text-xs">
                                            {(new Date(tournament.startDateTime) > new Date()) ?
                                                <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm dark:bg-green-700 dark:text-green-100">Upcoming</span>
                                                :
                                                <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm dark:bg-red-700 dark:text-red-100">Missed</span>
                                            }
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <p className="font-semibold">{new Date(tournament.createDateTime).toLocaleDateString()} - {new Date(tournament.createDateTime).toLocaleTimeString()}</p>
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <p className="font-semibold">{new Date(tournament.startDateTime).toLocaleDateString()} - {new Date(tournament.startDateTime).toLocaleTimeString()}</p>
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <div className="flex items-center space-x-4 text-sm">
                                                <button onClick={(e) => props.changeUrl('/admin/tournaments/view?tournamentId=' + tournament.id)}
                                                    className="px-2 py-1 font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded dark:bg-yellow-700 dark:text-yellow-100">
                                                    View
                                                </button>
                                                <button onClick={(e) => props.changeUrl('/admin/tournaments/edit?tournamentId=' + tournament.id)}
                                                    className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded dark:bg-green-700 dark:text-green-100">
                                                    Edit
                                                </button>
                                                <button onClick={(e) => deleteTournament(tournament.id)}
                                                    className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded dark:bg-red-700 dark:text-red-100">
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {tournaments.length === 0 &&
                                    <tr className="text-gray-700 dark:text-gray-400">
                                        <td colSpan="7" className="text-center px-4 py-3">No live tournaments</td>
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