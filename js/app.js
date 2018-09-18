const numbers = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7];
const fonts = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];

let countMoves = 0;
let countMatches = 0;
const moveElement = document.getElementById("moves");
const ratingElement = document.getElementById("rating");
let numStars = 5;

/**
* @description Shuffle the array of input values
*              Taken from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
* @param {number[]} array - Array of index values to shuffle
*/
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/**
* @description Reset all elements of game including the timer, ratings,
*              moves and matches. The card indices will be shuffledand a
*              new table of cards is displayed.
*/
function reset() {
    resetTimer();
    resetRating();
    countMoves = 0;
    drawMoves();
    countMatches = 0;

    numStars = ratingElement.children.length;
    
    const cardContainer = document.getElementById("card-container");
    if (cardContainer != null) {
        cardContainer.parentNode.removeChild(cardContainer);
    }

    const shuffled = shuffle(numbers);
    const cardTableDiv = cardTable(shuffled, fonts);
    const content = document.getElementById("content");
    content.appendChild(cardTableDiv);
}

function drawMoves() {
    moveElement.innerHTML = `Moves: ${countMoves}`;
}

function recordMove() {
    countMoves++;
    drawMoves();
    adjustRating();
}

function adjustRating() {
    if ((countMoves % 9) === 0) {
	const starIndex = (numStars) - (countMoves / 9);
	if (starIndex < 0) {
	    return;
	}

	ratingElement.children[starIndex].innerHTML = "&#9734";
    }
}

function resetRating() {
    for (let ii = 0; ii < numStars; ii++) {
	ratingElement.children[ii].innerHTML = "&#9733";
    }
}

function recordMatch() {
    countMatches++;
    
    if (countMatches === fonts.length) {
	stopTimer();
        displayModal();
    }
}

document.getElementById("reset").addEventListener("click", function () { reset(); });

reset();
