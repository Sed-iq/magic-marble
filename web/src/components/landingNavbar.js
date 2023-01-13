import React from "react";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';

export default function LandingNavbar() {

    return (
        <>
            <div className="font-sgl flex items-center justify-between h-16 px-4 py-2 border-b-2 border-[#292524] bg-black">
                <div className='flex items-center'>
                    <Link to='/'>
                        <img className="w-10 h-10 bg-gradient-to-r from-[#f0f] to-[#6d00cc] rounded-full" src="/images/Logo group.svg"></img>
                    </Link>
                    <p className='text-white mx-2 font-bold'>MAGIC <br></br> MARBLE</p>
                </div>
                <div className='hidden lg:flex items-center text-white gap-8 text-xl'>
                    <HashLink smooth className='my-auto hover:border-b-2 hover:border-white transition-all' to='/#howitworks'>
                        How it works
                    </HashLink>
                    <Link className='my-auto hover:border-b-2 hover:border-white transition-all' to='/'>
                        Tournaments
                    </Link>
                    <HashLink smooth className='my-auto hover:border-b-2 hover:border-white transition-all' to='/#nftfreeroll'>
                        ️‍🔥100x NFT Freeroll
                    </HashLink>
                    <HashLink smooth className='my-auto hover:border-b-2 hover:border-white transition-all' to='/#aboutus'>
                        About us
                    </HashLink>
                </div>
                <div className='flex items-center align-middle gap-2'>
                    <Link className='my-auto' to='/login'>
                        <button className='font-sgm my-auto bg-[#292524] text-white px-4 py-2 rounded-lg'>Login</button>
                    </Link>
                    <Link to='/signup'>
                        <button className='font-sgm my-auto bg-gradient-to-r from-[#f0f] to-[#6d00cc] text-white px-6 py-2 rounded-lg'>Play for free</button>
                    </Link>
                </div>
            </div>
            <div className="font-sgb fixed w-full bottom-0 flex lg:hidden justify-center py-2 bg-black border-[#292524] border-t-2 items-center text-center text-white gap-1 md:gap-4 text-xs md:text-sm z-50">
                <HashLink smooth className='my-auto font-bold' to='/#howitworks'>
                    <svg className="w-6 h-6 mx-auto" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6M6,4H13V9H18V20H6V4M8,12V14H16V12H8M8,16V18H13V16H8Z"></path>
                    </svg>
                    How it works
                </HashLink>
                <Link className='my-auto font-bold' to='/'>
                    <svg className="w-6 h-6 mx-auto" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M2,2V4H7V8H2V10H7C8.11,10 9,9.11 9,8V7H14V17H9V16C9,14.89 8.11,14 7,14H2V16H7V20H2V22H7C8.11,22 9,21.11 9,20V19H14C15.11,19 16,18.11 16,17V13H22V11H16V7C16,5.89 15.11,5 14,5H9V4C9,2.89 8.11,2 7,2H2Z"></path>
                    </svg>
                    Tournaments
                </Link>
                <HashLink smooth className='my-auto font-bold' to='/#nftfreeroll'>
                    <svg className="w-6 h-6 mx-auto" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M17.9,17.39C17.64,16.59 16.89,16 16,16H15V13A1,1 0 0,0 14,12H8V10H10A1,1 0 0,0 11,9V7H13A2,2 0 0,0 15,5V4.59C17.93,5.77 20,8.64 20,12C20,14.08 19.2,15.97 17.9,17.39M11,19.93C7.05,19.44 4,16.08 4,12C4,11.38 4.08,10.78 4.21,10.21L9,15V16A2,2 0 0,0 11,18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"></path>
                    </svg>
                    ️‍🔥NFT Freeroll
                </HashLink>
                <HashLink smooth className='my-auto font-bold' to='/#aboutus'>
                    <svg className="w-6 h-6 mx-auto" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z"></path>
                    </svg>
                    About us
                </HashLink>
            </div>
        </>
    );
}