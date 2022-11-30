import React, { useState } from 'react';

export default function Sidebar(props) {
    const [menuBarOpen, setMenuBarOpen] = useState(false);

    function logoutUser() {
        localStorage.removeItem('token');
        props.changeUrl('/login');
    }

    function toggleMenuBar() {
        setMenuBarOpen(!menuBarOpen);
    }

    function activeBtn(name, icon, url) {
        return (
            <li className="relative px-6 py-3">

                <span className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"></span>
                <button className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-200 text-gray-100"
                    onClick={(e) => props.changeUrl(url)}>
                    <i className={"ml-1 " + icon}></i>
                    <span className="ml-4">{name}</span>
                </button>
            </li>
        );
    }

    function inactiveBtn(name, icon, url) {
        return (
            <li className="relative px-6 py-3">
                <button className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-200"
                    onClick={(e) => props.changeUrl(url)}>
                    <i className={"ml-1 " + icon}></i>
                    <span className="ml-4">{name}</span>
                </button>
            </li>
        );
    }

    function dropdownBtn() {
        return (
            <>
                <span className="inline-flex items-center">
                    <i className="ml-1 fa-solid fa-trophy"></i>
                    <span className="ml-4">Tournaments</span>
                </span>
                <svg className="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"></path>
                </svg>
            </>
        );
    }

    function sidebar() {
        return (
            <div className="py-0 text-gray-400">
                <button id="username2" className="py-4 ml-6 text-lg font-bold text-gray-200"
                    onClick={(e) => props.changeUrl('/player/dashboard')}>
                    <img className="inline-block w-10 h-10 mr-2 rounded-full"
                        src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                        alt="Avatar of Jonathan Reinink" />
                    <span className="align-middle">{props.username}</span>
                </button>
                <hr className='border-gray-900 mt-[0.5px]'></hr>
                <ul className="mt-0">
                    {props.openendPage == 'Dashboard' ?
                        activeBtn('Dashboard', 'fas fa-house', '/player/dashboard')
                        :
                        inactiveBtn('Dashboard', 'fas fa-house', '/player/dashboard')
                    }
                    <li className="relative px-6 py-3">
                        {props.openendPage == 'Tournaments' ?
                            <>
                                <span className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg" aria-hidden="true"></span>
                                <button className="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-200 text-gray-100"
                                    onClick={toggleMenuBar}>
                                    {dropdownBtn()}
                                </button>
                            </>
                            :
                            <button className="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-200"
                                onClick={toggleMenuBar}>
                                {dropdownBtn()}
                            </button>
                        }
                        {menuBarOpen ?
                            <ul className="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium rounded-md shadow-inner text-gray-400 bg-gray-900 transition-all duration-700">
                                <li className="px-2 py-1 transition-colors duration-150 hover:text-gray-200">
                                    <button onClick={(e) => props.changeUrl('/player/tournaments/all')}>
                                        All
                                    </button>
                                </li>
                                <li className="px-2 py-1 transition-colors duration-150 hover:text-gray-200">
                                    <button onClick={(e) => props.changeUrl('/player/tournaments/joined')}>
                                        Joined
                                    </button>
                                </li>
                                <li className="px-2 py-1 transition-colors duration-150 hover:text-gray-200">
                                    <button onClick={(e) => props.changeUrl('/player/tournaments/live')}>
                                        Live
                                    </button>
                                </li>
                                <li className="px-2 py-1 transition-colors duration-150 hover:text-gray-200">
                                    <button onClick={(e) => props.changeUrl('/player/tournaments/played')}>
                                        Played
                                    </button>
                                </li>
                            </ul>
                            : null
                        }
                    </li>
                    {props.openendPage == 'Profile' ?
                        activeBtn('Profile', 'fas fa-user', '/player/profile')
                        :
                        inactiveBtn('Profile', 'fas fa-user', '/player/profile')
                    }
                    {props.openendPage == 'Setting' ?
                        activeBtn('Setting', 'fas fa-cog', '/player/setting')
                        :
                        inactiveBtn('Setting', 'fas fa-cog', '/player/setting')
                    }
                    <li className="relative px-6 py-3">
                        <button
                            className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-200"
                            onClick={logoutUser}>
                            <i className="ml-1 fa-solid fa-sign-out"></i>
                            <span className="ml-4">Logout</span>
                        </button>
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <>
            {props.sideBarOpen ?
                <>
                    <aside className="shadow-lg z-20 hidden w-64 overflow-y-auto bg-gray-800 md:block flex-shrink-0" >
                        {sidebar()}
                    </aside >
                    <div className="fixed inset-0 z-10 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center md:hidden"></div>
                    <aside className="fixed shadow-lg inset-y-0 z-20 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-gray-800 md:hidden transition-all duration-700">
                        {sidebar()}
                    </aside>
                </>
                : null
            }
        </>
    );
}