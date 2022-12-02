import React, { useState, useEffect } from 'react';

import { GetUser, UpdateUser, DeleteUser } from '../utils';

export default function Setting(props) {
    const [username, setUsername] = useState(props.username);

    async function updateUser() {
        const result = await UpdateUser(props.socket, username);
        if (result !== null) {
            if (result) {
                props.setUsername(username);
                props.changeUrl(((props.isAdmin) ? '/admin/setting' : '/player/setting'));
            }
        }
        else {
            props.changeUrl('/login');
        }
    }

    async function deleteUser() {
        const result = await DeleteUser(props.socket);
        if (result !== null) {
            if (result) {
                props.changeUrl('/login');
            }
        }
        else {
            props.changeUrl('/login');
        }
    }

    useEffect(() => {
        const asyncFunc = async () => {
            const user = await GetUser(props.socket);
            if (!user || user.isAdmin !== props.isAdmin) {
                props.changeUrl('/login');
            }
        }
        asyncFunc();
    },[]);

    return (
        <main className="h-full overflow-y-auto">
            <div className="container px-6 mx-auto grid">
                <h2 className="my-6 text-2xl font-semibold text-gray-200">
                    Setting
                </h2>
                <div className="px-4 py-3 mb-4 rounded-lg shadow-md bg-red-500">
                    <p className="text-sm text-white">
                        You can not change your role.
                    </p>
                </div>
                <div className="px-4 py-3 mb-8 rounded-lg shadow-md bg-gray-800">
                    <label className="block text-sm">
                        <span className="text-gray-400">Username</span>
                        <input className="block w-full mt-1 p-2 rounded text-sm border-gray-600 bg-gray-700 focus:border-purple-400 focus:outline-none text-gray-300 focus:shadow-outline-gray form-input"
                            value={username} onChange={(e) => setUsername(e.target.value)} />
                    </label>
                    <div className="mt-4 text-sm">
                        <span className="text-gray-400">
                            Role
                        </span>
                        <div className="mt-2">
                            <label className="inline-flex items-center text-gray-400">
                                <input type="radio"
                                    className="w-4 h-4 cursor-pointer accent-purple-600 form-radio focus:outline-none"
                                    name="accountType" value="admin" checked={props.isAdmin ? true : false} onChange={(e) => { }} />
                                <span className="ml-2">Admin</span>
                            </label>
                            <label className="inline-flex items-center ml-6 text-gray-400">
                                <input type="radio"
                                    className="w-4 h-4 cursor-pointer accent-purple-600 form-radio focus:outline-none"
                                    name="accountType" value="player" checked={props.isAdmin ? false : true} onChange={(e) => { }} />
                                <span className="ml-2">Player</span>
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-end mt-6">
                        <button onClick={updateUser}
                            className="mx-2 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                            Update
                        </button>
                        <button onClick={(e) => props.changeUrl(props.isAdmin ? "/admin/setting" : "/player/setting")}
                            className="mx-2 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-transparent border border-purple-600 rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                            Cancel
                        </button>
                    </div>
                </div>
                <div className="px-4 py-3 mb-4 rounded-lg shadow-md bg-yellow-400">
                    <p className="text-sm text-black">
                        You will not able to create account again on this username.
                    </p>
                </div>
                <div className="px-4 py-4 mb-8 rounded-lg shadow-md bg-gray-800">
                    <div className="text-sm flex align-middle">
                        <span className="my-auto text-gray-400">Are you want to delete your account?</span>
                        <button type="button" onClick={deleteUser}
                            className="mx-2 my-auto px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-transparent border border-red-600 rounded-lg active:bg-red-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-red">
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}