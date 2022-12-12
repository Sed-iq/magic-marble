import React, { useState, useEffect } from 'react';
import Loading from '../../../components/Loading';

import { GetUser, GetAllTournaments } from '../../../utils';

export default function All({ socketId, username, isAdmin, changeUrl }) {
    const [popupAllowed, setPopupAllowed] = useState('');
    const [isLoading01, setIsLoading01] = useState(true);
    const [isLoading02, setIsLoading02] = useState(true);
    const [upcomingTournaments, setUpcomingTournaments] = useState([]);
    const [liveTournaments, setLiveTournaments] = useState([]);

    async function loadTournaments(status) { // getTournamentsForPlayer
        const result = await GetAllTournaments(socketId, status)
        if (result) {
            if (status === 'upcoming') {
                setUpcomingTournaments(result);
                setIsLoading01(false);
            }
            else if (status === 'live') {
                setLiveTournaments(result);
                setIsLoading02(false);
            }
        }
    }

    useEffect(() => {
        setIsLoading01(true);
        setIsLoading02(true);
        const asyncFunc = async () => {
            if (socketId) {
                const user = await GetUser(socketId);
                if (!user || user.isAdmin) {
                    changeUrl('/login');
                }
                else {
                    loadTournaments('upcoming');
                    loadTournaments('live');
                }
            }
        }
        let tempWindow = window.open('', 'tempWindow', 'toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,directories=no,status=no');
        if (!tempWindow || tempWindow.closed || typeof tempWindow.closed == 'undefined') {
            setPopupAllowed('No');
        }
        else {
            asyncFunc();
            tempWindow.close();
            setPopupAllowed('Yes');
        }
    }, [socketId]);

    return (
        <main className="h-full overflow-y-auto">
            <div className="container px-6 mx-auto grid">
                <h2 className="my-6 text-2xl font-semibold text-gray-200">
                    All Tournaments
                </h2>
                <div
                    className="flex items-center justify-between p-4 mb-8 text-sm font-semibold text-orange-600 bg-orange-100 rounded-lg shadow-md focus:outline-none focus:shadow-outline-orange">
                    <div className="flex items-center">
                        <span>You can browse any tournament</span>
                    </div>
                </div>

                {popupAllowed === 'Yes' ?
                    <>
                        <div className="px-4 py-4 mb-8 rounded-lg overflow-auto shadow-md bg-gray-800">
                            <div className="w-full overflow-x-auto">
                                <h4 className="mb-4 font-semibold text-gray-300">
                                    These all are upcoming tournaments.
                                </h4>
                                <table className="w-full whitespace-no-wrap">
                                    <thead>
                                        <tr
                                            className="text-xs font-semibold tracking-wide text-left uppercase border-b border-gray-700 text-gray-400 bg-gray-800">
                                            <th className="px-4 py-3">Title</th>
                                            <th className="px-4 py-3">Prize Fund</th>
                                            <th className="px-4 py-3">Action</th>
                                            <th className="px-4 py-3">Buy-in</th>
                                            <th className="px-4 py-3">Max Players</th>
                                            <th className="px-4 py-3">Date & Time</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-700 bg-gray-800">
                                        {!isLoading01 && upcomingTournaments.map((tournament, index) => (
                                            <tr key={index} className="text-gray-400">
                                                <td className="px-4 py-3">
                                                    <p className="font-semibold">{tournament.name}</p>
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    <p className="font-semibold">{tournament.prizeAndDistribution}</p>
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    <div className="flex items-center space-x-4 text-sm">
                                                        <button onClick={(e) => changeUrl('/player/tournaments/view?id=' + tournament.id)}
                                                            className="px-2 py-1 font-semibold leading-tight rounded bg-yellow-700 text-yellow-100">
                                                            View
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    <p className="font-semibold">{tournament.playersArr.length}</p>
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    <p className="font-semibold">{tournament.maxPlayers}</p>
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    <p className="font-semibold">{new Date(tournament.startDateTime).toLocaleDateString()}  {new Date(tournament.startDateTime).toLocaleTimeString()}</p>
                                                </td>
                                            </tr>
                                        ))}
                                        {!isLoading01 && upcomingTournaments.length === 0 && (
                                            <tr className="text-gray-400">
                                                <td colSpan="6" className="text-center px-4 py-3">No Upcoming tournaments</td>
                                            </tr>
                                        )}
                                        {isLoading01 &&
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
                        <div className="px-4 py-4 mb-8 rounded-lg overflow-auto shadow-md bg-gray-800">
                            <div className="w-full overflow-x-auto">
                                <h4 className="mb-4 font-semibold text-gray-300">
                                    These all are live tournaments.
                                </h4>
                                <table className="w-full whitespace-no-wrap">
                                    <thead>
                                        <tr
                                            className="text-xs font-semibold tracking-wide text-left uppercase border-b border-gray-700 text-gray-400 bg-gray-800">
                                            <th className="px-4 py-3">Title</th>
                                            <th className="px-4 py-3">Prize Fund</th>
                                            <th className="px-4 py-3">Action</th>
                                            <th className="px-4 py-3">Buy-in</th>
                                            <th className="px-4 py-3">Max Players</th>
                                            <th className="px-4 py-3">Date & Time</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-700 bg-gray-800">
                                        {!isLoading02 && liveTournaments.map((tournament, index) => (
                                            <tr key={index} className="text-gray-400">
                                                <td className="px-4 py-3">
                                                    <p className="font-semibold">{tournament.name}</p>
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    <p className="font-semibold">{tournament.prizeAndDistribution}</p>
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    <div className="flex align-middle items-center space-x-4 text-sm">
                                                        <button onClick={(e) => changeUrl('/player/tournaments/view?id=' + tournament.id)}
                                                            className="my-auto px-2 py-1 font-semibold leading-tight rounded bg-yellow-700 text-yellow-100">
                                                            View
                                                        </button>
                                                        {tournament.live &&
                                                            <button onClick={(e) => changeUrl('/games/magicmarble?id=' + tournament.id)}
                                                                className="my-auto px-2 py-1 font-semibold leading-tight rounded bg-green-700 text-green-100">
                                                                Play
                                                            </button>
                                                        }
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    <p className="font-semibold">{tournament.playersArr.length}</p>
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    <p className="font-semibold">{tournament.maxPlayers}</p>
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    <p className="font-semibold">{new Date(tournament.startDateTime).toLocaleDateString()}  {new Date(tournament.startDateTime).toLocaleTimeString()}</p>
                                                </td>
                                            </tr>
                                        ))}
                                        {!isLoading02 && liveTournaments.length === 0 && (
                                            <tr className="text-gray-400">
                                                <td colSpan="6" className="text-center px-4 py-3">No Live tournaments</td>
                                            </tr>
                                        )}
                                        {isLoading02 &&
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
                    </>
                    :
                    popupAllowed === 'No' ?
                        <div className="px-4 py-4 mb-8 rounded-lg overflow-auto shadow-md bg-gray-800">
                            <div className="w-full overflow-x-auto mb-4">
                                <h4 className="font-semibold text-gray-300">
                                    Popup is blocked!
                                </h4>
                            </div>
                            <div className="text-sm mb-2 text-gray-400">
                                You have need to do these steps first to see the tournaments.
                            </div>
                            <div className='flex gap-2'>
                                <img className='rounded shadow-md h-64' src="/images/step01.png" alt="Open Window Blocked" />
                                <img className='rounded shadow-md h-64' src="/images/step02.png" alt="Open Window Blocked" />
                            </div>
                        </div>
                        :
                        <Loading />
                }
            </div>
        </main >
    );
}