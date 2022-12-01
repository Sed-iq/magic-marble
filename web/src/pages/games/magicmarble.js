import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { GetUser } from '../../utils';

import './magicmarble.css';

export default function MagicMarble({ socket }) {
    const [userId, setUserId] = useState('');
    const [tournamentId, setTournamentId] = useState('');
    const [playerOne, setPlayerOne] = useState({
        playerId: '',
        no: 0,
        score: null,
        role: null,
        choice: null,
        bet: null,
        betTimeSeconds: null,
        isPlaying: false,
        matchWith: null,
        playerToPlay: null,
        logs: [],
    });
    const [playerTwo, setPlayerTwo] = useState({
        playerId: '',
        no: 0,
        score: null,
        role: null,
        choice: null,
        bet: null,
        betTimeSeconds: null,
        isPlaying: false,
        matchWith: null,
        playerToPlay: null,
        logs: []
    });
    const [selectedChoice, setSelectedChoice] = useState('even');
    const [selectedAmount, setSelectedAmount] = useState(1);
    const [message, setMessage] = useState('');
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [popupResult, setPopupResult] = useState(null);
    const [language, setLanguage] = useState('en');
    const [counterText, setCounterText] = useState('');
    const [betCounterText, setBetCounterText] = useState('');

    const navigate = useNavigate();

    function changeUrl(url) {
        navigate(url);
    }

    function playAudio() {
        let play = document.getElementById('play');
        let music = document.getElementById('music');
        play.classList.toggle("on");
        play.classList.contains("on") ? music.play() : music.pause();
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

    function setupFuns() {
        const layerChat = document.getElementById('layer-chat');
        const chatPrompt = document.querySelector('.chat-prompt');
        const swipeInfo = document.querySelector('.swipe-info');
        const swipeImg = document.querySelector('.swipe-img');
        const chatInfo = document.querySelector('.chat-info');

        let touchStartY = 0
        let touchEndY = 0

        function checkDirection() {
            if (touchEndY < touchStartY) {
                layerChat.classList.add('up');
                chatPrompt.classList.add('visible');
                swipeInfo.classList.add('none');
                swipeImg.classList.add('rotate');
                chatInfo.style.display = 'block';
            }
            if (touchEndY > touchStartY) {
                layerChat.classList.remove('up');
                chatPrompt.classList.remove('visible');
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

    function playRound(roundWinner) {
        console.log("safsafsaf")
        if (playerOne.score === 0 || playerTwo.score === 0) {
            const result = '';
            if (roundWinner === playerOne.username) {
                result = (language === 'EN') ? 'You won!🥳' : 'Ты победили!🥳';
            }
            else if (roundWinner === playerTwo.username) {
                result = (language === 'EN') ? 'You lost🙁' : 'Ты проиграла🙁';
            }
            setIsOpenPopup(true);
            setPopupResult(result);
        }
    }

    function updatePlayers(tournament) {
        tournament.currentPlayers.forEach((player) => {
            if (player.playerId === userId) {
                setPlayerOne(player);
            }
        });
        tournament.currentPlayers.forEach((player) => {
            if (player.playerId === playerOne.matchWith) {
                setPlayerTwo(player);
            }
        });
    }

    function update(tournament) {
        console.log(tournament);
        updatePlayers(tournament);
        if (tournamentId && userId) {
            let idx = tournament.currentPlayers.findIndex((player) => player.playerId === userId);
            if (idx !== -1) {
                let matchWithIdx = tournament.currentPlayers.findIndex((player) => player.playerId === tournament.currentPlayers[idx].matchWith);
                if (matchWithIdx !== -1) {
                    setPlayerOne(tournament.currentPlayers[idx]);
                    setPlayerTwo(tournament.currentPlayers[matchWithIdx]);
                }
            }
            else {
                alert('You are OUT from this tournament now due to lose!');
                changeUrl('/player/dashboard');
            }
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (playerOne.playerToPlay === playerOne.no) {
            if (
                selectedAmount > playerOne.score ||
                selectedAmount > playerTwo.score ||
                selectedAmount < 1 ||
                isNaN(selectedAmount)
            ) {
                return;
            }
            else {
                playerOne.bet = selectedAmount;
            }

            if (selectedChoice) {
                playerOne.choice = selectedChoice;
            }
            else {
                return;
            }

            setBetCounterText('');
            setSelectedAmount(1);
            setSelectedChoice('even');
            socket.emit('addedbet', { tournamentId: tournamentId, player: playerOne });
            playerOne.playerToPlay = 0;
            playerTwo.playerToPlay = 0;
            setPlayerOne(playerOne);
        }
    }

    function sendMessage(e) {
        if (message && playerOne.playerId) {
            socket.emit('message', { tournamentId: tournamentId, playerId: playerOne.playerId, message: message });
            setMessage('');
        }
    }

    useEffect(() => {
        console.log(playerOne)
        console.log(playerTwo)
    }, [playerOne, playerTwo])

    useEffect(() => {
        const asyncFunc = async () => {
            const user = await GetUser(socket);
            if (!user || user.isAdmin) {
                changeUrl('/login');
            }
            else {
                if (window.location.href.split('?')[1]) {
                    let tournId = window.location.href.split('?')[1].split('=')[1];
                    if (tournId) {
                        setUserId(user.id);
                        setTournamentId(tournId);
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
        setupFuns();
        asyncFunc();
    }, [socket]);

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
                                }
                            }
                        });

                        socket.on("betCounter", (data) => {
                            if (window.location.pathname === "/games/magicmarble") {
                                updatePlayers(data.tournament);
                                console.log(data.tournament);
                                data.tournament.currentPlayers.forEach((player) => {
                                    if (player.playerId === userId && playerOne.score > 0 && playerTwo.score > 0) {
                                        if (player.no === player.playerToPlay) {
                                            let time = (data.tournament.timePerMove - player.betTimeSeconds);
                                            setBetCounterText((time > 9 ? "00:" + time : "00:0" + time));
                                        }
                                    }
                                })
                            }
                        });

                        socket.on("autoAddBet", (data) => {
                            if (window.location.pathname === "/games/magicmarble") {
                                setBetCounterText("");
                                setSelectedAmount(1);
                            }
                        });

                        socket.on("updatePlayers", (data) => {
                            if (window.location.pathname === "/games/magicmarble") {
                                updatePlayers(data.tournament);
                            }
                        });

                        socket.on("update", (data) => {
                            if (window.location.pathname === "/games/magicmarble") {
                                update(data.tournament);
                            }
                        });

                        socket.on('playRound', (data) => {
                            if (window.location.pathname === "/games/magicmarble") {
                                playRound(data.roundWinner);
                            }
                        });

                        socket.on('endTournament', (data) => {
                            if (window.location.pathname === "/games/magicmarble") {
                                alert('Tournament ended!');
                                changeUrl('/player/dashboard');
                            }
                        });

                        socket.on("deleteTournament", (data) => {
                            if (window.location.pathname === "/games/magicmarble") {
                                alert('Tournament deleted!');
                                changeUrl('/player/dashboard');
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

    return (
        <div id="main-side">
            <div className='absolute top-5 inset-x-0 text-center text-white text-2xl rouned p-2' style={{ display: (counterText !== '' ? 'block' : 'none') }}>{counterText}</div>
            <div id="main-top">
                <div id="top-panel">
                    <a className="link" id="rules" onClick={showRules}>Game rules</a>
                    <div id="rulesEN" className="overlay">
                        <div className="rulesPopupEN">
                            <h2 id="rulesResultEN">
                                Game rules<a className="link close closeEN">×</a>
                            </h2>
                            <ul className="list-style">
                                <li>Each player is dealt 10 marbles at the start.</li>
                                <li>
                                    There are only 2 players (i.e./ 'Hider' and 'Guesser').
                                    Players change roles after each round.
                                </li>
                                <li>
                                    Objective of the game is to collect all of your opponent’s
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
                                Правила игры<a className="link close closeRU">×</a>
                            </h2>
                            <ul className="list-style">
                                <li>В начале игры каждый игрок получает 10 шаров.</li>
                                <li>
                                    Существует только 2 игрока - Отгадывающий и Загадывающий.
                                    Игроки меняются ролями после каждого раунда.
                                </li>
                                <li>Цель игры - выиграть все шары соперника.</li>
                                <li>
                                    В начале раунда Загадывающий выбирает число шаров от 1 до 10.
                                    Цель Отгадывающего - разгадать замысел соперника (четное или
                                    нечетное).
                                </li>
                                <li>
                                    Приз каждого раунда определяется размером ставки
                                    Отгадывающего.
                                </li>
                                <li>
                                    Пример 1: Загадывающий выбирает 3 шара. Отгадывающий
                                    предполагает, что соперник выбрал нечетное число и делает
                                    ставку в 2 шара. Результат: Отгадывающий выигрывает 2 шара.
                                </li>
                                <li>
                                    Пример 2: Загадывающий выбирает 5 шаров. Отгадывающий
                                    предполагает, что соперник выбрал четное число и ставит 8
                                    шаров. Результат: Загадывающий выигрывает 8 шаров.
                                </li>
                                <li>
                                    Если у одного из игроков остается только 1 шар, он может быть
                                    только в роли Отгадывающего.
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div id="top-panel-right">
                        <div>
                            <input id="language-switch" type="checkbox" value={language} onChange={(e) => {
                                setLanguage(language === 'en' ? 'ru' : 'en');
                            }} />
                            <label id="language" htmlFor="language-switch">
                                <span></span>
                                <div className={language === 'ru' ? '' : 'hidden'} id="ru">RU</div>
                                <div className={language === 'en' ? '' : 'hidden'} id="en">EN</div>
                            </label>
                        </div>
                        <button id="play" onClick={playAudio}>
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
                <div id="top-header">
                    <div>MAGIC</div>
                    <div>MARBLE</div>
                </div>
                <img id="img-mobile" src="/images/central-logo.svg" alt="" />
                <img id="img-wide" src="/images/renewed-logo.svg" alt="" />
            </div>
            <div id="main-bot">
                <div id="bot-left">
                    <div id="layer-p2">
                        <div className="info">
                            <img className={'inline-block w-10 h-10 rounded-full' + ((playerTwo.playerId !== '') ? '' : ' hidden')}
                                src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                                alt="Avatar of Jonathan Reinink" />
                            <div>
                                <div className="name two">{playerTwo.username}</div>
                                <div className="role two">{playerTwo.role}</div>
                            </div>
                        </div>
                        <div className="score two">{playerTwo.score}</div>
                        <div className="marbles two">
                            {renderMarbles(playerTwo.score)}
                        </div>
                    </div>
                    <div id="layer-p1">
                        <div className="info">
                            <img className={'inline-block w-10 h-10 rounded-full' + ((playerOne.playerId !== '') ? '' : ' hidden')}
                                src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                                alt="Avatar of Jonathan Reinink" />
                            <div>
                                <div className="name one">{playerOne.username}</div>
                                <div className="role one">{playerOne.role}</div>
                            </div>
                        </div>
                        <div className="score one">{playerOne.score}</div>
                        <div className="marbles one">
                            {renderMarbles(playerOne.score)}
                        </div>
                    </div>
                    <div id='layer-bet' style={{ display: (playerOne.playerToPlay === playerOne.no && playerOne.score > 0 && playerTwo.score > 0) ? 'flex' : 'none' }}>
                        <div className={'text-center flex gap-2 align-middle bg-[#1c2258] md:bg-[#0e1232] text-white text-2xl md:text-3xl px-2 pt-2 pb-1 rounded-xl' + (betCounterText === '' ? ' hidden' : '')}>
                            <img className='w-8 h-8' src='/images/pac-marble.png'></img>
                            <span>
                                {betCounterText}
                            </span>
                        </div>
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
                            max={playerOne.score >= playerTwo.score ? playerTwo.score : playerOne.score}
                            step="1"
                            list="tickmarks"
                            value={selectedAmount}
                            onChange={(e) => setSelectedAmount(e.target.value)}
                        />
                        <datalist id="tickmarks">
                            {playerOne.score <= playerTwo.score ?
                                renderOptions(playerOne.score)
                                :
                                null
                            }
                            {playerOne.score > playerTwo.score ?
                                renderOptions(playerTwo.score)
                                :
                                null
                            }
                        </datalist>
                        <div id="bet-ticks">
                            {playerOne.score <= playerTwo.score ?
                                renderTicks(playerOne.score)
                                :
                                null
                            }
                            {playerOne.score > playerTwo.score ?
                                renderTicks(playerTwo.score)
                                :
                                null
                            }
                        </div>
                        <button className="game-button" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
                <div id="bot-right">
                    <div id="layer-stats">
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
                                    <div id="current-round">{playerOne.totalRounds}</div>
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
                    </div>
                    <div id="layer-chat" className="down z-0">
                        <img className="swipe-img" src="/icons/arrow.svg" alt="" />
                        <div className="swipe-info">Swipe up to see history and chat</div>
                        <div className="chat-info rounded-lg overflow-y-auto z-10">
                            {playerOne.logs.map((log, index) => (
                                <p key={index} className="">
                                    {log.type === "info" ? (
                                        <span className="text-gray-500">{log.message}</span>
                                    ) : log.type === "round" ? (
                                        <span className="text-red-500">{log.message}</span>
                                    ) : (
                                        <span className="text-white">{log.message}</span>
                                    )
                                    }
                                </p>
                            ))}
                        </div>
                        <div className='chat-prompt' style={{ display: (playerOne.playerId !== '' ? 'flex' : 'none') }}>
                            <div>
                                <input
                                    id="message"
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Tap to send a message"
                                />
                                <button onClick={sendMessage} className="bg-green-400 text-white text-sm my-auto p-2 m-0 rounded-md">
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="popup" className={(isOpenPopup ? '' : 'hidden')}>
                <div id="popupResult">
                    {popupResult}
                </div>
            </div>
        </div>
    );
}