function initializeMemoryGame() {
    hideCongratulationsPopup();
    resetTimer();
    resetRating();
    createNewBoard();
    addEventListenersToCards();
    addEventListenersToReloadButtons();
    moves = 0;
    matchedCards = [];
    firstCardIsFlipped = false;
    countMoves();
    setupTimer();
}

const board = document.getElementById('board');
const cards = [
    {
        id: 'img-1-1',
        img: 'img/lithuania.png',
    },
    {
        id: 'img-2-1',
        img: 'img/ukraine.png',
    },
    {
        id: 'img-3-1',
        img: 'img/belarus.png',
    },
    {
        id: 'img-4-1',
        img: 'img/germany.png',
    },
    {
        id: 'img-5-1',
        img: 'img/russia.png',
    },
    {
        id: 'img-6-1',
        img: 'img/czech-republic.png',
    },
    {
        id: 'img-7-1',
        img: 'img/slovakia.png',
    },
    {
        id: 'img-8-1',
        img: 'img/poland.png',
    },
    {
        id: 'img-1-2',
        img: 'img/lithuania.png',
    },
    {
        id: 'img-2-2',
        img: 'img/ukraine.png',
    },
    {
        id: 'img-3-2',
        img: 'img/belarus.png',
    },
    {
        id: 'img-4-2',
        img: 'img/germany.png',
    },
    {
        id: 'img-5-2',
        img: 'img/russia.png',
    },
    {
        id: 'img-6-2',
        img: 'img/czech-republic.png',
    },
    {
        id: 'img-7-2',
        img: 'img/slovakia.png',
    },
    {
        id: 'img-8-2',
        img: 'img/poland.png',
    },
];

const cardsLabels = {
    'img-1-1': 'Lithuania',
    'img-1-2': 'Lithuania',
    'img-2-1': 'Ukraine',
    'img-2-2': 'Ukraine',
    'img-3-1': 'Belarus',
    'img-3-2': 'Belarus',
    'img-4-1': 'Germany',
    'img-4-2': 'Germany',
    'img-5-1': 'Russia',
    'img-5-2': 'Russia',
    'img-6-1': 'Czech-Republic',
    'img-6-2': 'Czech-Republic',
    'img-7-1': 'Slovakia',
    'img-7-2': 'Slovakia',
    'img-8-1': 'Poland',
    'img-8-2': 'Poland',
};

const flippedCards = []; // stores cards flipped in 1 move
let firstCardIsFlipped = false; // condition to start counting time
let matchedCards = []; // stores all matched cards

const starOne = document.getElementById('star-one');
const starTwo = document.getElementById('star-two');
const starThree = document.getElementById('star-three');

const bubble = document.getElementById('info-bubble');

let moves = 0;

let countTime;
let seconds = 0;


// CLEARING AND CREATING BOARD
function createNewBoard() {
    board.innerHTML = ''; // clears the board if there is any

    const shuffledBoard = shuffle(cards);

    // creates HTML structure needed to display the board
    for (let i = 0; i < shuffledBoard.length; i++) {
        const cardContainer = document.createElement('li');
        const singleCard = document.createElement('div');
        const figure = document.createElement('figure');
        const secondFigure = document.createElement('figure');
        const imgNode = document.createElement('img');

        board.appendChild(cardContainer);
        cardContainer.appendChild(singleCard);
        singleCard.appendChild(figure);
        singleCard.setAttribute('id', shuffledBoard[i].id);
        const figureFront = singleCard.insertBefore(secondFigure, figure);

        imgNode.classList.add('flag');
        imgNode.setAttribute('src', shuffledBoard[i].img);
        figure.appendChild(imgNode);

        cardContainer.classList.add('card-container');
        singleCard.classList.add('card');
        figure.classList.add('back');
        figureFront.classList.add('front');
    }
}

// SHUFFLING CARDS
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = cards.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }
    return cards;
}

// block: ADDING EVENT LISTENERS

function addEventListenersToCards() {
    const clickedFigures = document.querySelectorAll('.front');
    for (let i = 0; i < clickedFigures.length; i++) {
        clickedFigures[i].addEventListener('click', handleCardClick);
    }
}

function addEventListenersToReloadButtons() {
    const shuffleButton = document.getElementById('reload-btn');
    shuffleButton.addEventListener('click', initializeMemoryGame);

    const modalButton = document.getElementById('modal-btn');
    modalButton.addEventListener('click', initializeMemoryGame);
}

