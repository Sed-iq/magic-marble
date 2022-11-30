/*
  *Marbles Game Class*
  Each page class has three functions:
  - constructor (optional): contains the page's data
  - load (optional): loads the page
  - render: renders the page,
  One variable:
  - urls: an array of urls that the page will be rendered on (you can add more than one urls)

  We can own functions and variables in the class, and use them in the other functions.
*/

export default class MarblesGame {
  constructor() {
    this.urls = ['/games/marblesgame'];

    this.currentTournamentId = null;
    this.currentUser = null;

    this.playerOne;
    this.playerTwo;

    this.roundCount = 0;
    this.language = 'EN';

    this.isStartedTournament = false;

    this.roundWinner = null;
    this.wonAmount = null;
    this.outcome = null;
    this.counter = null;
    this.betForm = null;
    this.rules = null;
    this.roleOne = null;
    this.roleTwo = null;
    this.logs = null;
    this.marblesOne = null;
    this.marblesTwo = null;
    this.languageBtn = null;
    this.submitBetOne = null;
    this.betFieldOne = null;
  }
  async onLoad() {
    this.currentUser = await GetUser();
    if (this.currentUser) {
      if (window.location.href.split('?')[1]) {
        this.currentTournamentId = window.location.href.split('?')[1].split('=')[1];
        if (this.currentTournamentId) {
          socket = GetSocket();
          if (socket) {
            let socket = GetSocket();
            socket.emit('valid', { tournamentId: this.currentTournamentId, userId: this.currentUser.id });

            socket.on('valid', (data) => {
              if (data) {
                if (!data.valid) {
                  alert('You are not allowed to join this tournament!');
                  ChangeUrl('/player/dashboard');
                }
                else {
                  const betAmount = document.getElementById('bet-amount')

                  const tickOne = document.querySelector('.tick.one')
                  const tickTwo = document.querySelector('.tick.two')
                  const tickThree = document.querySelector('.tick.three')
                  const tickFour = document.querySelector('.tick.four')
                  const tickFive = document.querySelector('.tick.five')
                  const tickSix = document.querySelector('.tick.six')
                  const tickSeven = document.querySelector('.tick.seven')
                  const tickEight = document.querySelector('.tick.eight')
                  const tickNine = document.querySelector('.tick.nine')
                  const tickTen = document.querySelector('.tick.ten')

                  let betValueChanged = () => {
                    tickOne.classList.remove('ticked');
                    tickTwo.classList.remove('ticked');
                    tickThree.classList.remove('ticked');
                    tickFour.classList.remove('ticked');
                    tickFive.classList.remove('ticked');
                    tickSix.classList.remove('ticked');
                    tickSeven.classList.remove('ticked');
                    tickEight.classList.remove('ticked');
                    tickNine.classList.remove('ticked');
                    tickTen.classList.remove('ticked');

                    var ticks = [tickOne, tickTwo, tickThree, tickFour, tickFive, tickSix, tickSeven, tickEight, tickNine, tickTen];
                    for (var i = 0; i < betAmount.value; i++) {
                      ticks[i].classList.add('ticked');
                    }
                  }

                  tickOne.addEventListener('click', () => {
                    betAmount.value = 1;
                    betValueChanged();
                  })

                  tickTwo.addEventListener('click', () => {
                    betAmount.value = 2;
                    betValueChanged();
                  })

                  tickThree.addEventListener('click', () => {
                    betAmount.value = 3;
                    betValueChanged();
                  })

                  tickFour.addEventListener('click', () => {
                    betAmount.value = 4;
                    betValueChanged();
                  })

                  tickFive.addEventListener('click', () => {
                    betAmount.value = 5;
                    betValueChanged();
                  })

                  tickSix.addEventListener('click', () => {
                    betAmount.value = 6;
                    betValueChanged();
                  })

                  tickSeven.addEventListener('click', () => {
                    betAmount.value = 7;
                    betValueChanged();
                  })

                  tickEight.addEventListener('click', () => {
                    betAmount.value = 8;
                    betValueChanged();
                  })

                  tickNine.addEventListener('click', () => {
                    betAmount.value = 9;
                    betValueChanged();
                  })

                  tickTen.addEventListener('click', () => {
                    betAmount.value = 10;
                    betValueChanged();
                  })

                  //swipe controller
                  const layerChat = document.getElementById('layer-chat')
                  const chatPrompt = document.querySelector('.chat-prompt')
                  const swipeInfo = document.querySelector('.swipe-info')
                  const swipeImg = document.querySelector('.swipe-img')

                  let touchStartY = 0
                  let touchEndY = 0

                  function checkDirection() {
                    if (touchEndY < touchStartY) {
                      layerChat.classList.add('up')
                      chatPrompt.classList.add('visible')
                      swipeInfo.classList.add('none')
                      swipeImg.classList.add('rotate')
                    }
                    if (touchEndY > touchStartY) {
                      layerChat.classList.remove('up')
                      chatPrompt.classList.remove('visible')
                      swipeInfo.classList.remove('none')
                      swipeImg.classList.remove('rotate')
                    }
                  }

                  layerChat.addEventListener('touchstart', e => {
                    touchStartY = e.changedTouches[0].screenY
                  })

                  layerChat.addEventListener('touchend', e => {
                    touchEndY = e.changedTouches[0].screenY
                    checkDirection()
                  })

                  const play = document.getElementById("play");
                  const music = document.getElementById("music");

                  play.onclick = () => {
                    play.classList.toggle("on");
                    play.classList.contains("on") ? music.play() : music.pause();
                  };

                  this.counter = GetHtmlElement('#counter');
                  this.betForm = GetHtmlElement('#layer-bet');
                  this.roleOne = GetHtmlElement('.role.one');
                  this.roleTwo = GetHtmlElement('.role.two');
                  this.logs = GetHtmlElement('#logs');
                  this.marblesOne = GetHtmlElement('.marbles.one');
                  this.marblesTwo = GetHtmlElement('.marbles.two');
                  this.languageBtn = GetHtmlElement('#language');
                  this.submitBetOne = GetHtmlElement('#submit');
                  this.betFieldOne = GetHtmlElement('#bet-amount');
                  this.popup = GetHtmlElement('#popup');
                  this.rules = GetHtmlElement('#rules');


                  this.isStartedTournament = false;

                  this.init();

                  // reqest for update
                  socket.emit('update', { tournamentId: this.currentTournamentId, userId: this.currentUser.id });

                  socket.on("counter", (data) => {
                    let location = window.location.pathname;
                    if (this.urls.includes(location)) {
                      if (this.currentTournamentId === data.tournamentId) {
                        let time = (60 - data.seconds);
                        this.counter.innerHTML = ((time > 9) ? "00:" + time : "00:0" + time);
                        if ((60 - data.seconds) <= 0) {
                          this.counter.innerHTML = '';
                        }
                      }
                    }
                  });

                  socket.on("message", (data) => {
                    let location = window.location.pathname;
                    if (this.urls.includes(location)) {
                      if (data.message) {
                        const popupResult = GetHtmlElement('#popupResult');
                        popupResult.innerHTML = data.message;
                        this.popup.classList.remove('hidden');
                      }
                    }
                  });

                  socket.on("startTournament", (data) => {
                    let location = window.location.pathname;
                    if (this.urls.includes(location)) {
                      this.start();
                    }
                  });

                  socket.on("startRound", (data) => {
                    let location = window.location.pathname;
                    if (this.urls.includes(location)) {
                    }
                  });

                  socket.on("betCounter", (data) => {
                    let location = window.location.pathname;
                    if (this.urls.includes(location)) {
                      this.updatePlayers(data.tournament);
                      data.tournament.currentPlayers.forEach((player) => {
                        if (player.playerId === this.currentUser.id && this.playerOne.score > 0 && this.playerTwo.score > 0) {
                          if (player.no === player.playerToPlay) {
                            let time = (data.tournament.timePerMove - player.betTimeSeconds);
                            this.counter.innerHTML = (time > 9 ? "00:" + time : "00:0" + time);
                          }
                        }
                      })
                    }
                  });

                  socket.on("autoAddBet", (data) => {
                    let location = window.location.pathname;
                    if (this.urls.includes(location)) {
                      this.counter.innerHTML = '';
                      betAmount.value = 1;
                      betValueChanged();
                      this.betFieldOne.value = "1";
                      this.betForm.classList.add("hidden-item");
                    }
                  });

                  socket.on("updatePlayers", (data) => {
                    let location = window.location.pathname;
                    if (this.urls.includes(location)) {
                      this.updatePlayers(data.tournament);
                    }
                  });

                  socket.on("update", (data) => {
                    let location = window.location.pathname;
                    if (this.urls.includes(location)) {
                      this.update(data.tournament);
                    }
                  });

                  socket.on('playRound', (data) => {
                    let location = window.location.pathname;
                    if (this.urls.includes(location)) {
                      if (this.currentUser) {
                        this.roundWinner = data.roundWinner;
                        this.wonAmount = data.wonAmount;
                        this.outcome = data.outcome;
                        this.playRound();
                      }
                    }
                  });

                  socket.on("endRound", (data) => {
                    let location = window.location.pathname;
                    if (this.urls.includes(location)) {
                    }
                  });

                  socket.on('endTournament', (data) => {
                    let location = window.location.pathname;
                    if (this.urls.includes(location)) {
                      alert('Tournament ended!');
                      ChangeUrl('/player/dashboard');
                    }
                  });

                  socket.on("deleteTournament", (data) => {
                    let location = window.location.pathname;
                    if (this.urls.includes(location)) {
                      alert('Tournament deleted!');
                      ChangeUrl('/player/dashboard');
                    }
                  });
                }
              }
            });
          }
        }
        else {
          ChangeUrl('/player/dashboard');
        }
      }
      else {
        ChangeUrl('/player/dashboard');
      }
    }
    else {
      ChangeUrl('/login');
    }
  }
  init() {
    this.submitBetOne.addEventListener('click', this.placeBets);
    this.languageBtn.addEventListener('click', this.changeLanguage);
    this.rules.addEventListener('click', this.showRules);
    this.updateGameLanguage();
  }
  start() {
    this.isStartedTournament = true;
    this.roundCount = 0;
    const playerOneDiv = GetHtmlElement('#layer-p1');
    playerOneDiv.classList.remove('hidden-item');
    const playerTwoDiv = GetHtmlElement('#layer-p2');
    playerTwoDiv.classList.remove('hidden-item');

    this.updateGameLanguage();

    this.playRound();
  }
  updatePlayers(tournament) {
    if (!this.isStartedTournament) {
      this.start();
    }
    tournament.currentPlayers.forEach((player) => {
      if (player.playerId === this.currentUser.id) {
        this.playerOne = player;
      }
    });
    tournament.currentPlayers.forEach((player) => {
      if (player.playerId === this.playerOne.matchWith) {
        this.playerTwo = player;
      }
    });
  }
  update = (tournament) => {
    this.updatePlayers(tournament);
    let idx = tournament.currentPlayers.findIndex((player) => player.playerId === this.currentUser.id);
    if (idx !== -1) {
      let matchWithIdx = tournament.currentPlayers.findIndex((player) => player.playerId === tournament.currentPlayers[idx].matchWith);
      if (matchWithIdx !== -1) {
        this.playerOne = tournament.currentPlayers[idx];
        this.playerTwo = tournament.currentPlayers[matchWithIdx];

        const nameOne = GetHtmlElement('.name.one');
        nameOne.innerHTML = `${this.playerOne.username}`;
        const nameTwo = GetHtmlElement('.name.two');
        nameTwo.innerHTML = `${this.playerTwo.username}`;

        this.renderScore();
        this.renderMarbles();
        this.renderRoles();
        this.resetBetField();

        if (this.playerOne.playerToPlay === this.playerOne.no) {
          this.betForm.classList.remove("hidden-item");
        }
      }
    }
    else {
      alert('You are OUT from this tournament now due to lose!');
      ChangeUrl('/player/dashboard');
    }
  }
  resetBetField = () => {
    if (this.playerOne.no === this.playerOne.playerToPlay) {
      const tickOne = document.querySelector('.tick.one')
      const tickTwo = document.querySelector('.tick.two')
      const tickThree = document.querySelector('.tick.three')
      const tickFour = document.querySelector('.tick.four')
      const tickFive = document.querySelector('.tick.five')
      const tickSix = document.querySelector('.tick.six')
      const tickSeven = document.querySelector('.tick.seven')
      const tickEight = document.querySelector('.tick.eight')
      const tickNine = document.querySelector('.tick.nine')
      const tickTen = document.querySelector('.tick.ten')
      var ticks = [tickOne, tickTwo, tickThree, tickFour, tickFive, tickSix, tickSeven, tickEight, tickNine, tickTen];

      if (this.playerOne.score < this.playerTwo.score) {
        // player one
        for (var i = 0; i < 10; i++) {
          if (i < this.playerOne.score) {
            if (ticks[i].classList.contains("hidden")) {
              ticks[i].classList.remove("hidden");
            }
          }
          else {
            if (!ticks[i].classList.contains("hidden")) {
              ticks[i].classList.add("hidden");
            }
          }
        }
      }
      else {
        // player two
        for (var i = 0; i < 10; i++) {
          if (i < this.playerTwo.score) {
            if (ticks[i].classList.contains("hidden")) {
              ticks[i].classList.remove("hidden");
            }
          }
          else {
            if (!ticks[i].classList.contains("hidden")) {
              ticks[i].classList.add("hidden");
            }
          }
        }
      }
    }
  }
  placeBets = () => {
    if (this.playerOne.playerToPlay === this.playerOne.no) {
      if (
        this.betFieldOne.value > this.playerOne.score ||
        this.betFieldOne.value > this.playerTwo.score ||
        this.betFieldOne.value < 1 ||
        isNaN(this.betFieldOne.value)
      ) {
        return;
      }
      else {
        this.playerOne.bet = this.betFieldOne.value;
      }

      const toggleChoice = document.getElementById("bet-type");
      console.log(toggleChoice.checked)
      if (toggleChoice.checked === false) {
        this.playerOne.choice = "even";
      }
      else if (toggleChoice.checked === true) {
        this.playerOne.choice = "odd";
      }
      else {
        return;
      }

      this.counter.innerHTML = '';
      this.betForm.classList.add("hidden-item");

      let socket = GetSocket();
      socket.emit('addedbet', { tournamentId: this.currentTournamentId, player: this.playerOne });
    }
  }
  playRound = () => {
    this.roundCount++;
    if (this.roundCount === 1) {
      const message = CreateHtmlElemment(
        'p',
        `<div>Players have been assigned roles randomly</div>
        <p><div>Round ${this.roundCount}</div>
        <div>Make your moves</div></p>`
      );
      this.logs.appendChild(message);
      this.logs.scrollTop = this.logs.scrollHeight;
    }
    else if (this.playerOne.score === 0 || this.playerTwo.score === 0) {
      this.betForm.classList.add("hidden-item");
      this.roleOne.classList.add("hidden-item");
      this.roleTwo.classList.add("hidden-item");

      const message = CreateHtmlElemment(
        'p',
        `<div>${this.roundWinner} ${this.outcome} and won ${this.wonAmount} marbles.</div>
        <div>${this.playerOne.username} bet ${this.playerOne.bet} as ${this.playerOne.role} vs ${this.playerTwo.username}'s ${this.playerTwo.bet} as ${this.playerTwo.role}</div>
        <div>Game over</div>
        <div>${this.roundWinner} is the winner</div>`
      );
      this.logs.appendChild(message)
      this.logs.scrollTop = this.logs.scrollHeight;

      const popupResult = GetHtmlElement('#popupResult');
      if (this.roundWinner === this.playerOne.username) {
        popupResult.innerHTML = (this.language === 'EN') ? 'You won!🥳' : 'Ты победили!🥳';
      }
      else if (this.roundWinner === this.playerTwo.username) {
        popupResult.innerHTML = (this.language === 'EN') ? 'You lost🙁' : 'Ты проиграла🙁';
      }
      this.popup.classList.remove('hidden');
    }
    else {
      const message = CreateHtmlElemment(
        'p',
        `<div>${this.roundWinner} ${this.outcome} and won ${this.wonAmount} marbles.</div>
        <div>${this.playerOne.username} bet ${this.playerOne.bet} as ${this.playerOne.role} vs ${this.playerTwo.username}'s ${this.playerTwo.bet} as ${this.playerTwo.role}</div>
        <p><div>Round ${this.roundCount}</div>
        <div>Make your moves</div></p>`
      );
      this.logs.appendChild(message)
      this.logs.scrollTop = this.logs.scrollHeight;
    }
  }
  renderRoles = () => {
    if (this.playerOne) {
      if (this.playerOne.role === 'guesser') {
        this.roleOne.innerHTML = ((this.language === 'EN') ? 'guesser' : 'Угадывающий');
        this.roleTwo.innerHTML = ((this.language === 'EN') ? 'hider' : 'Загадывающий');
      }
      else if (this.playerOne.role === 'hider') {
        this.roleOne.innerHTML = ((this.language === 'EN') ? 'hider' : 'Загадывающий');
        this.roleTwo.innerHTML = ((this.language === 'EN') ? 'guesser' : 'Угадывающий');
      }
    }
  }
  renderScore = () => {
    const scoreOne = GetHtmlElement('.score.one');
    scoreOne.innerHTML = `${this.playerOne.score}`;
    const scoreTwo = GetHtmlElement('.score.two');
    scoreTwo.innerHTML = `${this.playerTwo.score}`;
  }
  renderMarbles = () => {
    this.marblesOne.innerHTML = '';
    for (let i = 0; i < this.playerOne.score; i++) {
      this.marblesOne.innerHTML += '<div class="marble"></div>';
    }
    this.marblesTwo.innerHTML = '';
    for (let i = 0; i < this.playerTwo.score; i++) {
      this.marblesTwo.innerHTML += '<div class="marble"></div>';
    }
  }
  changeLanguage = () => {
    if (this.language === 'EN') {
      this.language = 'RU'
    } else {
      this.language = 'EN'
    }
    this.updateGameLanguage();
  }
  updateGameLanguage = () => {
    const evenLabel = GetHtmlElement('#even');
    const oddLabel = GetHtmlElement('#odd');

    this.renderRoles();

    if (this.language === 'EN') {
      evenLabel.innerHTML = 'Even'
      oddLabel.innerHTML = 'Odd'
      this.submitBetOne.innerHTML = 'Submit'
      this.rules.innerHTML = 'Game Rules'
      const ru = document.getElementById("ru");
      const en = document.getElementById("en");
      ru.classList.add("hidden");
      en.classList.remove("hidden");
    }
    else {
      evenLabel.innerHTML = 'Чет'
      oddLabel.innerHTML = 'Нечет'
      this.submitBetOne.innerHTML = 'Отправить'
      this.rules.innerHTML = 'правила'
      const ru = document.getElementById("ru");
      const en = document.getElementById("en");
      ru.classList.remove("hidden");
      en.classList.add("hidden");
    }
  }
  showRules = () => {
    if (this.language === 'EN') {
      let rulesEN = GetHtmlElement('#rulesEN');
      rulesEN.style.visibility = 'visible';
      rulesEN.style.opacity = '1';
      let closeRules = GetHtmlElement('.closeEN');
      closeRules.addEventListener('click', () => {
        rulesEN.style.visibility = 'hidden';
        rulesEN.style.opacity = '0';
      });
    }
    if (this.language === 'RU') {
      let rulesRU = GetHtmlElement('#rulesRU');
      rulesRU.style.visibility = 'visible';
      rulesRU.style.opacity = '1';
      let closeRules = GetHtmlElement('.closeRU');
      closeRules.addEventListener('click', () => {
        rulesRU.style.visibility = 'hidden';
        rulesEN.style.opacity = '0';
      });
    }
  }
  onRender() {
    return `
    <div id="main-side">
      <div id="counter"></div>
      <div id="main-top">
        <div id="top-panel">
          <a class="link" id="rules">Game rules</a>
          <div id="rulesEN" class="overlay">
            <div class="rulesPopupEN">
              <h2 id="rulesResultEN">
                Game rules<a class="link close closeEN">×</a>
              </h2>
              <ul class="list-style">
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
          <div id="rulesRU" class="overlay">
            <div class="rulesPopupRU">
              <h2 id="rulesResultRU">
                Правила игры<a class="link close closeRU">×</a>
              </h2>
              <ul class="list-style">
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
              <input id="language-switch" type="checkbox" />
              <label id="language" for="language-switch">
                <span></span>
                <div class="hidden" id="ru">RU</div>
                <div id="en">EN</div>
              </label>
            </div>
            <button id="play">
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
          <div id="layer-p2" class="hidden-item">
            <div class="info">
              <div class="name two">Player 2</div>
              <div class="role two">Guesser</div>
            </div>
            <div class="score two"></div>
            <div class="marbles two">
            </div>
          </div>
          <div id="layer-p1" class="hidden-item">
            <div class="info">
              <div class="name one">Player 1</div>
              <div class="role one">Hider</div>
            </div>
            <div class="score one"></div>
            <div class="marbles one">
            </div>
          </div>
          <div id="layer-bet" class="hidden-item">
            <div class="wrapper">
              <input id="bet-type" value="even" type="checkbox" />
              <label id="bet" for="bet-type">
                <span></span>
              </label>
              <div id="even">Even</div>
              <div id="odd">Odd</div>
            </div>
            <input
              id="bet-amount"
              type="range"
              min="1"
              max="10"
              step="1"
              list="tickmarks"
              value="1"
            />
            <datalist id="tickmarks">
              <option value="1"></option>
              <option value="2"></option>
              <option value="3"></option>
              <option value="4"></option>
              <option value="5"></option>
              <option value="6"></option>
              <option value="7"></option>
              <option value="8"></option>
              <option value="9"></option>
              <option value="10"></option>
            </datalist>
            <div id="bet-ticks">
              <div class="tick one ticked">
                <div class="number">1</div>
                <div></div>
              </div>
              <div class="tick two">
                <div class="number">2</div>
                <div></div>
              </div>
              <div class="tick three">
                <div class="number">3</div>
                <div></div>
              </div>
              <div class="tick four">
                <div class="number">4</div>
                <div></div>
              </div>
              <div class="tick five">
                <div class="number">5</div>
                <div></div>
              </div>
              <div class="tick six">
                <div class="number">6</div>
                <div></div>
              </div>
              <div class="tick seven">
                <div class="number">7</div>
                <div></div>
              </div>
              <div class="tick eight">
                <div class="number">8</div>
                <div></div>
              </div>
              <div class="tick nine">
                <div class="number">9</div>
                <div></div>
              </div>
              <div class="tick ten">
                <div class="number">10</div>
                <div></div>
              </div>
            </div>
            <button class="game-button" id="submit">Submit</button>
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
                <div class="tournament-stats">
                  <div id="current-round">9</div>
                  <div>Current round</div>
                </div>
                <div class="tournament-stats">
                  <div id="rounds-to-prize">6</div>
                  <div>Rounds to prize</div>
                </div>
                <div class="tournament-stats">
                  <div id="number-of-players">1024</div>
                  <div>Number of players</div>
                </div>
              </div>
            </div>
            <div id="stats-right">
              <div class="stats-line one">
                <div class="pointer">You are here</div>
                <div class="amount">20k</div>
              </div>
              <div class="stats-line  two">
                <div class="pointer">You are here</div>
                <div class="amount">10k</div>
              </div>
              <div class="stats-line three">
                <div class="pointer">You are here</div>
                <div class="amount">5k</div>
              </div>
              <div class="stats-line four">
                <div class="pointer">You are here</div>
              </div>
              <div class="stats-line five">
                <div class="pointer">You are here</div>
              </div>
              <div class="stats-line six">
                <div class="pointer">You are here</div>
              </div>
              <div class="stats-line seven">
                <div class="pointer">You are here</div>
              </div>
              <div class="stats-line eight">
                <div class="pointer">You are here</div>
              </div>
              <div class="stats-line nine">
                <div class="pointer current">You are here</div>
              </div>
            </div>
          </div>
          <div id="layer-chat" class="down">
            <img class="swipe-img" src="/icons/arrow.svg" alt="" />
            <div class="swipe-info">Swipe up to see history and chat</div>
            <div id="logs" class="chat-info"></div>
            <div class="chat-prompt">
              <div>
                <input
                  id="message"
                  type="text"
                  placeholder="Tap to send a message"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="popup" class="hidden">
        <div id="popupResult">
        </div>
      </div>
    </div>
    `;
  }
}