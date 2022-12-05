//
window.addEventListener("load", (event) => {
  updateLink();
  switchLanguage();
});

// INITIAL VALUES

// PLAYER 1
// Display info
const nameOne = document.querySelector(".name.one");
const roleOne = document.querySelector(".role.one");
const scoreOne = document.querySelector(".score.one");
const marblesOne = document.querySelector(".marbles.one");
// Bet values (can be accessed with betType.value & betAmount.value)
const betType = document.getElementById("bet-type");
const betAmount = document.getElementById("bet-amount");

// PLAYER 2
// Display info
const nameTwo = document.querySelector(".name.two");
const roleTwo = document.querySelector(".role.two");
const scoreTwo = document.querySelector(".score.two");
const marblesTwo = document.querySelector(".marbles.two");

// CONTROLLERS

// Rules
function updateLink() {
  if (language === "EN") {
    rules.setAttribute("href", "#rulesEN");
  } else {
    rules.setAttribute("href", "#rulesRU");
  }
}

// Language
let language = "EN";

const languageSwitch = document.getElementById("language-switch");
languageSwitch.addEventListener("click", () => {
  switchLanguage();
  updateLink();
  renderLanguage();
});

function switchLanguage() {
  const ru = document.getElementById("ru");
  const en = document.getElementById("en");
  if (languageSwitch.checked === true) {
    ru.classList.remove("hidden");
    en.classList.add("hidden");
    language = "RU";
  } else {
    en.classList.remove("hidden");
    ru.classList.add("hidden");
    language = "EN";
  }
}

const rules = document.getElementById("rules");
const submit = document.getElementById("submit");
const message = document.getElementById("message");

function renderLanguage() {
  if (language === "EN") {
    rules.innerHTML = "Game rules";
    roleOne.innerHTML = "Guesser";
    roleTwo.innerHTML = "Hider";
    even.innerHTML = "Even";
    odd.innerHTML = "Odd";
    submit.innerHTML = "Submit";
    swipeInfo.innerHTML = "Swipe up to see history and chat";
    message.setAttribute("placeholder", "Tap to send a message");
  } else {
    rules.innerHTML = "Правила игры";
    roleOne.innerHTML = "Отгадывающий";
    roleTwo.innerHTML = "Загадывающий";
    even.innerHTML = "Четное";
    odd.innerHTML = "Нечетное";
    submit.innerHTML = "Отправить";
    swipeInfo.innerHTML = "Смахните вверх, чтобы увидеть историю и чат";
    message.setAttribute("placeholder", "Нажмите, чтобы отправить сообщение");
  }
}

// Music
const play = document.getElementById("play");
const music = document.getElementById("music");

play.onclick = () => {
  play.classList.toggle("on");
  play.classList.contains("on") ? music.play() : music.pause();
};

// Marbles
function renderMarbles() {
  marblesOne.innerHTML = "";
  for (let i = 0; i < Number(scoreOne.innerHTML); i++) {
    const marble = document.createElement("div");
    marble.classList.add("marble");
    marblesOne.appendChild(marble);
  }
  marblesTwo.innerHTML = "";
  for (let i = 0; i < Number(scoreTwo.innerHTML); i++) {
    const marble = document.createElement("div");
    marble.classList.add("marble");
    marblesTwo.appendChild(marble);
  }
}

// betType
betType.addEventListener("click", () => {
  if (betType.checked === true) {
    betType.value = "odd";
  } else {
    betType.value = "even";
  }
});

// betAmount
const tickOne = document.querySelector(".tick.one");
tickOne.addEventListener("click", () => {
  if (tickOne.classList.contains("ticked")) {
    tickTwo.classList.remove("ticked");
    tickThree.classList.remove("ticked");
    tickFour.classList.remove("ticked");
    tickFive.classList.remove("ticked");
    tickSix.classList.remove("ticked");
    tickSeven.classList.remove("ticked");
    tickEight.classList.remove("ticked");
    tickNine.classList.remove("ticked");
    tickTen.classList.remove("ticked");
  } else {
    tickOne.classList.add("ticked");
  }
  betAmount.value = 1;
});

const tickTwo = document.querySelector(".tick.two");
tickTwo.addEventListener("click", () => {
  if (tickTwo.classList.contains("ticked")) {
    tickThree.classList.remove("ticked");
    tickFour.classList.remove("ticked");
    tickFive.classList.remove("ticked");
    tickSix.classList.remove("ticked");
    tickSeven.classList.remove("ticked");
    tickEight.classList.remove("ticked");
    tickNine.classList.remove("ticked");
    tickTen.classList.remove("ticked");
  } else {
    tickOne.classList.add("ticked");
    tickTwo.classList.add("ticked");
  }
  betAmount.value = 2;
});

const tickThree = document.querySelector(".tick.three");
tickThree.addEventListener("click", () => {
  if (tickThree.classList.contains("ticked")) {
    tickFour.classList.remove("ticked");
    tickFive.classList.remove("ticked");
    tickSix.classList.remove("ticked");
    tickSeven.classList.remove("ticked");
    tickEight.classList.remove("ticked");
    tickNine.classList.remove("ticked");
    tickTen.classList.remove("ticked");
  } else {
    tickOne.classList.add("ticked");
    tickTwo.classList.add("ticked");
    tickThree.classList.add("ticked");
  }
  betAmount.value = 3;
});

