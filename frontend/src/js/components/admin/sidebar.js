export default class Sidebar {
    constructor(activeBtnName) {
        this.activeBtnName = activeBtnName;
    }
    onLoad() {

    }
    activeBtn(name, icon, url) {
        return `
        <span class="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
            aria-hidden="true"></span>
        <button class="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100"
            onclick="ChangeUrl('${url}')">
            <i class="ml-1 ${icon}"></i>
            <span class="ml-4">${name}</span>
        </button>
        `;
    }
    inactiveBtn(name, icon, url) {
        return `
        <button class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
            onclick="ChangeUrl('${url}')">
            <i class="ml-1 ${icon}"></i>
            <span class="ml-4">${name}</span>
        </button>
        `;
    }
    onRender() {
        return `
        <aside class="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0" >
            <div class="py-4 text-gray-500 dark:text-gray-400">
                <button id="username1" class="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
                    onclick="ChangeUrl('/admin/dashboard')">
                    Admin
                </button>
                <ul class="mt-6">
                    <li class="relative px-6 py-3">
                        ${this.activeBtnName == 'Dashboard' ?
                            `${this.activeBtn('Dashboard', 'fas fa-house', '/admin/dashboard')}`
                            :
                            `${this.inactiveBtn('Dashboard', 'fas fa-house', '/admin/dashboard')}`
                        }
                    </li>
                </ul>
                <ul>
                    <li class="relative px-6 py-3">
                        ${this.activeBtnName == 'Tournaments' ? `
                                <span class="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                                aria-hidden="true"></span>
                                <button class="inline-flex items-center justify-between w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100"
                                `: `
                                <button class="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                                `
                        }
                            @click="togglePagesMenu" aria-haspopup="true">
                        <span class="inline-flex items-center">
                            <i class="ml-1 fa-solid fa-trophy"></i>
                            <span class="ml-4">Tournaments</span>
                        </span>
                        <svg class="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </button>
                    <template x-if="isPagesMenuOpen">
                        <ul x-transition:enter="transition-all ease-in-out duration-300"
                            x-transition:enter-start="opacity-25 max-h-0" x-transition:enter-end="opacity-100 max-h-xl"
                            x-transition:leave="transition-all ease-in-out duration-300"
                            x-transition:leave-start="opacity-100 max-h-xl" x-transition:leave-end="opacity-0 max-h-0"
                            class="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900"
                            aria-label="submenu">
                            <li class="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                                <button onclick="ChangeUrl('/admin/tournaments/create')">
                                    Create
                                </button>
                            </li>
                            <li class="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                                <button onclick="ChangeUrl('/admin/tournaments/upcoming')">
                                    Upcoming
                                </button>
                            </li>
                            <li class="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                                <button onclick="ChangeUrl('/admin/tournaments/live')">
                                    Live
                                </button>
                            </li>
                            <li class="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                                <button onclick="ChangeUrl('/admin/tournaments/finished')">
                                    Finished
                                </button>
                            </li>
                            <li class="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                                <button onclick="ChangeUrl('/admin/tournaments/deleted')">
                                    Deleted
                                </button>
                            </li>
                        </ul>
                    </template>
                </li>
                <li class="relative px-6 py-3">
                    ${this.activeBtnName == 'Players' ?
                        `${this.activeBtn('Players', 'fas fa-users', '/admin/players')}`
                        :
                        `${this.inactiveBtn('Players', 'fas fa-users', '/admin/players')}`
                    }
                </li>
                <li class="relative px-6 py-3">
                    ${this.activeBtnName == 'Profile' ?
                        `${this.activeBtn('Profile', 'fas fa-user', '/admin/profile')}`
                        :
                        `${this.inactiveBtn('Profile', 'fas fa-user', '/admin/profile')}`
                    }
                </li>
                <li class="relative px-6 py-3">
                    ${this.activeBtnName == 'Setting' ?
                        `${this.activeBtn('Setting', 'fas fa-cog', '/admin/setting')}`
                        :
                        `${this.inactiveBtn('Setting', 'fas fa-cog', '/admin/setting')}`
                    }
                </li>
                <li class="relative px-6 py-3">
                    <button
                        class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                        onclick="Logout()">
                        <i class="ml-1 fa-solid fa-sign-out"></i>
                        <span class="ml-4">Logout</span>
                    </button>
                </li>
            </ul>
        </div >
    </aside >
    <div x-show="isSideMenuOpen" x-transition:enter="transition ease-in-out duration-150"
    x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100"
    x-transition:leave="transition ease-in-out duration-150" x-transition:leave-start="opacity-100"
    x-transition:leave-end="opacity-0"
    class="fixed inset-0 z-10 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"></div>
    <aside class="fixed inset-y-0 z-20 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white dark:bg-gray-800 md:hidden"
    x-show="isSideMenuOpen" x-transition:enter="transition ease-in-out duration-150"
    x-transition:enter-start="opacity-0 transform -translate-x-20" x-transition:enter-end="opacity-100"
    x-transition:leave="transition ease-in-out duration-150" x-transition:leave-start="opacity-100"
    x-transition:leave-end="opacity-0 transform -translate-x-20" @click.away="closeSideMenu"
        @keydown.escape="closeSideMenu" >
            <div class="py-4 text-gray-500 dark:text-gray-400">
                <button id="username2" class="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
                    onclick="ChangeUrl('/admin/dashboard')">
                    Admin
                </button>
                <ul class="mt-6">
                    <li class="relative px-6 py-3">
                        ${this.activeBtnName == 'Dashboard' ?
                            `${this.activeBtn('Dashboard', 'fas fa-house', '/admin/dashboard')}`
                            :
                            `${this.inactiveBtn('Dashboard', 'fas fa-house', '/admin/dashboard')}`
                        }
                    </li>
                </ul>
                <ul>
                    <li class="relative px-6 py-3">
                        ${this.activeBtnName == 'Tournaments' ? `
                        <span class="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                        aria-hidden="true"></span>
                        <button class="inline-flex items-center justify-between w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100"
                        `: `
                        <button class="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                        `
                        }
                    @click="togglePagesMenu" aria-haspopup="true">
                        <span class="inline-flex items-center">
                            <i class="ml-1 fa-solid fa-trophy"></i>
                            <span class="ml-4">Tournaments</span>
                        </span>
                        <svg class="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </button>
                    <template x-if="isPagesMenuOpen">
                        <ul x-transition:enter="transition-all ease-in-out duration-300"
                            x-transition:enter-start="opacity-25 max-h-0" x-transition:enter-end="opacity-100 max-h-xl"
                            x-transition:leave="transition-all ease-in-out duration-300"
                            x-transition:leave-start="opacity-100 max-h-xl" x-transition:leave-end="opacity-0 max-h-0"
                            class="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900"
                            aria-label="submenu">
                            <li class="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                                <button onclick="ChangeUrl('/admin/tournaments/create')">
                                    Create
                                </button>
                            </li>
                            <li class="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                                <button onclick="ChangeUrl('/admin/tournaments/upcoming')">
                                    Upcoming
                                </button>
                            </li>
                            <li class="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                                <button onclick="ChangeUrl('/admin/tournaments/live')">
                                    Live
                                </button>
                            </li>
                            <li class="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                                <button onclick="ChangeUrl('/admin/tournaments/finished')">
                                    Finished
                                </button>
                            </li>
                            <li class="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                                <button onclick="ChangeUrl('/admin/tournaments/deleted')">
                                    Deleted
                                </button>
                            </li>
                        </ul>
                    </template>
                </li>
                <li class="relative px-6 py-3">
                    ${this.activeBtnName == 'Players' ?
                        `${this.activeBtn('Players', 'fas fa-users', '/admin/players')}`
                        :
                        `${this.inactiveBtn('Players', 'fas fa-users', '/admin/players')}`
                    }
                </li>
                <li class="relative px-6 py-3">
                    ${this.activeBtnName == 'Profile' ?
                        `${this.activeBtn('Profile', 'fas fa-user', '/admin/profile')}`
                        :
                        `${this.inactiveBtn('Profile', 'fas fa-user', '/admin/profile')}`
                    }
                </li>
                <li class="relative px-6 py-3">
                    ${this.activeBtnName == 'Setting' ?
                        `${this.activeBtn('Setting', 'fas fa-cog', '/admin/setting')}`
                        :
                        `${this.inactiveBtn('Setting', 'fas fa-cog', '/admin/setting')}`
                    }
                </li>
                <li class="relative px-6 py-3">
                    <button
                        class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                        onclick="Logout()">
                        <i class="ml-1 fa-solid fa-sign-out"></i>
                        <span class="ml-4">Logout</span>
                    </button>
                </li>
            </ul>
        </div>
    </aside>
            `;
    }
}