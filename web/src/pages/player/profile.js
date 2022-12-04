import React, { useEffect } from 'react';

import { GetUser } from '../../utils';

export default function Profile({ socket, username, isAdmin, changeUrl }) {
    useEffect(() => {
        const asyncFunc = async () => {
            const user = await GetUser(socket);
            if (!user || user.isAdmin === true) {
                changeUrl('/login');
            }
        }
        asyncFunc();
    }, [socket]);

    return (
        <main className="h-full overflow-y-auto">
            <div className="container px-6 mx-auto grid">
                <h2 className="my-6 text-2xl font-semibold text-gray-200">
                    Profile
                </h2>
                <div className="px-4 py-3 mb-4 rounded-lg shadow-md bg-red-500">
                    <p className="text-sm text-white">
                        Do not share your personal information with anyone.
                    </p>
                </div>
                <div className="px-4 py-3 mb-8 rounded-lg shadow-md bg-gray-800">
                    <label className="block text-sm">
                        <span className="text-gray-400">Username</span>
                        <input className="block w-full mt-1 px-2 py-2 rounded text-sm border-gray-600 bg-gray-700 focus:border-purple-400 focus:outline-none text-gray-300 focus:shadow-outline-gray form-input"
                            value={username} disabled />
                    </label>
                    <label className="block mt-2 text-sm">
                        <span className="text-gray-400">Password</span>
                        <input
                            className="block w-full mt-1 px-2 py-2 rounded text-sm border-gray-600 bg-gray-700 focus:border-purple-400 focus:outline-none text-gray-300 focus:shadow-outline-gray form-input"
                            value="•••••••••" disabled />
                    </label>

                    <div className="mt-4 text-sm">
                        <span className="text-gray-400">
                            Role
                        </span>
                        <div className="mt-2">
                            <label className="inline-flex items-center text-gray-400">
                                <input type="radio"
                                    className="w-4 h-4 cursor-pointer accent-purple-600 form-radio focus:outline-none"
                                    name="accountType" value="admin" checked={false} onChange={(e) => { }} />
                                <span className="ml-2">Admin</span>
                            </label>
                            <label className="inline-flex items-center ml-6 text-gray-400">
                                <input type="radio"
                                    className="w-4 h-4 cursor-pointer accent-purple-600 form-radio focus:outline-none"
                                    name="accountType" value="player" checked={true} onChange={(e) => { }} />
                                <span className="ml-2">Player</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}