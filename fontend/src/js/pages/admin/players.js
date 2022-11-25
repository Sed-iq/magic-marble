/*
    *Admin Show Players Class*
    Each page class has three functions:
    - constructor (optional): contains the page's data
    - load (optional): loads the page
    - render: renders the page,
    One variable:
    - urls: an array of urls that the page will be rendered on (you can add more than one urls)

    We can own functions and variables in the class, and use them in the other functions.
*/


import Sidebar from "../../components/admin/sidebar.js";
import Navbar from "../../components/navbar.js";

export default class AdminPlayers {
    constructor() {
        this.urls = ['/admin/players'];
        this.sidebar = new Sidebar('Players');
        this.navbar = new Navbar();
    }
    async onLoad() {
        this.navbar.onLoad();
        this.sidebar.onLoad();
        const user = await GetUser();
        if (user && user.isAdmin) {
            document.getElementById('username1').innerHTML = user.username;
            document.getElementById('username2').innerHTML = user.username;
            const response = await fetch(`${API_URL}/getAllPlayers/?userId=${user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            if (!data.error) {
                const players = data.players;
                const playersTable = document.getElementById('playersTable');
                playersTable.innerHTML = '';
                if (players.length > 0) {
                    players.forEach(player => {
                        playersTable.innerHTML += `
                        <tr class="text-gray-700 dark:text-gray-400">
                            <td class="px-4 py-3">
                            ${player.username}
                            </td>
                            <td class="px-4 py-3 text-sm">
                            ${player.total}
                            </td>
                            <td class="px-4 py-3 text-sm">
                                ${player.wins}
                            </td>
                            <td class="px-4 py-3 text-sm">
                                ${player.loses}
                            </td>
                            <td class="px-4 py-3 text-xs">
                            ${player.status === 'active' ?
                                '<span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm dark:bg-green-700 dark:text-green-100">' : '<span class="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm dark:bg-red-700 dark:text-red-100">'}
                                    ${player.status}
                                </span>                    
                            </td>
                            <td class="px-4 py-3 text-sm">
                            ${new Date(player.createDateTime).toLocaleDateString()} - ${new Date(player.createDateTime).toLocaleTimeString()}
                            </td>
                        </tr>`;
                    });
                } else {
                    playersTable.innerHTML += `
                    <tr class="text-gray-700 dark:text-gray-400">
                        <td colspan="6" class="text-center px-4 py-3">
                            No players found
                        </td>
                    </tr>`;
                }
    
            }
        }
        else {
            ChnageUrl('/login');
        }
    }
    onRender() {
        return `
        <div class="flex h-screen bg-gray-50 dark:bg-gray-900" :class="{ 'overflow-hidden': isSideMenuOpen }">
            ${this.sidebar.onRender()}
            <div class="flex flex-col flex-1 w-full">
                ${this.navbar.onRender()}
            </header >
            <main class="h-full overflow-y-auto">
                <div class="container px-6 mx-auto grid">
                    <h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                        Players
                    </h2>
                    <div class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                            All players that have created their accounts.
                        </p>
                    </div>
                    <div class="w-full mb-8 overflow-hidden rounded-lg shadow-xs">
                        <div class="w-full overflow-x-auto">
                            <table class="w-full whitespace-no-wrap">
                                <thead>
                                    <tr
                                        class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                        <th class="px-4 py-3">Username</th>
                                        <th class="px-4 py-3">Total Tournaments</th>
                                        <th class="px-4 py-3">Won Tournaments</th>
                                        <th class="px-4 py-3">Loses Tournaments</th>
                                        <th class="px-4 py-3">Status</th>
                                        <th class="px-4 py-3">Date & Time</th>
                                    </tr>
                                </thead>
                                <tbody id="playersTable" class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
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