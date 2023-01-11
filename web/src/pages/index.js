import React from 'react';
import { Link } from 'react-router-dom';
import LandingNavbar from '../components/landingNavbar';

export default function Home({ socket }) {
    return (
        <>
            <LandingNavbar />
            <div className="items-center min-h-screen p-0 m-0  bg-black text-white">
                <div className='relative h-screen'>
                    <video className='w-full h-screen object-cover' autoPlay muted loop playsInline>
                        <source src="/videos/Space.mp4" type="video/mp4"></source>
                    </video>
                    <div className='absolute inset-0 grid place-content-center'>
                        <div className='text-white text-center space-y-4 lg:space-y-10'>
                            <h1 className='font-bold text-2xl md:text-4xl lg:text-5xl'>The fastest 100X you'll ever make</h1>
                            <p className='text-xm md:text-xl lg:text-3xl'>No whales, no bots, no insiders. Only the moonshot you've been waiting for.</p>
                            <button className='text-sm md:text-xl lg:text-2xl my-auto bg-gradient-to-r from-[#f0f] to-[#6d00cc] text-white px-4 py-2 lg:px-8 lg:py-4 rounded-xl font-semibold'>Play for free</button>
                        </div>
                    </div>
                </div>
                <div id='howitworks' className='px-4 md:px-10 lg:px-32 py-24 text-xl lg:text-2xl'>
                    <h1 className='text-4xl lg:text-5xl font-bold mb-6 lg:mb-8'>
                        How it works
                    </h1>
                    <p className='my-6'>
                        Magic marble is a simple, fast, and fair game you only need 5 min to learn. It is a game of equal opportunity, because we believe everyone deserves an equal shot at winning.
                    </p>
                    <p className='my-6'>
                        So, how does it work? Similar to poker or chess competitions we organize a knock-out PvP tournament. Next, our platform uses crypto rails to crowdsource the prize fund from buy-ins.
                    </p>
                    <p className='my-6'>
                        After the competition ends instant payouts go to 10-15% of tournament winners. This simple, yet amazing system allows players to 2-100x their bets in a matter of hours.
                    </p>
                    <p className='my-6'>
                        Prize pool is limited only by the number of participants. For example: even with only a 10$ buy-in, winner of a large 100,000+ tournament can become a millionaire in mere hours.
                    </p>
                    <p className='my-6'>
                        Our recipe for success: Games of equal chance + Crypto = Enormous untapped potential.
                    </p>
                    <p className='my-6'>
                        Magic Marble is on a mission is to unlock this opportunity for everyone.
                    </p>
                </div>
                <div className='px-4 md:px-10 lg:px-32 py-24 bg-[#d1d5db] text-black text-xl lg:text-2xl'>
                    <h1 className='font-semibold text-4xl lg:text-5xl pb-4'>
                        Key advantages
                    </h1>
                    <ul className='pl-12 list-outside list-disc space-y-2 py-2'>
                        <li>
                            <h2 className='font-semibold'>Incredible Gains</h2>
                            <p>Make 10x-100x or even 1000x your investment.</p>
                        </li>
                        <li>
                            <h2 className='font-semibold'>Warp speed</h2>
                            <p>100x in crypto is rare but possible. 100x in a couple of hours? Insane.</p>
                        </li>
                        <li>
                            <h2 className='font-semibold'>Affordable to anyone</h2>
                            <p>Participate for as little as 50$.</p>
                        </li>
                        <li>
                            <h2 className='font-semibold'>Equal chances</h2>
                            <p>Play against your equals, not against the house.</p>
                        </li>
                        <li>
                            <h2 className='font-bold'>Transparency</h2>
                            <p>Clear and simple rules, no cheating, no rug pulls.</p>
                        </li>
                        <li>
                            <h2 className='font-semibold'>Fair distribution</h2>
                            <p>97% of funds go towards the prize fund.</p>
                        </li>
                    </ul>
                </div>
                <div id='nftfreeroll' className='text-center px-4 md:px-10 lg:px-32 py-24 text-xl lg:text-2xl'>
                    <h1 className='text-4xl lg:text-5xl font-bold'>
                        Genesis 🔥NFT Freeroll
                    </h1>
                    <p className='my-4'>
                        Get a piece of Magic Marble NFT collection and win a piece of our exclusive $300,000 freeroll
                    </p>
                    <p className='mx-auto my-6 w-fit rounded-xl border-white border px-3 py-2 lg:py-4 lg:px-6'>
                        Access to the first series of tournaments with $300,000 in prizes.
                    </p>
                    <p className='mx-auto my-6 w-fit rounded-xl border-white border px-3 py-2 lg:py-4 lg:px-6'>
                        Monthly freeroll tournaments funded by the project’s revenue stream.
                    </p>
                    <p className='mx-auto my-6 w-fit rounded-xl border-white border px-3 py-2 lg:py-4 lg:px-6'>
                        Eligibility for future governance tokens and other project airdrops.
                    </p>
                    <p className='mx-auto my-6 w-fit rounded-xl border-white border px-3 py-2 lg:py-4 lg:px-6'>
                        Access to exclusive Discord for NFT holders.
                    </p>
                    <p className='mx-auto my-6 w-fit rounded-xl border-white border px-3 py-2 lg:py-4 lg:px-6'>
                        Exclusive rights to create your own custom tournaments and earn rewards.
                    </p>
                    <button className='text-xl md:text-2xl my-auto bg-gradient-to-r from-[#f0f] to-[#6d00cc] text-white px-4 py-2 lg:px-8 lg:py-4 rounded-xl font-semibold'>
                        Free whitelist spot
                    </button>
                </div>
                <div className='px-4 md:px-10 lg:px-32 py-24 bg-[#d1d5db] text-black text-xl lg:text-2xl'>
                    <h1 className='text-4xl lg:text-5xl font-bold mb-16'>
                        Roadmap
                    </h1>
                    <div className='my-8'>
                        <h2 className='text-2xl lg:text-3xl font-semibold mb-4'>
                            Crowdfund
                        </h2>
                        <p>
                            First community crowdfund and whitepaper is launched with first 1000 NFTs up for grabs. Drop #1 with a minting price of 0.04 ETH for the lucky few.
                        </p>
                    </div>
                    <div className='my-8'>
                        <h2 className='text-2xl lg:text-3xl font-semibold mb-4'>
                            Presale
                        </h2>
                        <p>
                            Drop #2 is scheduled to kick-off in the first half of December 2022. A total of 3000 NFTs will be offered, with 250 NFT mint passes used for giveaways, marketing, promotions, and influencercollaborations. Mint price will be significantly higher than Drop #1, with the exact amount TBD.
                        </p>
                    </div>
                    <div className='my-8'>
                        <h2 className='text-2xl lg:text-3xl font-semibold mb-4'>
                            Public sale
                        </h2>
                        <p>
                            The final Drop #3 date will be scheduled right before the start of our free high-rollertournament series for NFT holders. Launch date is planned for the end of 2022 and will beannounced separately. The remaining supply of 5500 NFTs will be available to mint, with 500pcs reserved for further marketing promotions and charity giveaways.
                        </p>
                    </div>
                    <div className='my-8'>
                        <h2 className='text-2xl lg:text-3xl font-semibold mb-4'>
                            Let the game begin!
                        </h2>
                        <p>
                            Once NFT distribution is complete we will conduct a celebratory series of tournaments to reward our supporters. Prize fund of $300,000 will be distributed among the 10-15% of lucky winners. This will mark the beginning of Phase 2 of Marbleverse project, with paid tournaments going live shortly after. Turning to the next chapter, our team will devote its full attention towards achieving further roadmap milestones. Focusing on the product, promoting the game and attracting new players will be our top priorities going forward. Furthermore, 50% of all revenue generated by Magic Marble project will accrue to the core community, driving higher the value of NFTs in the long run. For details please refer to the whitepaper and join our Discord for further questions.
                        </p>
                    </div>
                </div>
                <div id='aboutus' className='px-4 md:px-10 lg:px-32 py-24 text-xl lg:text-2xl'>
                    <h1 className='text-4xl lg:text-5xl font-bold'>
                        Meet our team
                    </h1>
                    <p className='my-4'>
                        Marbleverse is a four person team, passionate about bringing this project to life. Currently consisting of a project lead, NFT art designer, solidity and game developers. Our team strongly believes in the success of this project and its long-term potential. Information presented here is only the first step towards communicating our full vision, with lots of vital ideas still to be released in our socials.
                    </p>
                    <div className='w-full h-full my-8 grid gap-24 grid-cols-1 lg:grid-cols-2'>
                        <div className='text-center'>
                            <img src='/images/logo4.png' alt='alex' className='w-40 h-40 md:w-64 md:h-64 rounded-full mx-auto' />
                            <h2 className='font-bold my-2'>Marblemaster</h2>
                            <p className='my-2'>Game theory geek / software developer</p>
                        </div>
                        <div className='text-center'>
                            <img src='/images/df.jpg' alt='alex' className='w-40 h-40 md:w-64 md:h-64 rounded-full mx-auto' />
                            <h2 className='font-bold my-2'>D.Forrest</h2>
                            <p className='my-2'>Art Designer / NFT expert</p>
                        </div>
                        <div className='text-center'>
                            <img src='/images/tm.jpg' alt='alex' className='w-40 h-40 md:w-64 md:h-64 rounded-full mx-auto' />
                            <h2 className='font-bold my-2'>T.M.</h2>
                            <p className='my-2'>Fullstack developer</p>
                        </div>
                        <div className='text-center'>
                            <img src='/images/ak.jpg' alt='alex' className='w-40 h-40 md:w-64 md:h-64 rounded-full mx-auto' />
                            <h2 className='font-bold my-2'>A.Khan</h2>
                            <p className='my-2'>Frontend developer</p>
                        </div>
                    </div>
                </div>
                <div className='hidden justify-center text-center w-full h-28 border-t border-white py-1 lg:flex lg:flex-col'>
                    <div className='flex gap-2 justify-center'>
                        <img className='w-6 h-6' src="./icons/twitter-logo.svg" alt=""></img>
                        <img className='w-6 h-6' src="./icons/discord-logo.svg" alt=""></img>
                        <img className='w-6 h-6' src="./icons/telegram-logo.svg" alt=""></img>
                    </div>
                    <h1 className='font-semibold'>
                        <Link to='/'>
                            MAGIC MARBLE
                        </Link>
                    </h1>
                    <p>
                        Copyright 2022
                    </p>
                    <a>
                        email@marbles.com
                    </a>
                </div>
            </div>
        </>
    );
}