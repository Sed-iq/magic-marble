import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import { GetUser, LoginUser } from '../utils';

export default function Login({ socketId }) {
    const [loginFormOpen, setLoginFormOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        switch (name) {
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
        const result = await LoginUser(email, password);
        if (result) {
            navigate('/player/dashboard');
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
        asyncFunc();
    }, [socketId]);

    return (
        <>
            <div className="flex items-center justify-between h-14 px-2 border-b-2 border-white bg-black">
                <div className='flex items-center'>
                    <svg className='w-10 h-10' width="304" height="303" viewBox="0 0 304 303" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="152.5" cy="151.5" r="151.5" fill="#F5F5F5" />
                        <path d="M161 71.5C146.2 53.9 25 71.9323 19 79C-2.5 114.5 5.04851e-05 152 1.50004 167C20.5 151.5 110 105 137 112C152.5 124 142 174.5 165.5 187C193.5 201.5 216.5 143.041 234.5 144.5C252.5 145.959 267.5 250 267.5 250C267.5 250 280 234.833 281.5 231.5C274.5 168 259.5 117.5 239 112C218.5 106.5 188.5 156.5 176 149C163.5 141.5 181.5 86 161 71.5Z" fill="#000000" />
                        <path d="M141.5 206C103.9 188.8 38.1667 197.5 10 204C14.8333 219.167 26.5 248.7 34.5 245.5C60.155 235.238 104.5 233.5 127.5 241.242C150.5 248.984 182.436 267.489 190 298.5C203.5 303.5 228.3 308.2 219.5 287C208.5 260.5 188.5 227.5 141.5 206Z" fill="#000000" />
                    </svg>
                    <p className='text-white mx-2 font-bold'>MAGIC <br></br> MARBLE</p>
                </div>
                <div className='hidden md:flex items-center text-white gap-4 text-sm'>
                    <Link className='my-auto hover:border-b-2 hover:border-white transition-all' to='#'>
                        How it works
                    </Link>
                    <Link className='my-auto hover:border-b-2 hover:border-white transition-all' to='#'>
                        Tournaments
                    </Link>
                    <Link className='my-auto hover:border-b-2 hover:border-white transition-all' to='#'>
                        ️‍🔥100x NFT Freeroll
                    </Link>
                    <Link className='my-auto hover:border-b-2 hover:border-white transition-all' to='#'>
                        About us
                    </Link>
                </div>
                <div className='flex items-center align-middle gap-2'>
                    <Link className='my-auto' to='/login'>
                        <button className='my-auto bg-[#292524] text-white px-4 py-2 rounded-lg'>Login</button>
                    </Link>
                    <Link to='/signup'>
                        <button className='my-auto bg-gradient-to-r from-purple-500 to-purple-800 text-white px-6 py-2 rounded-lg'>Sign Up</button>
                    </Link>
                </div>
            </div>
            <div className="flex items-center min-h-screen px-2 sm:px-12 bg-black">
                <div className="flex-1 h-full max-w-2xl mx-auto overflow-hidden">
                    <div className="flex flex-col overflow-y-auto">
                        <div className="flex items-center justify-center px-2 sm:px-24">
                            <form onSubmit={handleSubmit} className="w-full">
                                <h1 className="mb-6 text-center text-5xl font-semibold text-gray-200">
                                    Login
                                </h1>
                                {
                                    loginFormOpen &&
                                    <>
                                        <label className="block text-sm">
                                            <span className="text-gray-400">Email</span>
                                            <input
                                                className="block w-full mt-1 px-2 py-3 rounded border-gray-400 border text-sm bg-transparent focus:border-white focus:outline-none text-gray-300 focus:shadow-outline-gray form-input"
                                                placeholder="" type="text" autoComplete='off' name="email" value={email} onChange={handleChange} />
                                        </label>
                                        <label className="block mt-4 text-sm">
                                            <span className="text-gray-400">
                                                Password
                                            </span>
                                            <input
                                                className="block w-full mt-1 px-2 py-3 rounded border-gray-400 border text-sm bg-transparent focus:border-white focus:outline-none text-gray-300 focus:shadow-outline-gray form-input"
                                                placeholder="" type="password" autoComplete='off' name="password" value={password} onChange={handleChange} />
                                        </label>
                                        <button type='sumbit' className="mt-8 flex justify-center gap-2 w-full px-4 py-2 text-sm font-medium leading-5 text-center text-black transition-colors duration-150 bg-gray-100 border border-transparent rounded-lg active:bg-white hover:bg-white focus:outline-none focus:shadow-outline-purple">
                                            Login
                                        </button>
                                    </>
                                }
                                {
                                    !loginFormOpen &&
                                    <>
                                        <button type='button' onClick={(e) => setLoginFormOpen(true)} className="mt-3 flex justify-center gap-2 w-full px-4 py-2 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-[#292524] border outline-white border-transparent rounded-lg shadow-white active:shadow-2xl hover:shadow-2xl">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="#fff" className="color000 svgShape" data-name="Layer 2"><path d="M19 4H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-.67 2L12 10.75 5.67 6zM19 18H5a1 1 0 0 1-1-1V7.25l7.4 5.55a1 1 0 0 0 .6.2 1 1 0 0 0 .6-.2L20 7.25V17a1 1 0 0 1-1 1z" className="color000 svgShape" data-name="email" /></g></svg>
                                            Log in with Email
                                        </button>
                                        <button type='button' className="flex justify-center gap-2 w-full px-4 py-2 mt-3 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-[#292524] border outline-white border-transparent rounded-lg shadow-white active:shadow-2xl hover:shadow-2xl">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262"><path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" /><path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" /><path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" /><path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" /></svg>
                                            Log in with Google
                                        </button>
                                        <button type='button' className="flex justify-center gap-2 w-full px-4 py-2 mt-3 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-[#292524] border outline-white border-transparent rounded-lg shadow-white active:shadow-2xl hover:shadow-2xl">
                                            Connect Wallet
                                        </button>
                                    </>
                                }
                                <hr className='mt-6'></hr>
                                <div className="mt-4 flex justify-center gap-2 align-middle text-center">
                                    <p className='my-auto text-sm text-gray-400'>Don't have an account?</p>
                                    <Link className="my-auto text-sm text-center font-medium text-gray-200 hover:text-white"
                                        to='/signup'>
                                        Sign Up
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}