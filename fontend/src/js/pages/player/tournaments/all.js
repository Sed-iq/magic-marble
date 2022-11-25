/*
    *Player All Tournaments Class*
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



export default class PlayerTournamentsAll {
    constructor() {
        this.urls = ['/player/tournaments/all'];
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
            await this.loadTournaments(user.id, 'upcomingTournaments', 'upcoming');
            await this.loadTournaments(user.id, 'liveTournaments', 'live');
        }
        else {
            ChangeUrl('/login');
        }
    }
    async loadTournaments(userId, divId, status) {
        const response = await fetch(`${API_URL}/getTournamentsForPlayer/?userId=${userId}&status=${status}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (!data.error) {
            const tournaments = data.tournaments;
            const blocksDiv = document.getElementById(divId);
            blocksDiv.innerHTML = '';
            if (tournaments.length > 0) {
                tournaments.forEach(tournament => {
                    blocksDiv.innerHTML += `
                <div class="bg-gray-100 dark:bg-gray-900 my-2 rounded w-64 flex-shrink-0">
                    <div class="relative flex flex-col p-4">
                        <p class="mb-2 text-xl font-medium text-gray-700 dark:text-gray-500">
                            ${tournament.name}
                        </p>
                        <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                            ${tournament.description}
                        </p>
                        <p class="text-xs font-semibold text-gray-500 dark:text-gray-400">
                            <i class="fa-solid fa-users"></i> ${tournament.playersArr.length}/${tournament.maxPlayers}
                        </p>
                        <p class="text-xs mt-1 font-semibold text-gray-500 dark:text-gray-400">
                            <i class="fa-solid ${(status == 'upcmoing' ? "fa-hourglass-start" : "fa-check")}"></i> ${new Date(tournament.startDateTime).toLocaleDateString()} ${new Date(tournament.startDateTime).toLocaleTimeString()}
                        </p>
                        <p class="text-xs mt-1 font-semibold text-red-500 dark:text-red-400">
                            ${DateToAgo(new Date(tournament.startDateTime))}
                        </p>
                        <div class="grid grid-cols-2 gap-2">
                            <button onclick="ChangeUrl('/player/tournaments/view?id=${tournament.id}')"
                                class="px-6 py-2 w-fit mt-4 text-sm font-medium leading-5 text-green-500 dark:text-green-600 transition-colors duration-150 bg-green-100 dark:bg-transparent border border-transparent dark:border-green-600 rounded-lg active:bg-green-600 hover:bg-green-700 hover:text-white dark:hover:bg-green-700 dark:hover:text-white focus:outline-none focus:shadow-outline-green">
                                View
                            </button>
                            ${(status === 'upcoming') ? `<button onclick="JoinTournament('${tournament.id}','/player/tournaments/all')"
                                class="px-6 py-2 mt-4 text-sm font-medium leading-5 text-indigo-500 dark:text-indigo-600 transition-colors duration-150 bg-indigo-100 dark:bg-transparent border border-transparent dark:border-indigo-600 rounded-lg active:bg-indigo-600 hover:bg-indigo-700 hover:text-white dark:hover:bg-indigo-700 dark:hover:text-white focus:outline-none focus:shadow-outline-indigo">
                                Join
                            </button>`: ''}
                        </div>
                    </div>
                </div>
                `;
                });
            } else {
                blocksDiv.innerHTML = `
                <p class="text-center px-2 py-2 text-sm text-gray-700 dark:text-gray-400">
                    No Data To Show
                </p>
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
                        All Tournaments
                    </h2>
                    <div
                        class="flex items-center justify-between p-4 mb-8 text-sm font-semibold text-orange-600 bg-orange-100 rounded-lg shadow-md focus:outline-none focus:shadow-outline-orange">
                        <div class="flex items-center">
                            <span>You can browse any tournament</span>
                        </div>
                    </div>
                    <div class="px-4 py-3 mb-8 bg-white rounded-lg overflow-auto shadow-md dark:bg-gray-800">
                        <div class="w-full overflow-x-auto mb-4">
                            <h4 class="font-semibold text-gray-600 dark:text-gray-300">
                                <i class="fa-solid fa-circle text-green-600"></i> Upcoming Tournaments
                            </h4>
                            <div id="upcomingTournaments" class="flex items-center space-x-6 overflow-x-auto">

                            </div>
                        </div>
                        <div class="w-full overflow-x-auto mb-4">
                            <h4 class="font-semibold text-gray-600 dark:text-gray-300">
                                <i class="fa-solid fa-circle text-red-600"></i> Live Tournaments
                            </h4>
                            <div id="liveTournaments" class="flex items-center space-x-6 overflow-x-auto">

                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div >
    </div >
            `;
    }
}