// FLIPPING AND MATCHING CARDS
function handleCardClick(event) {
    const clickedFigure = event.target;
    const parentCard = clickedFigure.parentElement;
    parentCard.classList.add('flipped');
    const figureId = parentCard.getAttribute('id');

    flippedCards.push(figureId); // stores flipped cards id's, max. 2
    firstCardIsFlipped = true;

    if (flippedCards.length === 2) {
        moves = moves + 1;
        countMoves();
        rateWithStars();

        const figureTwo = flippedCards.pop();
        const figureOne = flippedCards.pop();
        const previousCard = document.querySelector('#' + figureOne);
        if (pairIsMatched(figureOne, figureTwo)) {
            setTimeout(function () {
                previousCard.lastChild.classList.add('matched'); // adds style for matched cards
                parentCard.lastChild.classList.add('matched');
            }, 700);

            matchedCards.push(figureTwo); // stores id's of matched cards 
            showInfoBubble(cardsLabels[figureOne]); // passes matching id to function displaying info about flag's owner
            checkWinningCondition();
        } else {
            setTimeout(function () {
                previousCard.classList.remove('flipped'); // flips not matched cards face down
                parentCard.classList.remove('flipped');
            }, 700);
        }
    }
}

function pairIsMatched(figureOne, figureTwo) { // checks if figures' (flags') id's are equal
    const figureOneId = figureOne.substr(0, 5);
    const figureTwoId = figureTwo.substr(0, 5);
    if (figureOneId === figureTwoId) {
        return true;
    } else {
        return false;
    }
}

// COUNTING MOVES
function countMoves() {
    const displayedMovesNumber = document.getElementById('moves-counter');
    if (moves === 1) {
        displayedMovesNumber.innerHTML = moves + ' move';
    } else {
        displayedMovesNumber.innerHTML = moves + ' moves';
    }
}

// block: STAR RATING

function rateWithStars() {
    const starOne = document.getElementById('star-one');
    const starTwo = document.getElementById('star-two');
    const starThree = document.getElementById('star-three');

    if (moves >= 30) {
        starTwo.innerHTML = '<i class="fa fa-star-o" aria-hidden="true"></i>'; // changes full star for empty one
    } else if (moves >= 20) {
        starThree.innerHTML = '<i class="fa fa-star-o" aria-hidden="true"></i>';
    }
}

function displayRating() {
    const ratingInfo = document.getElementById('rating-info'); // shows full stars 
    if (moves >= 30) {
        ratingInfo.innerHTML = '<i class="fa fa-star" aria-hidden="true">';
    } else if (moves >= 20) {
        ratingInfo.innerHTML = '<i class="fa fa-star" aria-hidden="true"></i></i><i class="fa fa-star" aria-hidden="true"></i>';
    } else {
        ratingInfo.innerHTML = '<i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i>';
    }
}

// CHECKING IF USER HAS WON
function checkWinningCondition() {
    if (matchedCards.length === 8) {
        resetTimer();
        displayRating();
        displayTime();
        showCongratulationsPopup();
    }
}

// RESETING SCORES
function resetRating() { // adds to the score panel only full stars
    starOne.innerHTML = '<i class="fa fa-star" aria-hidden="true"></i>';
    starTwo.innerHTML = '<i class="fa fa-star" aria-hidden="true"></i>';
    starThree.innerHTML = '<i class="fa fa-star" aria-hidden="true"></i>';
}

// block: TIMER

function timer(time) { // sets proper display of seconds
    return time > 9 ? time : '0' + time;
}

function getTime() {
    let totalSeconds = timer(seconds % 60);
    let totalMinutes = timer(parseInt(seconds / 60));
    return `${totalMinutes}:${totalSeconds}`;
}

function startCountingTime() {
    if (firstCardIsFlipped) {
        ++seconds
        displayTime();
    }
}

function displayTime() { // adds time to timer elements in the score panel and modal
    document.getElementsByClassName('time')[0].innerHTML = getTime();
    document.getElementsByClassName('time')[1].innerHTML = getTime();
}

function setupTimer() { // counts time every second
    countTime = setInterval(startCountingTime, 1000);
    document.getElementById('timer').innerHTML = '00:00';
    seconds = 0;
}

function resetTimer() {
    clearInterval(countTime);
}

// block: SHOWING AND HIDING CONGRATULATIONS POPUP

function showCongratulationsPopup() {
    setTimeout(function () {
        const modal = document.getElementById('popup-window');
        modal.style.display = 'block';
    }, 900);
}

function hideCongratulationsPopup() {
    const modal = document.getElementById('popup-window');
    modal.style.display = 'none';
}

// block: SHOWING AND HIDING BUBBLE WITH COUNTRY NAME

function showInfoBubble(label) {
    const flagName = document.getElementById('flag-name');
    flagName.innerHTML = label;
    bubble.style.display = 'block';
    hideInfoBubble();
}

function hideInfoBubble() {
    setTimeout(function () {
        bubble.style.display = 'none';
    }, 1900);
}


initializeMemoryGame();
