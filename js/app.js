function initializeMemoryGame() {
    addEventListenersToCards();
}
/*
 * Create a list that holds all of your cards
 */
const list = document.getElementById('board');

const cards = [
    {
        id: 'img-1-1',
        img: 'img/lithuania.svg',
    },
    {
        id: 'img-2-1',
        img: 'img/ukraine.svg',
    },
    {
        id: 'img-3-1',
        img: 'img/belarus.svg',
    },
    {
        id: 'img-4-1',
        img: 'img/germany.svg',
    },
    {
        id: 'img-5-1',
        img: 'img/russia.svg',
    },
    {
        id: 'img-6-1',
        img: 'img/czech-republic.svg',
    },
    {
        id: 'img-7-1',
        img: 'img/slovakia.svg',
    },
    {
        id: 'img-8-1',
        img: 'img/poland.svg',
    },
    {
        id: 'img-1-2',
        img: 'img/lithuania.svg',
    },
    {
        id: 'img-2-2',
        img: 'img/ukraine.svg',
    },
    {
        id: 'img-3-2',
        img: 'img/belarus.svg',
    },
    {
        id: 'img-4-2',
        img: 'img/germany.svg',
    },
    {
        id: 'img-5-2',
        img: 'img/russia.svg',
    },
    {
        id: 'img-6-2',
        img: 'img/czech-republic.svg',
    },
    {
        id: 'img-7-2',
        img: 'img/slovakia.svg',
    },
    {
        id: 'img-8-2',
        img: 'img/poland.svg',
    },
];

const openedCards = [];
const matchedCards = [];


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

const shuffleButton = document.getElementById('shuffle-btn');
shuffleButton.addEventListener('click', shuffle);

const shuffledBoard = shuffle(cards);

for (let i = 0; i < shuffledBoard.length; i++) {
    const cardContainer = document.createElement('li');
    const singleCard = document.createElement('div');
    const figure = document.createElement('figure');
    const secondFigure = document.createElement('figure');

    list.appendChild(cardContainer);
    cardContainer.appendChild(singleCard);
    singleCard.appendChild(figure);
    const figureFront = singleCard.insertBefore(secondFigure, figure);

    const imgNode = document.createElement('img');

    imgNode.classList.add('flag');
    imgNode.setAttribute('src', shuffledBoard[i].img);
    imgNode.setAttribute('id', shuffledBoard[i].id);
    figure.appendChild(imgNode);


    cardContainer.classList.add('card-container');
    singleCard.classList.add('card');
    figure.classList.add('back');
    figureFront.classList.add('front');
}


function addEventListenersToCards() {
    const cardContainer = document.querySelectorAll('.card-container');
    for (let i = 0; i < cardContainer.length; i++) {
        cardContainer[i].addEventListener('click', showClickedCard);
    }
}

function showClickedCard(event) {
    const clickedFigure = event.target;
    const parentCard = clickedFigure.parentElement;
    parentCard.classList.add('flipped');
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
