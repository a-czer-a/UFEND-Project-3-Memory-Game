function initializeMemoryGame() {
    createNewBoard();
    addEventListenersToCards();
}
/*
 * Create a list that holds all cards
 */
const list = document.getElementById('board');
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

const flippedCards = [];


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

        list.appendChild(cardContainer);
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


function addEventListenersToCards() {
    const clickedFigures = document.querySelectorAll('.front');
    for (let i = 0; i < clickedFigures.length; i++) {
        clickedFigures[i].addEventListener('click', showClickedCard);
    }
}

function reloadGame() {
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    };
    initializeMemoryGame()
}

const shuffleButton = document.getElementById('shuffle-btn');
shuffleButton.addEventListener('click', reloadGame);


function showClickedCard(event) {
    const clickedFigure = event.target;
    const parentCard = clickedFigure.parentElement;
    parentCard.classList.add('flipped');
    const figureId = parentCard.getAttribute('id');

    flippedCards.push(figureId);

    if (flippedCards.length === 2) {
        const figureTwo = flippedCards.pop();
        const figureOne = flippedCards.pop();
        const previousCard = document.querySelector('#' + figureOne);
        if (pairIsMatched(figureOne, figureTwo)) {
            setTimeout(function () {
                previousCard.lastChild.classList.add('matched');
                parentCard.lastChild.classList.add('matched');
            }, 1200);
        } else {
            setTimeout(function () {
                previousCard.classList.remove('flipped');
                parentCard.classList.remove('flipped');
            }, 1200);
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
// moves count
// timer
// rating based on number of moves
// check reload button
