const faceUpColor = "rgb(0, 191, 255)";
const faceDownColor = "rgb(0, 0, 255)";
const flashColor = "rgb(255, 64, 0)";
const numFlashes = 2;

const resizeIntervals = 6;
const resizeTimer = 20;

let busy = false;
let turningFaceUp = false;
let originalWidth;
let cards = [];
let newWidth;
let newBackgroundColor;
let newIconVisibilty = "visible";
let resizeAmount;
let resizeDirection;
let cardTimer;
let flashCount = 0;

/**
* @desription Create a card div element dynamically.
* @constructor
* @param {string} fontImage - The icon to display
*/
function cardTableElement(fontImage) {
    const cardDiv = document.createElement("div");
    cardDiv.setAttribute("class", "card");
    cardDiv.style.backgroundColor = faceDownColor;
    cardDiv.style.width = "60px";
    cardDiv.style.fontSize = "24px";
    const icon = document.createElement("i");
    icon.setAttribute("class", fontImage);
    icon.style.visibility = "hidden";
    cardDiv.appendChild(icon);

    cardDiv.addEventListener("click", function () { startTimer(); turnCardFaceUp(cardDiv) });
    return cardDiv;
}

function resetCards() {
    cards = [];
}

function iconName(card) {
    return card.children[0].className;
}

function equal(cardA, cardB) {
    return iconName(cardA) === iconName(cardB);
}

function setCardIconVisibility(card, iconVisibility) {
    const icon = card.children[0];
    icon.style.visibility = iconVisibility;
}

/**
* @description Set the icon visibility of the cards in the cards array
* @param {bool} iconVisibility - Should the icon be displayed
*/
function setCardsIconVisibility(iconVisibility) {
    /* Only set the last cards icon visibility if we turning it face up */
    if (turningFaceUp) {
	setCardIconVisibility(cards[cards.length-1], iconVisibility);
	return;
    }
    
    for (card of cards) {
	setCardIconVisibility(card, iconVisibility);
    }
}

function setCardColor(card, color) {
    card.style.backgroundColor = color;
}

/**
* @description Set the color of the cards in the cards array
* @param {string} color - The rgb color to set on the card
*/
function setCardsColor(color) {
    /* Only set the last cards color if we turning it face up */
    if (turningFaceUp) {
	setCardColor(cards[cards.length-1], color);
	return;
    }
    
    for (card of cards) {
        setCardColor(card, color);
    }
}

function setCardWidth(card, widthPx) {
    card.style.width = widthPx;
}

/**
* @description Set the width of the cards in the cards array
* @param {number} width - The width to set on the card
*/
function setCardsWidth(width) {
    const widthPx = `${width}px`;

    /* Only set the last cards width if we turning it face up */
    if (turningFaceUp) {
	setCardWidth(cards[cards.length-1], widthPx);
	return;
    }
    
    for (card of cards) {
        setCardWidth(card, widthPx);
    }
}

/**
* @description Flip the cards that are in the cards array.
*              This occurs in two steps. Resize the cards to zero
*              and then set the backgroundColor to newBackgroundColor
*              and set the icon visibilty to newIconVisisbility. Then
*              resize the cards in the opposite direction.
*              Both newBackgroundColor and newIconVisibility are set
*              in methods turnCardFaceUp turnCardsFaceDown.
*/ 
function flipCards() {
    
    newWidth += resizeDirection * resizeAmount;
    console.log(newWidth);
    setCardsWidth(newWidth);
   
    if (resizeDirection < 0 && newWidth <= 0) {
        resizeDirection = 1;
        setCardsColor(newBackgroundColor);
        setCardsIconVisibility(newIconVisibility);
    }

    if (newWidth >= originalWidth) {
        newWidth = originalWidth;
        setCardsWidth(newWidth);
	clearInterval(cardTimer);
	cardTimer = null;

	if (cards.length === 2) {
	    if (equal(cards[0],cards[1])) {
		/* A match was found. record it and reset the cards array */
		busy=false;
		resetCards();
		recordMatch();
	    }
	    else if (turningFaceUp) {
		turnCardsFaceDown();
	    }
	    else {
		busy = false;
		resetCards();
	    }
	}
	else {
	    busy = false;
	}
    }
}

/**
* @description Reset the local variables to default
*              values based on the input div
* @param {div} cardDiv - The DOM card element for the current card
*/
function resetResizeValues(cardDiv) {
    newBackgroundColor = faceDownColor;
    newIconVisibility = "hidden";
    const bndRect = cardDiv.getBoundingClientRect();
    originalWidth = bndRect.width;
    newWidth = originalWidth;
    resizeAmount = originalWidth / resizeIntervals;
    resizeDirection = -1;
}

/**
* @description Causes two cards to flash twice and then turns them over
* @param {div[]} cards - An array of DOM card elements
*/
function flashCardsThenTurnDown(cards) {
    if (flashCount % 2 === 0) {
        setCardsColor(flashColor);
    } else {
        setCardsColor(faceUpColor);
    }

    flashCount--;
    if (flashCount === 0) {
        clearInterval(cardTimer);
        cardTimer = setInterval(function() { flipCards() }, resizeTimer);
    }
}

/**
*  @description Calling this method is due to a mismatch.
*               Flash the cards in the cards array first
*               then turn them over
*/
function turnCardsFaceDown() {
    flashCount = numFlashes * 2;
    resetResizeValues(cards[0]);

    turningFaceUp = false;
    cardTimer = setInterval(function() { flashCardsThenTurnDown(); }, 200);
}

/**
* @description Turn the input card face up
* @param {div} cardDiv - The DOM card element to turn face up.
*/
function turnCardFaceUp(cardDiv) {
    if (busy)
        return;

    if (cardDiv.style.backgroundColor === faceUpColor)
        return;

    resetResizeValues(cardDiv);
    newBackgroundColor = faceUpColor;
    newIconVisibility = "visible";
    cards[cards.length] = cardDiv;

    if (cards.length === 2) {
	recordMove();
    }
    
    busy = true;
    turningFaceUp = true;
    cardTimer = setInterval(function () { flipCards(); }, resizeTimer);
}
