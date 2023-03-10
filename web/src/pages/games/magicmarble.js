import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import Loading from '../../components/Loading';

import { GetUser } from '../../utils';

import './magicmarble.css';

function SideBar({ changeUrl }) {
    return (
        <div className='shrink-0 relative hidden lg:block w-16 shadow-md bg-[#1c2258] min-h-screen my-0'>
            <div className='fixed h-full mx-5'>
                <ul>
                    <li className='flex items-center justify-center h-16'>
                        <button id="username2" className="py-4 text-lg font-bold text-gray-200"
                            onClick={(e) => changeUrl('/player/dashboard')}>
                            <span className="align-middle"><li className='fas fa-house'></li></span>
                        </button>
                    </li>
                    <li className='flex items-center justify-center h-16'>
                        <button id="username2" className="py-4 text-lg font-bold text-gray-200"
                            onClick={(e) => changeUrl('/player/tournaments/all')}>
                            <span className="align-middle"><li className='fas fa-trophy'></li></span>
                        </button>
                    </li>
                    <li className='flex items-center justify-center h-16'>
                        <button id="username2" className="py-4 text-lg font-bold text-gray-200"
                            onClick={(e) => changeUrl('/player/wallet')}>
                            <span className="align-middle"><li className='fas fa-wallet'></li></span>
                        </button>
                    </li>
                    <li className='flex items-center justify-center h-16'>
                        <button id="username2" className="py-4 text-lg font-bold text-gray-200"
                            onClick={(e) => changeUrl('/player/profile')}>
                            <span className="align-middle"><li className='fas fa-user'></li></span>
                        </button>
                    </li>
                    <li className='flex items-center justify-center h-16'>
                        <button id="username2" className="py-4 text-lg font-bold text-gray-200"
                            onClick={(e) => changeUrl('/player/setting')}>
                            <span className="align-middle"><li className='fas fa-cog'></li></span>
                        </button>
                    </li>
                    <li className='flex items-center justify-center h-16'>
                        <button id="username2" className="py-4 text-lg font-bold text-gray-200"
                            onClick={(e) => changeUrl('/player/setting')}>
                            <span className="align-middle"><li className='fas fa-sign-out'></li></span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

function TopBar({ counterText, language, setLanguage }) {
    function playAudio() {
        let play = document.getElementById('play');
        let music = document.getElementById('music');
        play.classList.toggle("on");
        play.classList.contains("on") ? music.play() : music.pause();
    }

    function showRules() {
        let rulesEN = document.getElementById('rulesEN');
        let rulesRU = document.getElementById('rulesRU');

        if (language === 'en') {
            rulesEN.style.visibility = 'visible';
            rulesEN.style.opacity = '1';
            let closeRules = document.querySelector('.closeEN');
            closeRules.addEventListener('click', () => {
                rulesEN.style.visibility = 'hidden';
                rulesEN.style.opacity = '0';
            });
        }
        if (language === 'ru') {
            rulesRU.style.visibility = 'visible';
            rulesRU.style.opacity = '1';
            let closeRules = document.querySelector('.closeRU');
            closeRules.addEventListener('click', () => {
                rulesRU.style.visibility = 'hidden';
                rulesEN.style.opacity = '0';
            });
        }
    }

    return (
        <>
            {counterText &&
                <div className='absolute top-5 inset-x-0 text-center text-white text-2xl rouned p-2'>{counterText}</div>
            }
            <div className='relative flex flex-col gap-2 mb-6'>
                <div className='w-full relative text-[#d9d9d9] flex align-middle justify-between lg:justify-end px-2 py-4 top-2'>
                    <div className='flex align-middle gap-3 my-auto'>
                        <a className="transition my-auto cursor-pointer font-bold" id="rules" onClick={showRules}>Game rules</a>
                    </div>
                    <div id="rulesEN" className="overlay">
                        <div className="rulesPopupEN">
                            <h2 id="rulesResultEN">
                                Game rules<a className="link close closeEN">??</a>
                            </h2>
                            <ul className="list-style">
                                <li>Each player is dealt 10 marbles at the start.</li>
                                <li>
                                    There are only 2 players (i.e./ 'Hider' and 'Guesser').
                                    Players change roles after each round.
                                </li>
                                <li>
                                    Objective of the game is to collect all of your opponent???s
                                    marbles.
                                </li>
                                <li>
                                    Each round, players have to pick a number from 1 to 10 from
                                    their stack. Guesser's objective is to correctly predict if
                                    Hider's number is odd or even.
                                </li>
                                <li>
                                    The prize is determined by the amount of marbles Guesser
                                    wagered.
                                </li>
                                <li>
                                    Example 1: Hider chooses 3 marbles; Guesser correctly reckons
                                    that his opponent would choose an odd number and bets 2.
                                    Result: Guesser wins 2 marbles.
                                </li>
                                <li>
                                    Example 2: Hider picks 5 marbles, Guesser wagers 8 and guesses
                                    incorrectly. Results: Guesser loses 8 marbles.
                                </li>
                                <li>
                                    If one of the Players is left with only 1 marble, he can only
                                    assume the Guesser role.
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div id="rulesRU" className="overlay">
                        <div className="rulesPopupRU">
                            <h2 id="rulesResultRU">
                                ?????????????? ????????<a className="link close closeRU">??</a>
                            </h2>
                            <ul className="list-style">
                                <li>?? ???????????? ???????? ???????????? ?????????? ???????????????? 10 ??????????.</li>
                                <li>
                                    ???????????????????? ???????????? 2 ???????????? - ???????????????????????? ?? ????????????????????????.
                                    ???????????? ???????????????? ???????????? ?????????? ?????????????? ????????????.
                                </li>
                                <li>???????? ???????? - ???????????????? ?????? ???????? ??????????????????.</li>
                                <li>
                                    ?? ???????????? ???????????? ???????????????????????? ???????????????? ?????????? ?????????? ???? 1 ???? 10.
                                    ???????? ?????????????????????????? - ?????????????????? ?????????????? ?????????????????? (???????????? ??????
                                    ????????????????).
                                </li>
                                <li>
                                    ???????? ?????????????? ???????????? ???????????????????????? ???????????????? ????????????
                                    ??????????????????????????.
                                </li>
                                <li>
                                    ???????????? 1: ???????????????????????? ???????????????? 3 ????????. ????????????????????????
                                    ????????????????????????, ?????? ???????????????? ???????????? ???????????????? ?????????? ?? ????????????
                                    ???????????? ?? 2 ????????. ??????????????????: ???????????????????????? ???????????????????? 2 ????????.
                                </li>
                                <li>
                                    ???????????? 2: ???????????????????????? ???????????????? 5 ??????????. ????????????????????????
                                    ????????????????????????, ?????? ???????????????? ???????????? ???????????? ?????????? ?? ???????????? 8
                                    ??????????. ??????????????????: ???????????????????????? ???????????????????? 8 ??????????.
                                </li>
                                <li>
                                    ???????? ?? ???????????? ???? ?????????????? ???????????????? ???????????? 1 ??????, ???? ?????????? ????????
                                    ???????????? ?? ???????? ??????????????????????????.
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='flex align-middle ml-2 gap-1 my-auto'>
                        <div className='my-auto'>
                            <input id="language-switch" type="checkbox" value={language} onChange={(e) => {
                                setLanguage(language === 'en' ? 'ru' : 'en');
                            }} />
                            <label id="language" htmlFor="language-switch">
                                <span></span>
                                <div className={language === 'ru' ? '' : 'hidden'} id="ru">RU</div>
                                <div className={language === 'en' ? '' : 'hidden'} id="en">EN</div>
                            </label>
                        </div>
                        <button className='my-auto' id="play" onClick={playAudio}>
                            <svg
                                width="23"
                                height="21"
                                viewBox="0 0 23 21"
                                fill="currentcolor"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M22.9167 13.875V1.50001C22.9157 1.33103 22.8668 1.16439 22.7736 1.01248C22.6804 0.860566 22.5453 0.727277 22.3783 0.622509C22.2137 0.516783 22.0214 0.441692 21.8155 0.402755C21.6096 0.363818 21.3953 0.362025 21.1883 0.397509L8.43833 2.64751C8.12358 2.70388 7.84248 2.84388 7.64155 3.04436C7.44061 3.24484 7.33188 3.49378 7.33333 3.75001V13.1325C6.36622 12.7699 5.27713 12.6662 4.22946 12.8368C3.18179 13.0074 2.23203 13.4431 1.52264 14.0787C0.813261 14.7143 0.382514 15.5153 0.29502 16.3618C0.207527 17.2082 0.468005 18.0544 1.03738 18.7733C1.60675 19.4922 2.45432 20.0451 3.45294 20.3491C4.45155 20.6531 5.54736 20.6918 6.57598 20.4593C7.60461 20.2268 8.51057 19.7357 9.15798 19.0597C9.80538 18.3837 10.1593 17.5593 10.1667 16.71C10.1813 16.5152 10.1813 16.3198 10.1667 16.125V4.65001L20.0833 2.90626V10.8825C19.1157 10.5197 18.0259 10.416 16.9777 10.587C15.9295 10.758 14.9795 11.1944 14.2703 11.8307C13.561 12.4671 13.1309 13.2689 13.0445 14.1159C12.9581 14.9629 13.2201 15.8093 13.791 16.528C14.362 17.2467 15.2112 17.7988 16.2111 18.1016C17.2109 18.4043 18.3075 18.4413 19.3361 18.2069C20.3647 17.9726 21.2697 17.4796 21.9154 16.8019C22.561 16.1242 22.9124 15.2985 22.9167 14.4488C22.9301 14.2577 22.9301 14.0661 22.9167 13.875Z"
                                    fill="currentcolor"
                                />
                            </svg>
                        </button>
                        <audio
                            loop
                            id="music"
                            src="/audios/TheFatRat-Monody.mp3"
                        ></audio>
                    </div>
                </div>
                <div className='block flex-col mx-auto gap-2 lg:hidden'>
                    <p id='header1' className='text-[#8b30d2] text-4xl text-center'>MAGIC MARBLE</p>
                    <img className='w-56 mx-auto' src="/images/central-logo.svg" alt="image-mobile" />
                </div>
                <div className='relative hidden lg:block'>
                    <p id='header2' className='absolute inset-0 grid place-content-center text-4xl text-[#d9d9d9]'>MAGIC MARBLE</p>
                    <img className='w-full' src="/images/renewed-logo.svg" alt="image-wide" />
                </div>
            </div>
        </>
    );
}

let myUsername = null;

export default function MagicMarble({ socketId, socket }) {
    const [, updateState] = useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    const [userId, setUserId] = useState(null);
    const [tournamentId, setTournamentId] = useState(null);
    const [playerOneUserId, setPlayerOneUserId] = useState('');
    const [playerTwoUserId, setPlayerTwoUserId] = useState('');
    const [playerOneUsername, setPlayerOneUsername] = useState('asas');
    const [playerTwoUsername, setPlayerTwoUsername] = useState('');
    const [playerOneRole, setPlayerOneRole] = useState('');
    const [playerTwoRole, setPlayerTwoRole] = useState('');
    const [playerOnePlayerToPlay, setPlayerOnePlayerToPlay] = useState(null);
    const [playerOneLogs, setPlayerOneLogs] = useState([]);
    const [playerOneScore, setPlayerOneScore] = useState(null);
    const [playerTwoScore, setPlayerTwoScore] = useState(null);
    const [playerOneNo, setPlayerOneNo] = useState(null);
    const [loseAmount, setLoseAmount] = useState(null);
    const [wonAmount, setWonAmount] = useState(null);
    const [wonPlayer, setWonPlayer] = useState(null);
    const [selectedChoice, setSelectedChoice] = useState('even');
    const [selectedAmount, setSelectedAmount] = useState(1);
    const [message, setMessage] = useState('');
    const [receivedMessage, setReceivedMessage] = useState('');
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [popupResult, setPopupResult] = useState();
    const [counterText, setCounterText] = useState('');
    const [betCounterText, setBetCounterText] = useState('');
    const [language, setLanguage] = useState('en');

    const navigate = useNavigate();

    function changeUrl(url) {
        navigate(url);
    }

    function setupFuns() {
        const layerChat = document.getElementById('layer-chat');
        const swipeInfo = document.querySelector('.swipe-info');
        const swipeImg = document.querySelector('.swipe-img');
        const chatInfo = document.querySelector('.chat-info');

        let touchStartY = 0;
        let touchEndY = 0;

        function checkDirection() {
            if (touchEndY < touchStartY) {
                layerChat.classList.add('up');
                swipeInfo.classList.add('none');
                swipeImg.classList.add('rotate');
                chatInfo.style.display = 'block';
            }
            if (touchEndY > touchStartY) {
                layerChat.classList.remove('up');
                swipeInfo.classList.remove('none');
                swipeImg.classList.remove('rotate');
                chatInfo.style.display = 'none';
            }
        }

        layerChat.addEventListener('touchstart', e => {
            touchStartY = e.changedTouches[0].screenY
        })

        layerChat.addEventListener('touchend', e => {
            touchEndY = e.changedTouches[0].screenY
            checkDirection()
        })
    }

    function renderMarbles(score) {
        let marbles = [];
        for (let i = 0; i < score; i++) {
            marbles.push(<div key={i} className="marble"></div>);
        }
        return marbles;
    }

    function renderOptions(score) {
        let td = [];
        for (let i = 1; i <= score; i++) {
            td.push(<option key={i} value={i}></option>);
        }
        return td;
    }

    function renderTicks(score) {
        let td = [];
        for (let i = 1; i <= score; i++) {
            td.push(
                <div key={i} className={'tick ' + (selectedAmount >= i ? 'ticked' : '')} onClick={(e) => {
                    setSelectedAmount(i);
                }}>
                    <div className="number">{i}</div>
                    <div></div>
                </div>
            );
        }
        return td;
    }

    function renderPlayer(userId, username, role, score) {
        return (
            <>
                <div className="relative info">
                    <img className='inline-block w-10 h-10 rounded-full'
                        src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                        alt="Avatar of Jonathan Reinink"
                    />
                    <div>
                        <div className="name">{username}</div>
                        <div className="role">{role}</div>
                    </div>
                    {userId === playerOneUserId && receivedMessage &&
                        <div className="animate-bot-to-bot absolute -bottom-10 z-50 text-sm bg-[#9ca3af] border rounded bg-gradient-to-br p-2">
                            <div className="text-white font-medium">{receivedMessage}</div>
                        </div>
                    }

                </div>
                <div className="score relative flex flex-col justify-center">
                    <div className='mx-auto'>{score}</div>
                    {userId === playerOneUserId && wonPlayer && wonAmount &&
                        <div className="animate-small-to-big relative mx-auto z-50 text-xs">
                            <div className="text-green-500 text-2xl font-medium">+{wonAmount}</div>
                        </div>
                    }
                    {userId === playerOneUserId && !wonPlayer && loseAmount &&
                        <div className="animate-small-to-big relative mx-auto z-50 text-xs">
                            <div className="text-red-500 text-2xl font-medium">-{loseAmount}</div>
                        </div>
                    }
                    {userId === playerTwoUserId && !wonPlayer && wonAmount &&
                        <div className="animate-small-to-big relative mx-auto z-50 text-xs">
                            <div className="text-green-500 text-2xl font-medium">+{wonAmount}</div>
                        </div>
                    }
                    {userId === playerTwoUserId && wonPlayer && loseAmount &&
                        <div className="animate-small-to-big relative mx-auto z-50 text-xs">
                            <div className="text-red-500 text-2xl font-medium">-{loseAmount}</div>
                        </div>
                    }
                </div>
                <div className="marbles">
                    {renderMarbles(score)}
                </div>
            </>
        );
    }

    function update(tournament) {
        if (tournamentId && userId) {
            let idx = tournament.currentPlayers.findIndex((player) => player.userId === userId);
            if (idx !== -1) {
                let matchWithIdx = tournament.currentPlayers.findIndex((player) => player.userId === tournament.currentPlayers[idx].matchWith);
                if (matchWithIdx !== -1) {
                    let playerOne = tournament.currentPlayers[idx];
                    let playerTwo = tournament.currentPlayers[matchWithIdx];

                    if (playerOneUserId !== playerOne.userId) {
                        myUsername = playerOne.username;
                        setPlayerOneUserId(playerOne.userId);
                    }
                    if (playerOneUsername !== playerOne.username) {
                        setPlayerOneUsername(playerOne.username);
                    }
                    if (playerOneRole !== playerOne.role) {
                        setPlayerOneRole(playerOne.role);
                    }
                    if (playerOneScore !== playerOne.score) {
                        setPlayerOneScore(playerOne.score);
                    }
                    if (playerOneNo !== playerOne.no) {
                        setPlayerOneNo(playerOne.no);
                    }
                    if (playerOnePlayerToPlay !== playerOne.playerToPlay) {
                        setPlayerOnePlayerToPlay(playerOne.playerToPlay);
                    }
                    if (playerOneLogs !== playerOne.logs) {
                        setPlayerOneLogs(playerOne.logs);
                    }
                    if (playerTwoUserId !== playerTwo.userId) {
                        setPlayerTwoUserId(playerTwo.userId);
                    }
                    if (playerTwoUsername !== playerTwo.username) {
                        setPlayerTwoUsername(playerTwo.username);
                    }
                    if (playerTwoRole !== playerTwo.role) {
                        setPlayerTwoRole(playerTwo.role);
                    }
                    if (playerTwoScore !== playerTwo.score) {
                        setPlayerTwoScore(playerTwo.score);
                    }
                }
                forceUpdate();
            }
            else {
                alert('You are OUT from this tournament now due to lose!');
                changeUrl('/player/dashboard');
            }
        }
    }

    function updateBetCounter(tournament) {
        let time = "";
        tournament.currentPlayers.forEach((player) => {
            if (player.userId === userId && playerOneScore > 0 && playerTwoScore > 0) {
                if (player.no === player.playerToPlay) {
                    time = (tournament.timePerMove - player.betTimeSeconds);
                    time = ((time > 9) ? "00:" + time : "00:0" + time);
                }
            }
        });
        if (time !== "") {
            setBetCounterText(time);
            forceUpdate();
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (playerOnePlayerToPlay === playerOneNo) {
            if (
                selectedAmount > playerOneScore ||
                selectedAmount > playerTwoScore ||
                selectedAmount < 1 ||
                isNaN(selectedAmount)
            ) {
                return;
            }
            if (!selectedChoice) {
                return;
            }
            socket.emit('addbet', { tournamentId: tournamentId, userId: playerOneUserId, bet: selectedAmount, choice: selectedChoice });

            setBetCounterText("");
            setSelectedChoice('even');
            setSelectedAmount(1);

            forceUpdate();
        }
    }

    function sendMessage(e) {
        if (message && playerOneUserId) {
            socket.emit('message', { tournamentId: tournamentId, userId: playerOneUserId, message: message });
            setMessage('');

            forceUpdate();
        }
    }

    const Confettiful = function (el) {
        let confettiColors = ["#fce18a", "#ff726d", "#b48def", "#f4306d"];
        let confettiAnimations = ["slow", "medium", "fast"];
        const containerEl = document.createElement("div");
        const elPosition = el.style.position;
        if (elPosition !== "relative" || elPosition !== "absolute") {
            el.style.position = "relative";
        }
        containerEl.classList.add("confetti-container");
        el.appendChild(containerEl);
        let confettiInterval = setInterval(() => {
            const confettiEl = document.createElement("div");
            const confettiSize = Math.floor(Math.random() * 3) + 7 + "px";
            const confettiBackground =
                confettiColors[
                Math.floor(Math.random() * confettiColors.length)
                ];
            const confettiLeft =
                Math.floor(Math.random() * el.offsetWidth) + "px";
            const confettiAnimation =
                confettiAnimations[
                Math.floor(Math.random() * confettiAnimations.length)
                ];
            confettiEl.classList.add(
                "confetti",
                "confetti--animation-" + confettiAnimation
            );
            confettiEl.style.left = confettiLeft;
            confettiEl.style.width = confettiSize;
            confettiEl.style.height = confettiSize;
            confettiEl.style.backgroundColor = confettiBackground;

            confettiEl.removeTimeout = setTimeout(function () {
                confettiEl.parentNode.removeChild(confettiEl);
            }, 3000);
            containerEl.appendChild(confettiEl);
        }, 25);
    };

    useEffect(() => {
        const asyncFunc = async () => {
            if (socketId) {
                const user = await GetUser(socketId);
                if (!user || user.isAdmin) {
                    changeUrl('/login');
                }
                else {
                    setUserId(user.id);
                    // getting tournamentId from url
                    if (window.location.href.split('?')[1]) {
                        let id = window.location.href.split('?')[1].split('=')[1];
                        if (id) {
                            setTournamentId(id);
                        }
                        else {
                            changeUrl('/player/dashboard');
                        }
                    }
                    else {
                        changeUrl('/player/dashboard');
                    }
                }
            }
        }
        setupFuns();
        asyncFunc();
    }, [socketId]);

    useEffect(() => {
        if (tournamentId && userId) {
            socket.emit('valid', { tournamentId: tournamentId, userId: userId });

            socket.on('valid', (data) => {
                if (data) {
                    if (!data.valid) {
                        alert('You are not allowed to join this tournament!');
                        changeUrl('/player/dashboard');
                    }
                    else {
                        socket.emit('update', { tournamentId: tournamentId, userId: userId });

                        socket.on("counter", (data) => {
                            if (window.location.pathname === "/games/magicmarble") {
                                if (data.tournamentId === tournamentId) {
                                    let time = (60 - data.seconds);
                                    setCounterText(((time > 9) ? "00:" + time : "00:0" + time));
                                    if ((60 - data.seconds) <= 0) {
                                        setCounterText("");
                                    }

                                    forceUpdate();
                                }
                            }
                        });

                        socket.on("betCounter", (data) => {
                            if (window.location.pathname === "/games/magicmarble") {
                                if (data.tournament.id === tournamentId) {
                                    updateBetCounter(data.tournament);
                                }
                            }
                        });

                        socket.on("autoAddBet", (data) => {
                            if (window.location.pathname === "/games/magicmarble") {
                                if (data.tournament.id === tournamentId) {
                                    setBetCounterText("");
                                    setSelectedAmount(1);

                                    forceUpdate();
                                }
                            }
                        });

                        socket.on("update", (data) => {
                            if (window.location.pathname === "/games/magicmarble") {
                                if (data.tournament.id === tournamentId) {
                                    update(data.tournament);
                                }
                            }
                        });

                        socket.on("message", (data) => {
                            if (window.location.pathname === "/games/magicmarble") {
                                if (data.tournamentId === tournamentId) {
                                    let { to } = data;
                                    if (to === myUsername) {
                                        setReceivedMessage(data.message);
                                        forceUpdate();

                                        setTimeout(() => {
                                            setReceivedMessage("");
                                            forceUpdate();
                                        }, 4000);
                                    }
                                }
                            }
                        });

                        socket.on('winRound', (data) => {
                            if (window.location.pathname === "/games/magicmarble") {
                                if (data.tournamentId === tournamentId) {
                                    let { roundWinner } = data;
                                    if (roundWinner === myUsername) {
                                        setWonPlayer(true);
                                        setWonAmount(data.wonAmount);
                                        setReceivedMessage(`You won ${data.wonAmount} marbles in this turn! ????`);
                                        forceUpdate();

                                        setTimeout(() => {
                                            setWonAmount(null);
                                            setReceivedMessage(null);
                                            forceUpdate();
                                        }, 4000);
                                    }
                                    else {
                                        setWonPlayer(false);
                                        setLoseAmount(data.wonAmount);
                                        setReceivedMessage(`You lost ${data.wonAmount} marbles in this turn! ????`);
                                        forceUpdate();
                                        
                                        setTimeout(() => {
                                            setLoseAmount(null);
                                            setReceivedMessage(null);
                                            forceUpdate();
                                        }, 4000);
                                    }
                                }
                            }
                        });

                        socket.on('endTournament', (data) => {
                            if (window.location.pathname === "/games/magicmarble") {
                                if (data.tournamentId === tournamentId) {
                                    alert('Tournament ended!');
                                    changeUrl('/player/dashboard');
                                }
                            }
                        });

                        socket.on("deleteTournament", (data) => {
                            if (window.location.pathname === "/games/magicmarble") {
                                if (data.tournamentId === tournamentId) {
                                    alert('Tournament deleted!');
                                    changeUrl('/player/dashboard');
                                }
                            }
                        });

                        socket.on("alertMessage", (data) => {
                            if (window.location.pathname === "/games/magicmarble") {
                                if (data.result) {
                                    alert(data.result);
                                }
                            }
                        });
                    }
                }
            });
        }
    }, [tournamentId, userId]);

    useEffect(() => {
        if (playerOneScore === 0 || playerTwoScore === 0) {
            let result = '';
            if (playerTwoScore === 0) {
                result = (language === 'en') ? 'You won!????' : '???? ????????????????!????';
                window.confettiful = new Confettiful(document.body);
                setTimeout(() => {
                    const confettiContainer = document.querySelector('.confetti-container')
                    document.body.removeChild(confettiContainer)
                }, 6000);
            }
            else if (playerOneScore === 0) {
                result = (language === 'en') ? 'You lost????' : '???? ??????????????????????';
            }
            setIsOpenPopup(true);
            setPopupResult(result);
        }
        let logsDiv = document.getElementById('logs');
        if (logsDiv) {
            logsDiv.scrollTop = logsDiv.scrollHeight;
        }
    }, [playerOneScore, playerTwoScore]);

    return (
        <>
            <div className='relative w-full lg:flex lg:gap-4 bg-[#0e1232]'>
                <SideBar changeUrl={changeUrl} />
                <div className='grow'>
                    <div className='relative flex flex-col w-full lg:w-[90%] mx-auto'>
                        <TopBar counterText={counterText} language={language} setLanguage={setLanguage} />
                        <div className='lg:flex'>
                            <div className='flex flex-col w-full lg:w-[65%] lg:p-5'>
                                <>
                                    <div id="layer-p2">
                                        {playerTwoUserId ?
                                            renderPlayer(playerTwoUserId, playerTwoUsername, playerTwoRole, playerTwoScore)
                                            :
                                            <Loading />
                                        }
                                    </div>
                                    <div id="layer-p1">
                                        {playerOneUserId ?
                                            <>
                                                {renderPlayer(playerOneUserId, playerOneUsername, playerOneRole, playerOneScore)}

                                            </>
                                            :
                                            <Loading />
                                        }
                                    </div>
                                </>
                                <div id='layer-bet' style={{ display: (playerOneNo === playerOnePlayerToPlay && playerOneScore > 0 && playerTwoScore > 0) ? 'flex' : 'none' }}>
                                    {betCounterText &&
                                        <div className='text-center flex gap-2 align-middle bg-[#1c2258] lg:bg-[#0e1232] text-white text-2xl md:text-3xl px-2 pt-2 pb-1 rounded-xl'>
                                            <img className='w-8 h-8' src='/images/pac-marble.png' alt="pac-marble" />
                                            <p>
                                                {betCounterText}
                                            </p>
                                        </div>
                                    }
                                    <div className="wrapper">
                                        <input id="bet-type" value={selectedChoice} type="checkbox" onClick={(e) => {
                                            setSelectedChoice(((selectedChoice === 'even') ? 'odd' : 'even'));
                                        }} />
                                        <label id="bet" htmlFor="bet-type">
                                            <span></span>
                                        </label>
                                        <div id="even">Even</div>
                                        <div id="odd">Odd</div>
                                    </div>
                                    <input
                                        id="bet-amount"
                                        type="range"
                                        min="1"
                                        max={playerOneScore >= playerTwoScore ? playerTwoScore : playerOneScore}
                                        step="1"
                                        list="tickmarks"
                                        value={selectedAmount}
                                        onChange={(e) => setSelectedAmount(e.target.value)}
                                    />
                                    <datalist id="tickmarks">
                                        {playerOneScore <= playerTwoScore ?
                                            renderOptions(playerOneScore)
                                            :
                                            renderOptions(playerTwoScore)
                                        }
                                    </datalist>
                                    <div id="bet-ticks">
                                        {playerOneScore <= playerTwoScore ?
                                            renderTicks(playerOneScore)
                                            :
                                            renderTicks(playerTwoScore)
                                        }
                                    </div>
                                    <button className="game-button" onClick={handleSubmit}>Submit</button>
                                </div>
                            </div>
                            <div className='static flex w-full bottom-0 justify-center lg:w-[35%] md:flex-col'>
                                <div id="layer-stats">
                                    {playerOneUserId ?
                                        <>
                                            <div id="stats-left">
                                                <div id="tournament-info">
                                                    <div id="tournament-name">Tournament</div>
                                                    <div id="tournament-prize">
                                                        <div id="tournament-prize-sum">20000</div>
                                                        <div id="tournament-prize-currency">USDT</div>
                                                    </div>
                                                    <div>Prize</div>
                                                </div>
                                                <div id="tournament-stats">
                                                    <div className="tournament-stats">
                                                        <div id="current-round">0</div>
                                                        <div>Current round</div>
                                                    </div>
                                                    <div className="tournament-stats">
                                                        <div id="rounds-to-prize">6</div>
                                                        <div>Rounds to prize</div>
                                                    </div>
                                                    <div className="tournament-stats">
                                                        <div id="number-of-players">1024</div>
                                                        <div>Number of players</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="stats-right">
                                                <div className="stats-line one">
                                                    <div className="pointer">You are here</div>
                                                    <div className="amount">20k</div>
                                                </div>
                                                <div className="stats-line  two">
                                                    <div className="pointer">You are here</div>
                                                    <div className="amount">10k</div>
                                                </div>
                                                <div className="stats-line three">
                                                    <div className="pointer">You are here</div>
                                                    <div className="amount">5k</div>
                                                </div>
                                                <div className="stats-line four">
                                                    <div className="pointer">You are here</div>
                                                </div>
                                                <div className="stats-line five">
                                                    <div className="pointer">You are here</div>
                                                </div>
                                                <div className="stats-line six">
                                                    <div className="pointer">You are here</div>
                                                </div>
                                                <div className="stats-line seven">
                                                    <div className="pointer">You are here</div>
                                                </div>
                                                <div className="stats-line eight">
                                                    <div className="pointer">You are here</div>
                                                </div>
                                                <div className="stats-line nine">
                                                    <div className="pointer current">You are here</div>
                                                </div>
                                            </div>
                                        </>
                                        :
                                        <Loading />
                                    }
                                </div>
                                <div id="layer-chat" className="down z-0">
                                    <img className="swipe-img" src="/icons/arrow.svg" alt="arrow" />
                                    <div className="swipe-info">Swipe up to see history and chat</div>
                                    <div className="chat-info rounded-lg overflow-y-auto z-10" id='logs'>
                                        {playerOneLogs.length > 0 ?
                                            playerOneLogs.map((log, index) => (
                                                <p key={index} className="">
                                                    {log.type === "info" ? (
                                                        <span className="text-gray-500">{log.message}</span>
                                                    ) : log.type === "round" ? (
                                                        <span className="text-red-500">{log.message}</span>
                                                    ) : (
                                                        <span className="text-white"><b>{log.by}</b> - {log.message}</span>
                                                    )
                                                    }
                                                </p>
                                            ))
                                            :
                                            <Loading />
                                        }
                                    </div>
                                    {playerOneUserId &&
                                        <div className='chat-prompt'>
                                            <div>
                                                <input
                                                    id="message"
                                                    type="text"
                                                    value={message}
                                                    onChange={(e) => setMessage(e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            sendMessage(e);
                                                        }
                                                    }}
                                                    placeholder="Tap to send a message"
                                                />
                                                <button onClick={sendMessage} className="bg-green-400 text-white text-sm my-auto p-2 m-0 rounded-md">
                                                    Send
                                                </button>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        {isOpenPopup &&
                            <div id="popup">
                                <div id="popupResult" className='px-24 py-12 border-2 text-5xl font-medium border-white'>
                                    {playerOneUsername + ',' + popupResult}
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

{/* */ }