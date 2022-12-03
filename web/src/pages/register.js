import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import { RegisterUser } from '../utils';

export default function Register({socket}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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
            case 'confirmPassword':
                setConfirmPassword(value);
                break;
            default:
                break;
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const result = await RegisterUser(username, password, confirmPassword);
        if (result) {
            navigate('/login');
        }
        else {
            navigate('/register');
        }
    }

    return (
        <div className="flex items-center min-h-screen p-6 bg-gray-900">
            <div className="flex-1 h-full max-w-2xl mx-auto overflow-hidden rounded-lg shadow-xl bg-gray-800">
                <div className="flex flex-col overflow-y-auto">
                    <div className="flex items-center justify-center p-6 sm:p-12">
                        <form onSubmit={handleSubmit} className="w-full">
                            <h1 className="mb-4 text-4xl text-center font-semibold text-gray-200">
                                Register
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
                                    className="block w-full mt-1 px-2 py-2 rounded  text-sm bg-gray-700 focus:border-purple-400 focus:outline-none text-gray-300 focus:shadow-outline-gray form-input"
                                    placeholder="•••••••••" type="password" autoComplete='off' name="password" value={password} onChange={handleChange} />
                            </label>
                            <label className="block mt-4 text-sm">
                                <span className="text-gray-400">
                                    Confirm password
                                </span>
                                <input
                                    className="block w-full mt-1 px-2 py-2 rounded  text-sm bg-gray-700 focus:border-purple-400 focus:outline-none text-gray-300 focus:shadow-outline-gray form-input"
                                    placeholder="•••••••••" type="password" autoComplete='off' name="confirmPassword" value={confirmPassword} onChange={(e) => handleChange(e)} />
                            </label>
                            <div className="flex mt-6 text-sm">
                                <label className="flex items-center text-gray-400">
                                    <input type="checkbox"
                                        className="w-4 h-4 accent-purple-600 form-checkbox focus:border-purple-400 focus:outline-none focus:shadow-outline-gray" />
                                    <span className="ml-2">
                                        I agree to the <span className="underline">privacy policy</span>
                                    </span>
                                </label>
                            </div>
                            <button type='submit' className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                                Register
                            </button>
                            <p className="mt-4">
                                <Link className="text-sm font-medium text-purple-400 hover:underline"
                                    to='/login'>
                                    Already have an account? Login
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}