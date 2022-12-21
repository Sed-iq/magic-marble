import React from 'react';
import { Link } from "react-router-dom";

export default function Home({ socket }) {
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
                <div className="flex-1 h-full max-w-2xl mx-auto overflow-hidden rounded-lg shadow-xl">
                    <div className="flex flex-col overflow-y-auto">
                        <div className="flex items-center justify-center p-6 sm:p-12">
                            <div className="w-full">
                                <h1 className="mb-4 text-center text-4xl font-semibold text-gray-200">
                                    Welcome
                                    <br></br>
                                    To
                                    <br></br>
                                    The MAGIC MARBLE GAME
                                </h1>
                                <p className="mb-4 text-center text-sm text-gray-200">
                                    The game is simple. You have 10 marbles. You can hide or guess.
                                    If you are hider you can hide your marbles nunmber from 1-10.
                                    If you are guesser you can guess the number of marbles hider has.
                                    If you guess the number of marbles hider has you win.
                                    If you guess wrong you lose.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}