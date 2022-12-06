import React, { useState, useEffect } from 'react';

import { GetUser, GetATournament, UpdateTournament } from '../../../utils';

export default function View({ socketId, username, isAdmin, changeUrl }) {
    const [tournamentId, setTournamentId] = useState(null);
    const [name, setName] = useState('');
    const [rules, setRules] = useState("Guesser determines the wager amount");
    const [tournamentType, setTournamentType] = useState("Single Elimination");
    const [timePerMove, setTimePerMove] = useState('10');
    const [maxParticipants, setMaxParticipants] = useState('2');
    const [timeBetweenRounds, setTimeBetweenRounds] = useState('10');
    const [dateTime, setDateTime] = useState('');
    const [description, setDescription] = useState('');
    const [prizeAndDistribution, setPrizeAndDistribution] = useState('');
    const [optionalLink, setOptionalLink] = useState('');

    function handleChanges(e) {
        switch (e.target.name) {
            case 'name':
                setName(e.target.value);
                break;
            case 'rules':
                setRules(e.target.value);
                break;
            case 'tournamentType':
                setTournamentType(e.target.value);
                break;
            case 'timePerMove':
                setTimePerMove(e.target.value);
                break;
            case 'maxParticipants':
                setMaxParticipants(e.target.value);
                break;
            case 'timeBetweenRounds':
                setTimeBetweenRounds(e.target.value);
                break;
            case 'dateTime':
                setDateTime(e.target.value);
                break;
            case 'description':
                setDescription(e.target.value);
                break;
            case 'prizeAndDistribution':
                setPrizeAndDistribution(e.target.value);
                break;
            case 'optionalLink':
                setOptionalLink(e.target.value);
                break;
            default:
                break;
        }
    }

    async function updateTournament(e) {
        e.preventDefault();
        const result = await UpdateTournament(socketId, tournamentId, name, description, rules, tournamentType, prizeAndDistribution, timePerMove, timeBetweenRounds, maxParticipants, dateTime, optionalLink);
        if (result !== null) {
            if (result) {
                changeUrl('/admin/tournaments/upcoming');
            }
        }
        else {
            changeUrl('/login');
        }
    }

    async function loadTournament(tournamentId) {
        const result = await GetATournament(socketId, tournamentId);
        if (result) {
            const tournament = result;
            setName(tournament.name.toString());
            setRules(tournament.rules.toString());
            setTournamentType(tournament.tournamentType.toString());
            setTimePerMove(tournament.timePerMove.toString());
            setMaxParticipants(tournament.maxPlayers.toString());
            setTimeBetweenRounds(tournament.timeBetweenRounds.toString());
            setDescription(tournament.description.toString());
            setPrizeAndDistribution(tournament.prizeAndDistribution.toString());
            setOptionalLink(tournament.optionalLink.toString());
            let date = new Date(tournament.startDateTime);
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let hour = date.getHours();
            let minute = date.getMinutes();
            let second = date.getSeconds();
            if (month < 10) {
                month = '0' + month;
            }
            if (day < 10) {
                day = '0' + day;
            }
            if (hour < 10) {
                hour = '0' + hour;
            }
            if (minute < 10) {
                minute = '0' + minute;
            }
            if (second < 10) {
                second = '0' + second;
            }
            let lastDateTime = year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second;
            setDateTime(lastDateTime);
        }
    }

    useEffect(() => {
        const asyncFunc = async () => {
            if (socketId) {
                const user = await GetUser(socketId);
                if (!user || !user.isAdmin) {
                    changeUrl('/login');
                }
                else {
                    if (window.location.href.split('?')[1]) {
                        let tournamentId = window.location.href.split('?')[1].split('=')[1];
                        if (tournamentId) {
                            setTournamentId(tournamentId);
                            loadTournament(tournamentId);
                        }
                        else {
                            if (isAdmin) {
                                changeUrl('/admin/dashboard');
                            }
                            else {
                                changeUrl('/player/dashboard');
                            }
                        }
                    }
                    else {
                        if (isAdmin) {
                            changeUrl('/admin/dashboard');
                        }
                        else {
                            changeUrl('/player/dashboard');
                        }
                    }
                }
            }
        }
        asyncFunc();
    }, [socketId]);

    return (
        <main className="h-full overflow-y-auto">
            <div className="container px-6 mx-auto grid">
                <h2 className="my-6 text-2xl font-semibold text-gray-200">
                    Edit Tournament
                </h2>
                <div
                    className="flex items-center justify-between p-4 mb-8 text-sm font-semibold text-green-600 bg-green-100 rounded-lg shadow-md focus:outline-none focus:shadow-outline-green">
                    <div className="flex items-center">
                        <span>You can not update name of tournament.</span>
                    </div>
                </div>
                <div className="px-4 py-4 mb-8 rounded-lg shadow-md bg-gray-800">
                    <h4 className="mb-4 font-semibold text-gray-300">
                        Edit details of Tournament.
                    </h4>
                    <form method="POST" onSubmit={updateTournament}>
                        <div className="block md:grid md:grid-cols-2 md:gap-4">
                            <label className="block text-sm">
                                <span className="text-gray-400">Name</span>
                                <input name="name" type="text" placeholder="Tournament Name"
                                    className="block p-2 rounded w-full mt-1 text-sm text-gray-300 border-gray-600 bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                                    value={name} disabled={true} />
                                <p className="text-gray-400">Pick a very safe name for the tournament.</p>
                            </label>
                            <label className="block text-sm">
                                <span className="text-gray-400">Game Rules</span>
                                <select required name="rules"
                                    className="block p-2 rounded w-full mt-1 text-sm text-gray-300 border-gray-600 bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-select"
                                    value={rules} onChange={handleChanges}>
                                    <option value="Guesser determines the wager amount">Guesser determines the wager amount</option>
                                    <option value="Wager amount = average bet of both players">Wager amount = average bet of both
                                        players</option>
                                </select>
                            </label>
                        </div>
                        <label className="block mt-4 text-sm">
                            <span className="text-gray-400">Tournament Type</span>
                            <select required name="tournamentType"
                                className="block p-2 rounded w-full mt-1 text-sm text-gray-300 border-gray-600 bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-select"
                                value={tournamentType} onChange={handleChanges}>
                                <option value="Single Elimination">Single Elimination</option>
                                <option value="Swiss">Swiss</option>
                            </select>
                            <p className="text-gray-400">Tournament Type means how a player will be selected or unselected for a Round?</p>
                        </label>
                        <div className="block md:grid md:grid-cols-2 md:gap-4">
                            <label className="block mt-4 text-sm">
                                <span className="text-gray-400">Time per move</span>
                                <select required name="timePerMove"
                                    className="block p-2 rounded w-full mt-1 text-sm text-gray-300 border-gray-600 bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-select"
                                    value={timePerMove} onChange={handleChanges}>
                                    <option value="10">10 seconds</option>
                                    <option value="15">15 seconds</option>
                                    <option value="20">20 seconds</option>
                                </select>
                            </label>
                            <label className="block mt-4 text-sm">
                                <span className="text-gray-400">Max number of participants</span>
                                <select required name="maxParticipants"
                                    className="block p-2 rounded w-full mt-1 text-sm text-gray-300 border-gray-600 bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-select"
                                    value={maxParticipants} onChange={handleChanges}>
                                    <option value="2">2</option>
                                    <option value="4">4</option>
                                    <option value="8">8</option>
                                    <option value="16">16</option>
                                    <option value="32">32</option>
                                    <option value="64">64</option>
                                    <option value="128">128</option>
                                    <option value="256">256</option>
                                    <option value="512">512</option>
                                    <option value="1028">1028</option>
                                </select>
                                <p className="text-gray-400">When max number reached then nobody can join the
                                    tournament.</p>
                            </label>
                        </div>
                        <div className="block md:grid md:grid-cols-2 md:gap-4">
                            <label className="block mt-4 text-sm">
                                <span className="text-gray-400">Time between rounds</span>
                                <select required name="timeBetweenRounds"
                                    className="block p-2 rounded w-full mt-1 text-sm text-gray-300 border-gray-600 bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-select"
                                    value={timeBetweenRounds} onChange={handleChanges}>
                                    <option value="10">10 seconds</option>
                                    <option value="15">15 seconds</option>
                                    <option value="20">20 seconds</option>
                                </select>
                            </label>
                            <label className="block mt-4 text-sm">
                                <span className="text-gray-400">Date & Time</span>
                                <input required name="dateTime" type="datetime-local"
                                    className="block p-2 rounded w-full mt-1 text-sm text-gray-300 border-gray-600 bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                                    value={dateTime} onChange={handleChanges} />
                                <p className="text-gray-400">This date and time is for starting tournament but if at
                                    that
                                    time not max number reached then it will not start and wait for reached max players.</p>
                            </label>
                        </div>
                        <div className="block md:grid md:grid-cols-2 md:gap-4">
                            <label className="block mt-4 text-sm">
                                <span className="text-gray-400">Description</span>
                                <textarea required name="description" rows="2" placeholder="Tournament Description"
                                    className="block p-2 rounded w-full mt-1 text-sm text-gray-300 border-gray-600 bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-textarea"
                                    value={description} onChange={handleChanges}></textarea>
                                <p className="text-gray-400">Try to keep short details about tournament in it.</p>
                            </label>
                            <label className="block mt-4 text-sm">
                                <span className="text-gray-400">Prize funds & Distribution</span>
                                <textarea required name="prizeAndDistribution" type="text" placeholder=""
                                    className="block p-2 rounded w-full mt-1 text-sm text-gray-300 border-gray-600 bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                                    value={prizeAndDistribution} onChange={handleChanges} ></textarea>
                                <p className="text-gray-400">Choose a monetary prize fund or any other price you would
                                    like to award the winner + outline how the prizes will be distributed.</p>
                            </label>
                        </div>
                        <label className="block mt-4 text-sm">
                            <span className="text-gray-400">Any link want to add (optional)</span>
                            <input name="link" type="url" placeholder="https://www.discord.com"
                                className="block p-2 rounded w-full mt-1 text-sm text-gray-300 border-gray-600 bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                                value={optionalLink} onChange={handleChanges} />
                        </label>
                        <div className="flex items-center justify-end mt-4">
                            <button type="submit"
                                className="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-green-600 border border-transparent rounded-lg active:bg-green-600 hover:bg-green-700 focus:outline-none focus:shadow-outline-green">
                                Update Tournament
                            </button>
                            <button type="button" className="ml-2 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-gray-600 border border-transparent rounded-lg active:bg-gray-600 hover:bg-gray-700 focus:outline-none focus:shadow-outline-gray">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}