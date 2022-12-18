import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import { SignUpUser,API_URL } from '../utils';

export default function SignUp({ socketId }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        switch (name) {
            case 'username':
                setUsername(value);
                break;
            case 'email':
                setEmail(value);
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
        const result = await SignUpUser(username, email, password);
        if (result) {
            navigate('/login');
        }
        else {
            navigate('/signup');
        }
    }

    const googleAuth = () => {
		window.open(
			`${API_URL}/auth/google/callback`,
			"_self"
		);
	};

    return (
        <div className="flex items-center min-h-screen px-2 sm:px-12 bg-gray-900">
            <div className="flex-1 h-full max-w-2xl mx-auto overflow-hidden">
                <div className="flex flex-col overflow-y-auto">
                    <div className="flex items-center justify-center px-2 sm:px-24">
                        <form onSubmit={handleSubmit} className="w-full">
                            <h1 className="mb-4 text-4xl text-center font-semibold text-gray-200">
                                Sign Up
                            </h1>
                            <label className="block text-sm">
                                <span className="text-gray-400">Username</span>
                                <input
                                    className="block w-full mt-1 px-2 py-2 rounded text-sm bg-gray-700 focus:border-purple-400 focus:outline-none text-gray-300 focus:shadow-outline-gray form-input"
                                    placeholder="someone" type="text" name='username' value={username} onChange={handleChange} />
                            </label>
                            <label className="block mt-4 text-sm">
                                <span className="text-gray-400">Email</span>
                                <input
                                    className="block w-full mt-1 px-2 py-2 rounded  text-sm bg-gray-700 focus:border-purple-400 focus:outline-none text-gray-300 focus:shadow-outline-gray form-input"
                                    placeholder="somone@gmail.com" type="text" autoComplete='off' name="email" value={email} onChange={handleChange} />
                            </label>
                            <label className="block mt-4 text-sm">
                                <span className="text-gray-400">
                                    Password
                                </span>
                                <input
                                    className="block w-full mt-1 px-2 py-2 rounded  text-sm bg-gray-700 focus:border-purple-400 focus:outline-none text-gray-300 focus:shadow-outline-gray form-input"
                                    placeholder="•••••••••" type="password" autoComplete='off' name="password" value={password} onChange={(e) => handleChange(e)} />
                            </label>
                            <button type='sumbit' className="mt-8 flex justify-center gap-2 w-full px-4 py-2 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="#fff" className="color000 svgShape" data-name="Layer 2"><path d="M19 4H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-.67 2L12 10.75 5.67 6zM19 18H5a1 1 0 0 1-1-1V7.25l7.4 5.55a1 1 0 0 0 .6.2 1 1 0 0 0 .6-.2L20 7.25V17a1 1 0 0 1-1 1z" className="color000 svgShape" data-name="email" /></g></svg>
                                Sign Up with Email
                            </button>
                            <button type='button' onClick={googleAuth} className="flex justify-center gap-2 w-full px-4 py-2 mt-6 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262"><path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" /><path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" /><path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" /><path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" /></svg>
                                Sign Up with Google
                            </button>
                            <button type='button' className="flex justify-center gap-2 w-full px-4 py-2 mt-6 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                                Connect Wallet
                            </button>
                            <hr className='mt-6'></hr>
                            <div className="mt-4 flex justify-center gap-2 align-middle text-center">
                                <p className='my-auto text-sm text-white'>Already have account?</p>
                                <Link className="my-auto text-sm text-center font-medium text-purple-400 hover:underline"
                                    to='/login'>
                                    Login
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}