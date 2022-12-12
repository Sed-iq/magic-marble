import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';

import { GetUser, GetAllPlayers, UpdateUserAdminAccess } from '../../utils';

export default function Players({ socketId, username, isAdmin, changeUrl }) {
    const [isLoading, setIsLoading] = useState(true);
    const [players, setPlayers] = useState([]);


    async function changeAdminAccess(userId, adminAccess) {
        const result = await UpdateUserAdminAccess(socketId, userId, adminAccess);
        if (result !== null) {
            if (result) {
                console.log('success');
                loadPlayers();
            }
        }
        else {
            changeUrl('/login')
        }
    }

    async function loadPlayers() {
        const result = await GetAllPlayers(socketId);
        if (result !== null) {
            if (result) {
                console.log(result);
                setPlayers(result);
            }
            setIsLoading(false);
        }
        else {
            changeUrl('/login')
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
                    loadPlayers();
                }
            }
        }
        asyncFunc();
    }, [socketId]);

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
                <div className="px-4 py-4 mb-8 rounded-lg overflow-auto shadow-md bg-gray-800">
                    <div className="w-full overflow-x-auto">
                        <h4 className="mb-4 font-semibold text-gray-300">
                            These are all players that have created their accounts.
                        </h4>
                        <table className="w-full whitespace-no-wrap">
                            <thead>
                                <tr
                                    className="text-xs font-semibold tracking-wide text-left uppercase border-b border-gray-700 text-gray-400 bg-gray-800">
                                    <th className="px-4 py-3">Username</th>
                                    <th className="px-4 py-3">Admin Access</th>
                                    <th className="px-4 py-3">Total Tournaments</th>
                                    <th className="px-4 py-3">Progress</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Date & Time</th>
                                </tr>
                            </thead>
                            <tbody id="playersTable" className="divide-y divide-gray-700">
                                {!isLoading && players.map((player, index) => {
                                    return (
                                        <tr key={index} className="text-gray-400">
                                            <td className="px-4 py-3">
                                                {player.username}
                                            </td>
                                            <td className="px-4 py-3">
                                                {player.status === 'active' ?
                                                    player.adminAccess ?
                                                        <input type="checkbox" className="form-checkbox h-5 w-5 accent-green-600" checked={true} onChange={() => changeAdminAccess(player.id, false)} />
                                                        :
                                                        <input type="checkbox" className="form-checkbox h-5 w-5 accent-green-600" checked={false} onChange={() => changeAdminAccess(player.id, true)} />
                                                    : null
                                                }
                                                {player.status === 'inactive' ?
                                                    player.adminAccess ?
                                                        <input type="checkbox" className="form-checkbox h-5 w-5 accent-green-600" checked disabled />
                                                        :
                                                        <input type="checkbox" className="form-checkbox h-5 w-5 accent-green-600" disabled />
                                                    : null
                                                }
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                {player.tournamentsArr ? player.tournamentsArr.length : 0}
                                            </td>
                                            <td className="px-4 py-3 flex content-center align-middle">
                                                <div className="w-full rounded-full h-1.5 bg-gray-700 my-auto mr-1">
                                                    <div className="h-1.5 rounded-full bg-green-700" style={{ width: Math.floor(player.tournamentsArr && player.tournamentsArr.length > 0 ? (player.wins / player.tournamentsArr.length * 100) : 100) + '%' }}></div>
                                                </div>
                                                <p>{player.tournamentsArr && player.tournamentsArr.length > 0 ? Math.floor(player.wins / player.tournamentsArr.length * 100) : 100}%</p>
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
                                {!isLoading && players.length === 0 &&
                                    <tr className="text-gray-400">
                                        <td colSpan="6" className="text-center px-4 py-3">
                                            No players found
                                        </td>
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
        </main >
    );
}