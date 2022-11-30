import React, { useState, useEffect } from 'react';

import { GetUser, GetATournament } from '../../utils';

export default function View(props) {
    const [tournament, setTournament] = useState({});

    async function loadTournament(userId, tournamentId) {
        const result = await GetATournament(props.socket, tournamentId);
        if (result) {
            setTournament(result);
        }
    }

    useEffect(() => {
        const asyncFunc = async () => {
            const user = await GetUser(props.socket);
            if (!user || user.isAdmin !== props.isAdmin) {
                props.changeUrl('/login');
            }
            else {
                if (window.location.href.split('?')[1]) {
                    let tournamentId = window.location.href.split('?')[1].split('=')[1];
                    if (tournamentId) {
                        loadTournament(user.id, tournamentId);
                    }
                    else {
                        if (props.isAdmin) {
                            props.changeUrl('/admin/dashboard');
                        }
                        else {
                            props.changeUrl('/player/dashboard');
                        }
                    }
                }
                else {
                    if (props.isAdmin) {
                        props.changeUrl('/admin/dashboard');
                    }
                    else {
                        props.changeUrl('/player/dashboard');
                    }
                }
            }
        }
        asyncFunc();
    },[]);

    return (
        <main className="h-full overflow-y-auto">
            <div className="container px-6 mx-auto grid">
                <h2 className="my-6 text-2xl font-semibold text-gray-200">
                    View Tournament
                </h2>
                <div className="px-4 py-4 rounded-lg overflow-auto shadow-md bg-gray-800">
                    <div className="w-full overflow-x-auto">
                        <h4 className="mb-4 font-semibold text-gray-300">
                            These all are the Tournament details.
                        </h4>
                        <div className="grid grid-cols-1 gap-6 mt-4">
                            <div className="flex flex-col p-4 rounded-lg bg-gray-800">
                                <div className="grid md:grid-cols-2 justify-between mt-4">
                                    <span className="text-sm font-light text-gray-400">
                                        <i className="fa-solid fa-file-signature mr-2"></i> Name
                                    </span>
                                    <span className="px-2 py-1 font-semibold  rounded shadow bg-gray-600 text-gray-200">
                                        {tournament && tournament.name ? tournament.name : 'Lorem ipsum dolor sit amet'}
                                    </span>
                                </div>
                                <div className="grid md:grid-cols-2 justify-between mt-4">
                                    <span className="text-sm font-light text-gray-400">
                                        <i className="fas fa-list-check mr-2"></i> Rules
                                    </span>
                                    <span className="px-2 py-1 font-semibold  rounded shadow bg-gray-600 text-gray-200">
                                        {tournament && tournament.rules ? tournament.rules : 'Lorem ipsum dolor sit amet'}
                                    </span>
                                </div>
                                <div className="grid md:grid-cols-2 justify-between mt-4">
                                    <span className="text-sm font-light text-gray-400">
                                        <i className="fas fa-file-pen mr-2"></i> Description
                                    </span>
                                    <span className="px-2 py-1 font-semibold  rounded shadow bg-gray-600 text-gray-200">
                                        {tournament && tournament.description ? tournament.description
                                            :
                                            `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate quia
                                        consequuntur quos ipsum
                                        Nesciunt accusamus quidem hic, fugiat quasi facere commodi inventore quo,
                                        recusandae, laudantium
                                        assumenda perferendis dolorum optio. Nobis.`
                                        }
                                    </span>
                                </div>

                                <div className="grid md:grid-cols-2 justify-between mt-4">
                                    <span className="text-sm font-light text-gray-400">
                                        <li className="fas fa-users mr-2"></li> Current Players
                                    </span>
                                    <span
                                        className="px-2 py-1 font-semibold rounded shadow bg-gray-600 text-gray-200">
                                        <span >{tournament && tournament.playersArr ? tournament.playersArr.length : '0'}</span>
                                    </span>
                                </div>
                                <div className="grid md:grid-cols-2 justify-between mt-4">
                                    <span className="text-sm font-light text-gray-400">
                                        <i className="fa-solid fa-bullseye mr-2"></i> Max Players
                                    </span>
                                    <span
                                        className="px-2 py-1 font-semibold rounded shadow bg-gray-600 text-gray-200">
                                        <span id="maxPlayers">{tournament && tournament.maxPlayers ? tournament.maxPlayers : '0'}</span>
                                    </span>
                                </div>
                                <div className="grid md:grid-cols-2 justify-between mt-4">
                                    <span className="text-sm font-light text-gray-400">
                                        <i className="fas fa-trophy mr-2"></i> Prize and distribution
                                    </span>
                                    <span className="px-2 py-1 font-semibold rounded shadow bg-gray-600 text-gray-200">
                                        {tournament && tournament.prizeAndDistribution ? tournament.prizeAndDistribution
                                            :
                                            `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate quia
                                        consequuntur quos ipsum!
                                        Nesciunt accusamus quidem hic, fugiat quasi facere commodi inventore quo,
                                        recusandae, laudantium
                                        assumenda perferendis dolorum optio. Nobis.`
                                        }
                                    </span>
                                </div>
                                <div className="grid md:grid-cols-2 justify-between mt-4">
                                    <span className="text-sm font-light text-gray-400">
                                        <li className="fas fa-clock mr-2"></li> Create At
                                    </span>
                                    <span
                                        className="px-2 py-1 font-semibold rounded shadow bg-gray-600 text-gray-200">
                                        <span>{tournament && tournament.createDateTime ? (new Date(tournament.createDateTime).toLocaleDateString() + ' - ' + new Date(tournament.createDateTime).toLocaleTimeString()) : 'No Date'}</span>
                                    </span>
                                </div>
                                <div className="grid md:grid-cols-2 justify-between mt-4">
                                    <span className="text-sm font-light text-gray-400">
                                        <li className="fas fa-hourglass-start mr-2"></li> Start At
                                    </span>
                                    <span
                                        className="px-2 py-1 font-semibold rounded shadow bg-gray-600 text-gray-200">
                                        <span>{tournament && tournament.startDateTime ? new Date(tournament.startDateTime).toLocaleDateString() + ' - ' + new Date(tournament.startDateTime).toLocaleTimeString() : 'No Date'}</span>
                                    </span>
                                </div>
                                <a className="mt-2 text-blue-600"
                                    href={tournament && tournament.link ? tournament.optionalLink : ''}>{tournament && tournament.link ? tournament.optionalLink : 'No Link Added'}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}