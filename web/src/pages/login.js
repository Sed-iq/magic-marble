import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import { GetUser, LoginUser } from '../utils';

export default function Login({ socketId }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        switch (name) {
            case 'username':
                setUsername(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const result = await LoginUser(username, password);
        if (result) {
            await loadUser();
        }
        else {
            navigate('/login');
        }
    }

    async function loadUser() {
        if (socketId) {
            const user = await GetUser(socketId);
            if (user) {
                if (user.isAdmin) {
                    navigate('/admin/dashboard');
                }
                if (!user.isAdmin) {
                    navigate('/player/dashboard');
                }
            }
        }
    }

    useEffect(() => {
        const asyncFunc = async () => {
            await loadUser();
        }
        // asyncFunc();
    }, [socketId]);

    return (
        <div className="flex items-center min-h-screen p-6 bg-gray-900">
            <div className="flex-1 h-full max-w-2xl mx-auto overflow-hidden">
                <div className="flex flex-col overflow-y-auto">
                    <div className="flex items-center justify-center p-6 sm:p-12">
                        <form onSubmit={handleSubmit} className="w-full">
                            <h1 className="mb-4 text-center text-4xl font-semibold text-gray-200">
                                Login
                            </h1>
                            <label className="block text-sm">
                                <span className="text-gray-400">Username</span>
                                <input
                                    className="block w-full mt-1 px-2 py-2 rounded text-sm bg-gray-700 focus:border-purple-400 focus:outline-none text-gray-300 focus:shadow-outline-gray form-input"
                                    placeholder="someone" type="text" name='username' value={username} onChange={handleChange} />
                            </label>
                            <label className="block mt-4 text-sm">
                                <span className="text-gray-400">Password</span>
                                <input
                                    className="block w-full mt-1 px-2 py-2 rounded text-sm bg-gray-700 focus:border-purple-400 focus:outline-none text-gray-300 focus:shadow-outline-gray form-input"
                                    placeholder="•••••••••" type="password" name='password' autoComplete='on' value={password} onChange={handleChange} />
                            </label>
                            <button type='submit' className="block w-full px-4 py-2 mt-6 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                                Log in
                            </button>
                            <p className="mt-4">
                                <Link className="text-sm font-medium text-purple-400 hover:underline"
                                    to='/register'>
                                    Don't have an account? Register
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}