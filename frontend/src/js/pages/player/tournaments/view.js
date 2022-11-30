/*
    *Player View Tournament Class*
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

export default class PlayerTournamentsView {
    constructor() {
        this.urls = ['/player/tournaments/view'];
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
            if (window.location.href.split('?')[1]) {
                let tournamentId = window.location.href.split('?')[1].split('=')[1];
                if (tournamentId) {
                    await this.loadTournament(tournamentId);
                }
                else {
                    ChangeUrl('/player/dashboard');
                }
            }
            else {
                ChangeUrl('/player/dashboard');
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
            document.getElementById('name').innerHTML = tournament.name;
            document.getElementById('description').innerHTML = tournament.description;
            document.getElementById('rules').innerHTML = tournament.rules;
            document.getElementById('currentPlayers').innerHTML = tournament.playersArr.length;
            document.getElementById('maxPlayers').innerHTML = tournament.maxPlayers;
            document.getElementById('create').innerHTML = `${new Date(tournament.createDateTime).toLocaleDateString()} - ${new Date(tournament.createDateTime).toLocaleTimeString()}`;
            document.getElementById('start').innerHTML = `${new Date(tournament.startDateTime).toLocaleDateString()} - ${new Date(tournament.startDateTime).toLocaleTimeString()}`;
            document.getElementById('prizeDetails').innerHTML = tournament.prizeAndDistribution;

            if (tournament.optionalLink) {
                const link = document.getElementById('link');
                link.innerHTML = tournament.optionalLink;
                link.setAttribute('href', tournament.optionalLink);
            }
            else {
                document.getElementById('link').innerHTML = 'No Link';
                link.setAttribute('href', '');
            }
        }
        else {
            ChangeUrl('/player/dashboard');
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
                            View Tournament
                        </h2>
                        <div class="px-4 py-3 mb-8 bg-white rounded-lg overflow-auto shadow-md dark:bg-gray-800">
                            <div class="w-full overflow-x-auto">
                                <h4 class="mb-4 font-semibold text-gray-600 dark:text-gray-300">
                                    These all are the Tournament details.
                                </h4>
                                <div class="grid grid-cols-1 gap-6 mt-4">
                                    <div class="flex flex-col p-4 bg-white rounded-lg dark:bg-gray-800">
                                        <div class="grid md:grid-cols-2 justify-between mt-4">
                                            <span class="text-sm font-light text-gray-600 dark:text-gray-400">
                                                Name
                                            </span>
                                            <span id="name"
                                                class="px-2 py-1 font-semibold text-gray-500 bg-gray-200 rounded shadow dark:bg-gray-600 dark:text-gray-200">
                                                Lorem ipsum dolor sit amet
                                            </span>
                                        </div>
                                        <div class="grid md:grid-cols-2 justify-between mt-4">
                                            <span class="text-sm font-light text-gray-600 dark:text-gray-400">
                                                Rules
                                            </span>
                                            <span id="rules"
                                                class="px-2 py-1 font-semibold text-gray-500 bg-gray-200 rounded shadow dark:bg-gray-600 dark:text-gray-200">
                                                Lorem ipsum dolor sit amet,
                                            </span>
                                        </div>
                                        <div class="grid md:grid-cols-2 justify-between mt-4">
                                            <span class="text-sm font-light text-gray-600 dark:text-gray-400">
                                                Description
                                            </span>
                                            <span id="description"
                                                class="px-2 py-1 font-semibold text-gray-500 bg-gray-200 rounded shadow dark:bg-gray-600 dark:text-gray-200">
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate quia
                                                consequuntur quos ipsum!
                                                Nesciunt accusamus quidem hic, fugiat quasi facere commodi inventore quo,
                                                recusandae, laudantium
                                                assumenda perferendis dolorum optio. Nobis.
                                            </span>
                                        </div>

                                        <div class="grid md:grid-cols-2 justify-between mt-4">
                                            <span class="text-sm font-light text-gray-600 dark:text-gray-400">
                                                Current Players
                                            </span>
                                            <span
                                                class="px-2 py-1 font-semibold text-gray-500 bg-gray-200 rounded shadow dark:bg-gray-600 dark:text-gray-200">
                                                <li class="fas fa-users mr-2"></li><span id="currentPlayers">20</span>
                                            </span>
                                        </div>
                                        <div class="grid md:grid-cols-2 justify-between mt-4">
                                            <span class="text-sm font-light text-gray-600 dark:text-gray-400">
                                                Max Players
                                            </span>
                                            <span
                                                class="px-2 py-1 font-semibold text-gray-500 bg-gray-200 rounded shadow dark:bg-gray-600 dark:text-gray-200">
                                                <i class="fa-solid fa-bullseye mr-2"></i><span id="maxPlayers">32</span>
                                            </span>
                                        </div>
                                        <div class="grid md:grid-cols-2 justify-between mt-4">
                                            <span class="text-sm font-light text-gray-600 dark:text-gray-400">
                                                Prize and distribution
                                            </span>
                                            <span id="prizeDetails"
                                                class="px-2 py-1 font-semibold text-gray-500 bg-gray-200 rounded shadow dark:bg-gray-600 dark:text-gray-200">
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate quia
                                                consequuntur quos ipsum!
                                                Nesciunt accusamus quidem hic, fugiat quasi facere commodi inventore quo,
                                                recusandae, laudantium
                                                assumenda perferendis dolorum optio. Nobis.
                                            </span>
                                        </div>
                                        <div class="grid md:grid-cols-2 justify-between mt-4">
                                            <span class="text-sm font-light text-gray-600 dark:text-gray-400">
                                                Create At
                                            </span>
                                            <span
                                                class="px-2 py-1 font-semibold text-gray-500 bg-gray-200 rounded shadow dark:bg-gray-600 dark:text-gray-200">
                                                <li class="fas fa-clock mr-2"></li><span id="create">2020/10/20 - 10:00
                                                    PM</span>
                                            </span>
                                        </div>
                                        <div class="grid md:grid-cols-2 justify-between mt-4">
                                            <span class="text-sm font-light text-gray-600 dark:text-gray-400">
                                                Start At
                                            </span>
                                            <span
                                                class="px-2 py-1 font-semibold text-gray-500 bg-gray-200 rounded shadow dark:bg-gray-600 dark:text-gray-200">
                                                <li class="fas fa-hourglass-start mr-2"></li><span id="start">2020/10/20 -
                                                    10:00 PM</span>
                                            </span>
                                        </div>
                                        <a id="link" class="mt-2 text-blue-700 dark:text-blue-600"
                                            href="www.google.com">www.google.com</a>
                                    </div>
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