const gameBoard = document.getElementById("gameBoard");
const restartBtn = document.getElementById("restartBtn");

const cardIcons = ["🍎", "🍌", "🍓", "🍇", "🍉", "🍋", "🥝", "🍒"];
let cards = [...cardIcons, ...cardIcons]; 

let firstCard, secondCard;
let lockBoard = false;
let matchedPairs = 0;

function shuffleCards() {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
}

function createBoard() {
  gameBoard.innerHTML = "";
  shuffleCards();

  cards.forEach((icon) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="front">${icon}</div>
      <div class="back"></div>
    `;
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard || this === firstCard) return;

  this.classList.add("flip");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkMatch();
}

function checkMatch() {
  const isMatch =
    firstCard.querySelector(".front").textContent ===
    secondCard.querySelector(".front").textContent;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  matchedPairs++;

  resetBoard();

  if (matchedPairs === cardIcons.length) {
    setTimeout(() => alert("Congratulations, You found all pairs!"), 300);
  }
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

restartBtn.addEventListener("click", () => {
  matchedPairs = 0;
  resetBoard();
  createBoard();
});

createBoard();
