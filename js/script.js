const gameContainer = document.getElementById('game-container');
const resetButton = document.getElementById('reset-button');
const timerElement = document.getElementById('timer');
const congratulationsMessage = document.getElementById('congratulations-message');
const playAgainButton = document.getElementById('play-again-button');

let firstCard = null;
let secondCard = null;
let matchedCards = 0;
let timer = 0;
let timerInterval = null;

const cardValues = ['😍','😘','🥰','😴','😪','😭','😝','😇'];

function startGame() {
    const shuffledCards = shuffle([...cardValues, ...cardValues]);
    gameContainer.innerHTML = '';
    matchedCards = 0;
    timer = 0;
    timerElement.textContent = `Time: ${timer}s`;

    shuffledCards.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.textContent = value;

        card.addEventListener('click', flipCard);

        gameContainer.appendChild(card);
    });

    startTimer();
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function flipCard() {
    if (firstCard && secondCard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');
    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        checkForMatch();
    }
}

function checkForMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedCards += 2;
        resetCards();

        if (matchedCards === cardValues.length * 2) {
            clearInterval(timerInterval);
            setTimeout(() => {
                congratulationsMessage.style.display = 'block';
            }, 500);
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetCards();
        }, 1000);
    }
}

function resetCards() {
    firstCard = null;
    secondCard = null;
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timer++;
        timerElement.textContent = `Time: ${timer}s`;
    }, 1000);
}

resetButton.addEventListener('click', () => {
    congratulationsMessage.style.display = 'none';
    startGame();
});

playAgainButton.addEventListener('click', () => {
    congratulationsMessage.style.display = 'none';
    startGame();
});

// Start the game initially
startGame();


