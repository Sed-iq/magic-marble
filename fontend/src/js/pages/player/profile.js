/*
    *Player Profile Class*
    Each page class has three functions:
    - constructor (optional): contains the page's data
    - load (optional): loads the page
    - render: renders the page,
    One variable:
    - urls: an array of urls that the page will be rendered on (you can add more than one urls)

    We can own functions and variables in the class, and use them in the other functions.
*/

import Sidebar from "../../components/player/sidebar.js";
import Navbar from "../../components/navbar.js";

export default class PlayerProfile {
    constructor() {
        this.urls = ['/player/profile'];
        this.sidebar = new Sidebar('Profile');
        this.navbar = new Navbar();
    }
    async onLoad() {
        this.navbar.onLoad();
        this.sidebar.onLoad();
        const user = await GetUser();
        if (user && !user.isAdmin) {
            document.getElementById('username1').innerHTML = user.username;
            document.getElementById('username2').innerHTML = user.username;
            // input username set value
            document.getElementById('username').value = user.username;
        }
        else{
            ChangeUrl('/login');
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
                            Profile
                        </h2>
                        <div class="px-4 py-3 mb-4 bg-red-300 rounded-lg shadow-md dark:bg-red-500">
                            <p class="text-sm text-gray-700 dark:text-white">
                                Do not share your personal information with anyone.
                            </p>
                        </div>
                        <div class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                            <label class="block text-sm">
                                <span class="text-gray-700 dark:text-gray-400">Username</span>
                                <input id="username"
                                    class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                    value="someone" disabled />
                            </label>
                            <label class="block mt-2 text-sm">
                                <span class="text-gray-700 dark:text-gray-400">Password</span>
                                <input
                                    class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                    value="**************" type="password" disabled />
                            </label>

                            <div class="mt-4 text-sm">
                                <span class="text-gray-700 dark:text-gray-400">
                                    Role
                                </span>
                                <div class="mt-2">
                                    <label class="inline-flex items-center text-gray-600 dark:text-gray-400">
                                        <input type="radio"
                                            class="text-purple-600 form-radio focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                                            name="accountType" value="personal" disabled />
                                        <span class="ml-2">Admin</span>
                                    </label>
                                    <label class="inline-flex items-center ml-6 text-gray-600 dark:text-gray-400">
                                        <input type="radio"
                                            class="text-purple-600 form-radio focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                                            name="accountType" value="busines" checked disabled />
                                        <span class="ml-2">Player</span>
                                    </label>
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