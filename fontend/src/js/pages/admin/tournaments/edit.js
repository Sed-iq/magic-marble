/*
    *Admin Edit Tournament Class*
    Each page class has three functions:
    - constructor (optional): contains the page's data
    - load (optional): loads the page
    - render: renders the page,
    One variable:
    - urls: an array of urls that the page will be rendered on (you can add more than one urls)

    We can own functions and variables in the class, and use them in the other functions.
*/

import Sidebar from "../../../components/admin/sidebar.js";
import Navbar from "../../../components/navbar.js";

export default class AdminTournamentsEdit {
    constructor() {
        this.urls = ['/admin/tournaments/edit'];
        this.sidebar = new Sidebar('Tournaments');
        this.navbar = new Navbar();
    }
    async onLoad() {
        this.navbar.onLoad();
        this.sidebar.onLoad();
        const user = await GetUser();
        if (user && user.isAdmin) {
            document.getElementById("username1").innerHTML = user.username;
            document.getElementById("username2").innerHTML = user.username;
            if (window.location.href.split('?')[1]) {
                let tournamentId = window.location.href.split('?')[1].split('=')[1];
                if (tournamentId) {
                    await this.loadTournament(tournamentId);
                    document.getElementById('updateTournamentForm').addEventListener('submit', async (e) => {
                        const name = document.getElementById('name').value;
                        const rules = document.getElementById('rules').value;
                        const tournamentType = document.getElementById('tournamentType').value;
                        const description = document.getElementById('description').value;
                        const dateTime = document.getElementById('dateTime').value;
                        const prizeAndDistribution = document.getElementById('prizeAndDistribution').value;
                        const timePerMove = document.getElementById('timePerMove').value;
                        const timeBetweenRounds = document.getElementById('timeBetweenRounds').value;
                        const maxParticipants = document.getElementById('maxParticipants').value;
                        const optionalLink = document.getElementById('link').value;
                        await UpdateTournament(user.id, tournamentId, name, description, rules, tournamentType, prizeAndDistribution, timePerMove, timeBetweenRounds, maxParticipants, dateTime, optionalLink);
                    });
                    document.getElementById("cancelBtn").addEventListener("click", () => {
                        ChangeUrl('/admin/tournaments/edit?tournamentId=' + tournamentId);
                    });
                }
                else {
                    ChangeUrl('/admin/dashboard');
                }
            }
            else {
                ChangeUrl('/admin/dashboard');
            }
        }
        else {
            ChangeUrl('/login');
        }
    }
    async loadTournament(tournamentId) {
        const response = await fetch(`${API_URL}/getTournament/?tournamentId=${tournamentId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        if (!data.error) {
            const tournament = data.tournament;
            document.getElementById('name').value = tournament.name;
            document.getElementById('description').innerHTML = tournament.description;
            document.getElementById('rules').value = tournament.rules;
            document.getElementById('tournamentType').value = tournament.tournamentType;
            document.getElementById('timePerMove').value = tournament.timePerMove;
            document.getElementById('timeBetweenRounds').value = tournament.timeBetweenRounds;
            document.getElementById('maxParticipants').value = tournament.maxPlayers;
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
            let dateTime = year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second;
            document.getElementById('dateTime').value = dateTime;
            document.getElementById('prizeAndDistribution').value = tournament.prizeAndDistribution;
            document.getElementById('link').innerHTML = tournament.optionalLink;
        }
        else {
            ChangeUrl('/admin/dashboard');
        }
    }
    onRender() {
        return `
        <div class="flex h-screen bg-gray-50 dark:bg-gray-900" :class="{ 'overflow-hidden': isSideMenuOpen }">
        ${this.sidebar.onRender()}
        <div class="flex flex-col flex-1 w-full">
            ${this.navbar.onRender()}
            <main class="h-full overflow-y-auto">
                <div class="container px-6 mx-auto grid">
                    <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                        Edit Tournament
                    </h2>
                    <div
                        class="flex items-center justify-between p-4 mb-8 text-sm font-semibold text-green-600 bg-green-100 rounded-lg shadow-md focus:outline-none focus:shadow-outline-green">
                        <div class="flex items-center">
                            <span>You can not update name of tournament.</span>
                        </div>
                    </div>
                    <div class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                        <h4 class="mb-4 font-semibold text-gray-600 dark:text-gray-300">
                            Edit details of Tournament.
                        </h4>
                        <form action="new.cgi" method="POST" id="updateTournamentForm" onsubmit="return false;">
                            <div class="block md:grid md:grid-cols-2 md:gap-4">
                                <label class="block text-sm">
                                    <span class="text-gray-700 dark:text-gray-400">Name</span>
                                    <input disabled id="name" name="name" type="text" placeholder="Tournament Name"
                                        class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input" />
                                </label>
                                <label class="block text-sm">
                                    <span class="text-gray-700 dark:text-gray-400">Game Rules</span>
                                    <select required id="rules" name="gameRules"
                                        class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-select">
                                        <option value="Guesser determines the wager amount">Guesser determines the wager amount</option>
                                        <option value="Wager amount = average bet of both players">Wager amount = average bet of both
                                            players</option>
                                    </select>
                                </label>
                            </div>
                            <label class="block mt-4 text-sm">
                                    <span class="text-gray-700 dark:text-gray-400">Tournament Type</span>
                                    <select required id="tournamentType" name="tournamentType"
                                        class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-select">
                                        <option value="Single Elimination">Single Elimination</option>
                                        <option value="Swiss">Swiss</option>
                                    </select>
                                    <p class="text-gray-700 dark:text-gray-400">Tournament Type means how a player will be selected or unselected for a Round?</p>
                                </label>
                            <div class="block md:grid md:grid-cols-2 md:gap-4">
                                <label class="block mt-4 text-sm">
                                    <span class="text-gray-700 dark:text-gray-400">Time per move</span>
                                    <select required id="timePerMove" name="timePerMove"
                                        class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-select">
                                        <option value="10">10 seconds</option>
                                        <option value="15">15 seconds</option>
                                        <option value="20">20 seconds</option>
                                    </select>
                                </label>
                                <label class="block mt-4 text-sm">
                                    <span class="text-gray-700 dark:text-gray-400">Max number of participants</span>
                                    <select required id="maxParticipants" name="maxParticipants"
                                        class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-select">
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
                                    <p class="text-gray-700 dark:text-gray-400">When max number reached then nobody can join the
                                        tournament.</p>
                                </label>
                            </div>
                            <div class="block md:grid md:grid-cols-2 md:gap-4">
                                <label class="block mt-4 text-sm">
                                    <span class="text-gray-700 dark:text-gray-400">Time between rounds</span>
                                    <select required id="timeBetweenRounds" name="timeBetweenRounds"
                                        class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-select">
                                        <option value="10">10 seconds</option>
                                        <option value="15">15 seconds</option>
                                        <option value="20">20 seconds</option>
                                    </select>
                                </label>
                                <label class="block mt-4 text-sm">
                                    <span class="text-gray-700 dark:text-gray-400">Date & Time</span>
                                    <input required id="dateTime" name="date" type="datetime-local"
                                        class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input" />
                                    <p class="text-gray-700 dark:text-gray-400">This date and time is for starting tournament but if at
                                        that
                                        time not max number reached then it will not start and wait for reached max players.</p>
                                </label>
                            </div>
                            <div class="block md:grid md:grid-cols-2 md:gap-4">
                                <label class="block mt-4 text-sm">
                                    <span class="text-gray-700 dark:text-gray-400">Description</span>
                                    <textarea required id="description" name="description" rows="3" placeholder="Tournament Description"
                                        class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-textarea"></textarea>
                                    <p class="text-gray-700 dark:text-gray-400">Try to keep short details about tournament in it.</p>
                                </label>
                                <label class="block mt-4 text-sm">
                                    <span class="text-gray-700 dark:text-gray-400">Prize funds & Distribution</span>
                                    <input required id="prizeAndDistribution" name="prize" type="text" placeholder=""
                                        class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input" />
                                    <p class="text-gray-700 dark:text-gray-400">Choose a monetary prize fund or any other price you would
                                        like to award the winner + outline how the prizes will be distributed.</p>
                                </label>
                            </div>
                            <label class="block mt-4 text-sm">
                                <span class="text-gray-700 dark:text-gray-400">Any link want to add (optional)</span>
                                <input id="link" name="link" type="url" placeholder="https://www.discord.com"
                                    class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input" />
                            </label>
                            <div class="flex items-center justify-end mt-4">
                                <button type="submit"
                                    class="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-green-600 border border-transparent rounded-lg active:bg-green-600 hover:bg-green-700 focus:outline-none focus:shadow-outline-green">
                                    Update Tournament
                                </button>
                                <button type="button" id="cancelBtn"
                                    class="ml-2 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-gray-600 border border-transparent rounded-lg active:bg-gray-600 hover:bg-gray-700 focus:outline-none focus:shadow-outline-gray">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div >
      </div >
            `;
    }
}