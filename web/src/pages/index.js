import React from 'react';
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="flex items-center min-h-screen p-6 bg-gray-900">
            <div className="flex-1 h-full max-w-2xl mx-auto overflow-hidden rounded-lg shadow-xl bg-gray-800">
                <div className="flex flex-col overflow-y-auto">
                    <div className="flex items-center justify-center p-6 sm:p-12">
                        <div className="w-full">
                            <h1 className="mb-4 text-center text-4xl font-semibold text-gray-200">
                                Welcome to the MARBLES GAME
                            </h1>
                            <p className="mb-4 text-center text-sm text-gray-200">
                                The game is simple. You have 10 marbles. You can hide or guess.
                                If you are hider you can hide your marbles nunmber from 1-10.
                                If you are guesser you can guess the number of marbles hider has.
                                If you guess the number of marbles hider has you win.
                                If you guess wrong you lose.
                            </p>
                            <div className="flex gap-2 items-center justify-center">
                                <Link className="w-1/2 px-4 py-2 mt-6 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                                    to='/login' >
                                    Log in
                                </Link>
                                <Link className="w-1/2 px-4 py-2 mt-6 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                                    to="/register">
                                    Register
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}