const tickFour = document.querySelector(".tick.four");
tickFour.addEventListener("click", () => {
  if (tickFour.classList.contains("ticked")) {
    tickFive.classList.remove("ticked");
    tickSix.classList.remove("ticked");
    tickSeven.classList.remove("ticked");
    tickEight.classList.remove("ticked");
    tickNine.classList.remove("ticked");
    tickTen.classList.remove("ticked");
  } else {
    tickOne.classList.add("ticked");
    tickTwo.classList.add("ticked");
    tickThree.classList.add("ticked");
    tickFour.classList.add("ticked");
  }
  betAmount.value = 4;
});

const tickFive = document.querySelector(".tick.five");
tickFive.addEventListener("click", () => {
  if (tickFive.classList.contains("ticked")) {
    tickSix.classList.remove("ticked");
    tickSeven.classList.remove("ticked");
    tickEight.classList.remove("ticked");
    tickNine.classList.remove("ticked");
    tickTen.classList.remove("ticked");
  } else {
    tickOne.classList.add("ticked");
    tickTwo.classList.add("ticked");
    tickThree.classList.add("ticked");
    tickFour.classList.add("ticked");
    tickFive.classList.add("ticked");
  }
  betAmount.value = 5;
});

const tickSix = document.querySelector(".tick.six");
tickSix.addEventListener("click", () => {
  if (tickSix.classList.contains("ticked")) {
    tickSeven.classList.remove("ticked");
    tickEight.classList.remove("ticked");
    tickNine.classList.remove("ticked");
    tickTen.classList.remove("ticked");
  } else {
    tickOne.classList.add("ticked");
    tickTwo.classList.add("ticked");
    tickThree.classList.add("ticked");
    tickFour.classList.add("ticked");
    tickFive.classList.add("ticked");
    tickSix.classList.add("ticked");
  }
  betAmount.value = 6;
});

const tickSeven = document.querySelector(".tick.seven");
tickSeven.addEventListener("click", () => {
  if (tickSeven.classList.contains("ticked")) {
    tickEight.classList.remove("ticked");
    tickNine.classList.remove("ticked");
    tickTen.classList.remove("ticked");
  } else {
    tickOne.classList.add("ticked");
    tickTwo.classList.add("ticked");
    tickThree.classList.add("ticked");
    tickFour.classList.add("ticked");
    tickFive.classList.add("ticked");
    tickSix.classList.add("ticked");
    tickSeven.classList.add("ticked");
  }
  betAmount.value = 7;
});

const tickEight = document.querySelector(".tick.eight");
tickEight.addEventListener("click", () => {
  if (tickEight.classList.contains("ticked")) {
    tickNine.classList.remove("ticked");
    tickTen.classList.remove("ticked");
  } else {
    tickOne.classList.add("ticked");
    tickTwo.classList.add("ticked");
    tickThree.classList.add("ticked");
    tickFour.classList.add("ticked");
    tickFive.classList.add("ticked");
    tickSix.classList.add("ticked");
    tickSeven.classList.add("ticked");
    tickEight.classList.add("ticked");
  }
  betAmount.value = 8;
});

const tickNine = document.querySelector(".tick.nine");
tickNine.addEventListener("click", () => {
  if (tickNine.classList.contains("ticked")) {
    tickTen.classList.remove("ticked");
  } else {
    tickOne.classList.add("ticked");
    tickTwo.classList.add("ticked");
    tickThree.classList.add("ticked");
    tickFour.classList.add("ticked");
    tickFive.classList.add("ticked");
    tickSix.classList.add("ticked");
    tickSeven.classList.add("ticked");
    tickEight.classList.add("ticked");
    tickNine.classList.add("ticked");
  }
  betAmount.value = 9;
});

const tickTen = document.querySelector(".tick.ten");
tickTen.addEventListener("click", () => {
  if (tickTen.classList.contains("ticked")) {
    return;
  } else {
    tickOne.classList.add("ticked");
    tickTwo.classList.add("ticked");
    tickThree.classList.add("ticked");
    tickFour.classList.add("ticked");
    tickFive.classList.add("ticked");
    tickSix.classList.add("ticked");
    tickSeven.classList.add("ticked");
    tickEight.classList.add("ticked");
    tickNine.classList.add("ticked");
    tickTen.classList.add("ticked");
  }
  betAmount.value = 10;
});

// Swipe
const layerChat = document.getElementById("layer-chat");
const chatPrompt = document.querySelector(".chat-prompt");
const swipeInfo = document.querySelector(".swipe-info");
const swipeImg = document.querySelector(".swipe-img");

let touchStartY = 0;
let touchEndY = 0;

function checkDirection() {
  if (touchEndY < touchStartY) {
    layerChat.classList.add("up");
    chatPrompt.classList.add("visible");
    swipeInfo.classList.add("none");
    swipeImg.classList.add("rotate");
  }
  if (touchEndY > touchStartY) {
    layerChat.classList.remove("up");
    chatPrompt.classList.remove("visible");
    swipeInfo.classList.remove("none");
    swipeImg.classList.remove("rotate");
  }
}

layerChat.addEventListener("touchstart", (e) => {
  touchStartY = e.changedTouches[0].screenY;
});

layerChat.addEventListener("touchend", (e) => {
  touchEndY = e.changedTouches[0].screenY;
  checkDirection();
});


// Menu controller
const menuLayer = document.getElementById('menu-layer')
const menu = document.getElementById('menu')
menuLayer.addEventListener('click', () => {
  menuLayer.classList.add('closed')
  menu.classList.add('opened')
})

window.addEventListener('click', ({ target }) => {
  if (target !== menu && target !== menuLayer) {
    menuLayer.classList.remove('closed')

    menu.classList.remove('opened')
  }
});

