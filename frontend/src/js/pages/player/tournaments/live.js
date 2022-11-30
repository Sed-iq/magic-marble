/*
    *Player Live Tournaments Class*
    Each page class has three functions:
    - constructor (optional): contains the page's data
    - load (optional): loads the page
    - render: renders the page,
    One variable:
    - urls: an array of urls that the page will be rendered on (you can add more than one urls)

    We can own functions and variables in the class, and use them in the other functions.
*/

import Sidebar from "../../../components/player/sidebar.js";
import Navbar from "../../../components/navbar.js";

export default class PlayerTournamentsLive {
    constructor() {
        this.urls = ['/player/tournaments/live'];
        this.sidebar = new Sidebar('Tournaments');
        this.navbar = new Navbar();
    }
    async onLoad() {
        this.navbar.onLoad();
        this.sidebar.onLoad();
        const user = await GetUser();
        if (user && !user.isAdmin) {
            document.getElementById('username1').innerHTML = user.username;
            document.getElementById('username2').innerHTML = user.username;
            await this.loadTournaments(user.id, 'tournamentsTable');
        }
        else {
            ChangeUrl('/login');
        }
    }
    async loadTournaments(userId, tableId) {
        const response = await fetch(`${API_URL}/getPlayerTournaments/?userId=${userId}&status=live`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        if (!data.error) {
            const tournaments = data.tournaments;
            const tournamentsTable = document.getElementById(tableId);
            tournamentsTable.innerHTML = '';
            if (tournaments.length > 0) {
                tournaments.forEach(tournament => {
                    tournamentsTable.innerHTML += `
                    <tr class="text-gray-700 dark:text-gray-400">
                        <td class="px-4 py-3">
                            <div class="flex items-center text-sm">
                                <div>
                                    <p class="font-semibold">${tournament.name}</p>
                                </div>
                            </div>
                        </td>
                        <td class="px-4 py-3 text-sm">
                            <p class="font-semibold">${tournament.playersArr.length}</p>
                        </td>
                        <td class="px-4 py-3 text-sm">
                            <p class="font-semibold">${tournament.maxPlayers}</p>
                        </td>
                        <td class="px-4 py-3 text-sm">
                            <p class="font-semibold">${new Date(tournament.startDateTime).toLocaleDateString()}</p>
                        </td>
                        <td class="px-4 py-3 text-sm">
                            <p class="font-semibold">${new Date(tournament.startDateTime).toLocaleTimeString()}</p>
                        </td>
                        <td class="px-4 py-3 text-sm">
                            <div class="flex items-center space-x-4 text-sm">
                                <button onclick="ChangeUrl('/player/tournaments/view?id=${tournament.id}')"
                                    class="px-2 py-1 font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded dark:bg-yellow-700 dark:text-yellow-100">
                                    View
                                </button>
                                <button onclick="ChangeUrl('/games/marblesgame?id=${tournament.id}')"
                                    class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded dark:bg-green-700 dark:text-green-100">
                                    Play
                                </button>
                            </div>
                        </td>
                    </tr>
                    `;
                });
            } else {
                tournamentsTable.innerHTML = `
                    <tr class="text-gray-700 dark:text-gray-400">
                        <td colspan="6" class="text-center px-4 py-3">No Live tournaments</td>
                    </tr>
                `;
            }
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
                            Live Tournaments
                        </h2>
                        <div
                            class="flex items-center justify-between p-4 mb-8 text-sm font-semibold text-green-600 bg-green-100 rounded-lg shadow-md focus:outline-none focus:shadow-outline-green">
                            <div class="flex items-center">
                                <span>Your joined tournaments.</span>
                            </div>
                        </div>
                        <div class="px-4 py-3 mb-8 bg-white rounded-lg overflow-auto shadow-md dark:bg-gray-800">
                            <div class="w-full overflow-x-auto">
                                <h4 class="mb-4 font-semibold text-gray-600 dark:text-gray-300">
                                    These all are tournaments are live now.
                                </h4>
                                <table class="w-full whitespace-no-wrap">
                                    <thead>
                                        <tr
                                            class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                            <th class="px-4 py-3">Name</th>
                                            <th class="px-4 py-3">Current Players</th>
                                            <th class="px-4 py-3">Max Players</th>
                                            <th class="px-4 py-3">Date</th>
                                            <th class="px-4 py-3">Time</th>
                                            <th class="px-4 py-3">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tournamentsTable"
                                        class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div >
        </div >
        `;
    }
}