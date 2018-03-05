function initializeMemoryGame() {
    closeCongratulationsPopup();
    createNewBoard();
    addEventListenersToCards();
    addEventListenersToReloadButtons();
    countMoves();
    startCountingTime();
    displayTime();
    rateWithStars();
}
/*
 * Create a list that holds all cards
 */
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

const flippedCards = [];
const matchedCards = [];
const starOne = document.getElementById('star-one');
const starTwo = document.getElementById('star-two');
const starThree = document.getElementById('star-three');
const bubble = document.getElementById('info-bubble');
let moves = 0;

let seconds = 0;
const countTime = setInterval(startCountingTime, 1000);


// CREATING NEW BOARD
function createNewBoard() {
    const shuffledBoard = shuffle(cards);

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

// ADDING EVENT LISTENERS
function addEventListenersToCards() {
    const clickedFigures = document.querySelectorAll('.front');
    for (let i = 0; i < clickedFigures.length; i++) {
        clickedFigures[i].addEventListener('click', showClickedCard);
    }
}

function addEventListenersToReloadButtons() {
    const shuffleButton = document.getElementById('shuffle-btn');
    shuffleButton.addEventListener('click', reloadGame);

    const modalButton = document.getElementById('modal-btn');
    modalButton.addEventListener('click', reloadGame);
}

// FLIPPING AND MATCHING CARDS
function showClickedCard(event) {
    const clickedFigure = event.target;
    const parentCard = clickedFigure.parentElement;
    parentCard.classList.add('flipped');
    const figureId = parentCard.getAttribute('id');

    flippedCards.push(figureId);
    moves = moves + 1;
    countMoves();
    rateWithStars();

    if (flippedCards.length === 2) {
        const figureTwo = flippedCards.pop();
        const figureOne = flippedCards.pop();
        const previousCard = document.querySelector('#' + figureOne);
        if (pairIsMatched(figureOne, figureTwo)) {
            setTimeout(function () {
                previousCard.lastChild.classList.add('matched');
                parentCard.lastChild.classList.add('matched');
            }, 900);

            matchedCards.push(figureTwo); // store id's of matched cards 

            showInfoBubble(cardsLabels[figureOne]); // pass matching id to function displaying info about flag's owner

            if (matchedCards.length === 8) { // showing modal with congratulations when there are 8 pairs that match
                stopCountingTime();
                getRating();
                displayTime();
                openCongratulationsPopup();

            }
        } else {
            setTimeout(function () {
                previousCard.classList.remove('flipped');
                parentCard.classList.remove('flipped');
            }, 900);
        }
    }
}

function pairIsMatched(figureOne, figureTwo) {
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
        displayedMovesNumber.innerHTML = moves + " move";
    } else {
        displayedMovesNumber.innerHTML = moves + " moves";
    }
}

// CHANGING STAR RATING
function rateWithStars() {
    const starOne = document.getElementById('star-one');
    const starTwo = document.getElementById('star-two');
    const starThree = document.getElementById('star-three');

    if (moves >= 50) {
        starTwo.innerHTML = '<i class="fa fa-star-o" aria-hidden="true"></i>';
    } else if (moves >= 30) {
        starThree.innerHTML = '<i class="fa fa-star-o" aria-hidden="true"></i>';
    }
}

function getRating() {
    const ratingInfo = document.getElementById('rating-info');
    if (moves >= 50) {
        ratingInfo.innerHTML = '<i class="fa fa-star" aria-hidden="true">';
    } else if (moves >= 30) {
        ratingInfo.innerHTML = '<i class="fa fa-star" aria-hidden="true"></i></i><i class="fa fa-star" aria-hidden="true"></i>';
    } else {
        ratingInfo.innerHTML = '<i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i>';
    }
}

// RELOADING GAME AND RESETING SCORES
function reloadGame() {
    closeCongratulationsPopup();
    moves = 0;
    resetTimer();
    clearBoard();
    startCountingTime();
    resetRating();
    initializeMemoryGame();
}

function clearBoard() {
    board.innerHTML = "";
}

function resetRating() {
    starOne.innerHTML = '<i class="fa fa-star" aria-hidden="true"></i>';
    starTwo.innerHTML = '<i class="fa fa-star" aria-hidden="true"></i>';
    starThree.innerHTML = '<i class="fa fa-star" aria-hidden="true"></i>';
}

// TIMER
function timer(time) {
    if (time > 9) {
        return time;
    } else {
        return "0" + time;
    }
}

//function startCountingTime() {
//    if (moves >= 1) {
//        ++seconds
//        document.getElementById('seconds').innerHTML = timer(seconds % 60);
//        document.getElementById('minutes').innerHTML = timer(parseInt(seconds / 60));
//    }
//}

function getTime() {
    let totalSeconds = timer(seconds % 60);
    let totalMinutes = timer(parseInt(seconds / 60));
    return `${totalMinutes}:${totalSeconds}`;
}

function startCountingTime() {
    if (moves >= 1) {
        ++seconds
        displayTime();
    }
}

function displayTime() {
    document.getElementsByClassName('time')[0].innerHTML = getTime();
    document.getElementsByClassName('time')[1].innerHTML = getTime();

}

function stopCountingTime() {
    clearInterval(countTime);
}

function resetTimer() {
    seconds = 0;
    document.getElementById('timer').innerHTML = '00:00';
}

// SHOWING AND HIDING CONGRATULATIONS PUPUP
function openCongratulationsPopup() {
    if (matchedCards.length === 8) {
        setTimeout(function () {
            const modal = document.getElementById('popup-window');
            modal.style.display = 'block';
        }, 900);
    }
}

function closeCongratulationsPopup() {
    const modal = document.getElementById('popup-window');
    modal.style.display = 'none';
}

// SHOWING AND HIDING BUBBLE WITH COUNTRY NAME
function showInfoBubble(label) {
    const flagName = document.getElementById('flag-name');
    flagName.innerHTML = label;
    bubble.style.display = "block";
    hideInfoBubble();
}

function hideInfoBubble() {
    setTimeout(function () {
        bubble.style.display = "none";
    }, 2000);
}


initializeMemoryGame();
