/*
    *Admin Dashboard Class*
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

export default class AdminDashboard {
    constructor() {
        this.urls = ['/admin/dashboard'];
        this.sidebar = new Sidebar('Dashboard');
        this.navbar = new Navbar();
    }
    async onLoad() {
        this.navbar.onLoad();
        this.sidebar.onLoad();
        const user = await GetUser();
        if (user && user.isAdmin) {
            document.getElementById('username1').innerHTML = user.username;
            document.getElementById('username2').innerHTML = user.username;
            const response = await fetch(`${API_URL}/getAdminDashboardData/?userId=${user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (!data.error) {
                document.getElementById('totalPlayers').innerHTML = data.totalPlayers;
                document.getElementById('upcomingTournaments').innerHTML = data.upcomingTournaments;
                document.getElementById('liveTournaments').innerHTML = data.liveTournaments;
                document.getElementById('finishedTournaments').innerHTML = data.finishedTournaments;
            }
        }
        else {
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
                            Dashboard
                        </h2>
                        <a class="cusor-pointer flex items-center justify-between p-4 mb-8 text-sm font-semibold text-purple-100 bg-purple-600 rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple"
                            onclick="ChangeUrl('/admin/tournaments/live')">
                            <div class="flex items-center">
                                <i class="fa-solid fa-globe mr-3"></i>
                                <span>Some Tournaments are Live Now</span>
                            </div>
                            <span>See more &RightArrow;</span>
                        </a>
                        <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                            <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                                <div class="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z">
                                        </path>
                                    </svg>
                                </div>
                                <div>
                                    <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Total Players
                                    </p>
                                    <p id="totalPlayers" class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                        0
                                    </p>
                                </div>
                            </div>
                            <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                                <div class="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Upcoming Tournaments
                                    </p>
                                    <p id="upcomingTournaments" class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                        0
                                    </p>
                                </div>
                            </div>
                            <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                                <div class="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p id="" class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Live Tournaments
                                    </p>
                                    <p id="liveTournaments" class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                        0
                                    </p>
                                </div>
                            </div>
                            <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                                <div class="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Finished Tournaments
                                    </p>
                                    <p id="finishedTournaments" class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                        0
                                    </p>
                                </div>
                            </div>
                        </div>

                        <h4 class="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
                            How it works?
                        </h4>
                        <div class="grid gap-6 mb-8 md:grid-cols-2">
                            <div class="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                                <h4 class="font-semibold text-gray-600 dark:text-gray-300">
                                    Tournaments
                                </h4>
                                <p class="text-gray-600 dark:text-gray-400">
                                    You have need to open Tournaments tab from there you can create a new Tournament. Then
                                    players can join to your tournament. When maximum players are reached then tournament will start
                                    automatically on time that you mentioned.
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div >
        </div >
        `;
    }
}