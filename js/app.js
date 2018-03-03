function initializeMemoryGame() {
    closeCongratulationsPopup();
    createNewBoard();
    addEventListenersToCards();
    addEventListenersToReloadButtons();
    countMoves();
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
//let seconds = 0;


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

function clearBoard() {
    board.innerHTML = "";
}

function addEventListenersToCards() {
    const clickedFigures = document.querySelectorAll('.front');
    for (let i = 0; i < clickedFigures.length; i++) {
        clickedFigures[i].addEventListener('click', showClickedCard);
    }
}

function reloadGame() {
    //    while (board.firstChild) {
    //        board.removeChild(board.firstChild);
    //    };
    clearBoard();
    initializeMemoryGame();
    closeCongratulationsPopup();
    resetRating();
    moves = 0;
    countMoves();
    //    timerOff();
}

function addEventListenersToReloadButtons() {
    const shuffleButton = document.getElementById('shuffle-btn');
    shuffleButton.addEventListener('click', reloadGame);

    const modalButton = document.getElementById('modal-btn');
    modalButton.addEventListener('click', reloadGame);
}


function showClickedCard(event) {
    const clickedFigure = event.target;
    const parentCard = clickedFigure.parentElement;
    parentCard.classList.add('flipped');
    const figureId = parentCard.getAttribute('id');

    //    countTime();
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

            if (matchedCards.length === 8) {
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

function countMoves() {
    const displayedMovesNumber = document.getElementById('moves-counter');
    if (moves === 1) {
        displayedMovesNumber.innerHTML = moves + " move";
    } else {
        displayedMovesNumber.innerHTML = moves + " moves";
    }
}

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

function resetRating() {
    starOne.innerHTML = '<i class="fa fa-star" aria-hidden="true"></i>';
    starTwo.innerHTML = '<i class="fa fa-star" aria-hidden="true"></i>';
    starThree.innerHTML = '<i class="fa fa-star" aria-hidden="true"></i>';
}

//function timerOn(time) {
//    if (time > 9) {
//        return time;
//    } else {
//        return "0" + time;
//    }
//}
//
//function timerOff() {
//    const stopCountingTime = clearInterval(startCountingTime);
//    seconds = 0;
//}
//
//
//function countTime() {
//    const startCountingTime = setInterval(countTime, 1000);
//    document.getElementById('seconds').innerHTML = timerOn(++seconds % 60);
//    document.getElementById('minutes').innerHTML = timerOn(parseInt(seconds / 60, 10));
//}

function openCongratulationsPopup() {
    setTimeout(function () {
        const modal = document.getElementById('popup-window');
        modal.style.display = 'block';
    }, 900);

}

function closeCongratulationsPopup() {
    const modal = document.getElementById('popup-window');
    modal.style.display = 'none';
}


initializeMemoryGame();


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


// TODO: 
// timer
// rating based on number of moves
// check reload button
