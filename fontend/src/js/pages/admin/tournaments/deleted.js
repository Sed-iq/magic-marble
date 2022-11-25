/*
    *Admin Deleted Tournaments Class*
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

export default class AdminTournamentsDeleted {
    constructor() {
        this.urls = ['/admin/tournaments/deleted'];
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
            await this.loadTournaments('deleted', 'tournamentsTable');
        }
        else {
            ChangeUrl('/login');
        }
    }
    async loadTournaments(status, tableId) {
        const response = await fetch(`${API_URL}/getAllTournaments/?status=${status}`, {
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
                            <p class="font-semibold">${new Date(tournament.createDateTime).toLocaleDateString()} - ${new Date(tournament.createDateTime).toLocaleTimeString()}</p>
                        </td>
                        <td class="px-4 py-3 text-sm">
                            <p class="font-semibold">${new Date(tournament.startDateTime).toLocaleDateString()} - ${new Date(tournament.startDateTime).toLocaleTimeString()}</p>
                        </td>
                        <td class="px-4 py-3 text-sm">
                            <p class="font-semibold">${new Date(tournament.deleteDateTime).toLocaleDateString()} - ${new Date(tournament.deleteDateTime).toLocaleTimeString()}</p>
                        </td>
                    </tr>
                    `;
                });
            } else {
                tournamentsTable.innerHTML = `
                    <tr class="text-gray-700 dark:text-gray-400">
                        <td colspan="6" class="text-center px-4 py-3">No deleted tournaments</td>
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
                            Deleted Tournaments
                        </h2>
                        <div
                            class="flex items-center justify-between p-4 mb-8 text-sm font-semibold text-gray-800 bg-gray-200 rounded-lg shadow-md focus:outline-none focus:shadow-outline-gray">
                            <div class="flex items-center">
                                <span>Now players are not able to browse</span>
                            </div>
                        </div>
                        <div class="px-4 py-3 mb-8 bg-white rounded-lg overflow-auto shadow-md dark:bg-gray-800">
                            <div class="w-full overflow-x-auto">
                                <h4 class="mb-4 font-semibold text-gray-600 dark:text-gray-300">
                                    These all are tournaments deleted by Admin.
                                </h4>
                                <table class="w-full whitespace-no-wrap">
                                    <thead>
                                        <tr
                                            class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                            <th class="px-4 py-3">Name</th>
                                            <th class="px-4 py-3">Current Players</th>
                                            <th class="px-4 py-3">Max Players</th>
                                            <th class="px-4 py-3">Create At</th>
                                            <th class="px-4 py-3">Start At</th>
                                            <th class="px-4 py-3">Delete At</th>
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