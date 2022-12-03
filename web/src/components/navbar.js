import React from 'react';

export default function Navbar({ socket, sideBarOpen, toggleSideBar, changeUrl }) {
    function logoutUser() {
        localStorage.removeItem('token');
        changeUrl('/login');
    }

    return (
        <header className="z-10 py-3 shadow-lg bg-gray-800">
            <div
                className="py-2 flex items-center justify-between h-full px-6 mx-auto text-purple-300">
                <button className="p-1 mr-5 -ml-1 md:hidden rounded-md focus:outline-none focus:shadow-outline-purple" aria-label="Menu"
                    onClick={toggleSideBar}>
                    {sideBarOpen ?
                        <i className="fa-solid fa-xmark"></i>
                        :
                        <i className="fa-solid fa-bars-staggered"></i>
                    }
                </button>
                <div className="lg:mr-32"></div>
                <ul className="flex items-center flex-shrink-0 space-x-6">
                    <li className="relative">
                        {(socket) ? <i className="w-5 h-5 fa-solid fa-wifi"></i> : <i className="w-5 h-5 fa-solid fa-wifi-slash"></i>}
                    </li>
                    <li className="relative">
                        <button onClick={logoutUser}
                            className="rounded-md focus:outline-none focus:shadow-outline-purple">
                            <i className="w-5 h-5 fa-solid fa-right-from-bracket"></i>
                        </button>
                    </li>
                </ul>
            </div>
        </header>
    );
}