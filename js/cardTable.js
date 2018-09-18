/**
* @desription Create a card table div element dynamically.
* @constructor
* @param {number[]} numbers - A shuffled array of index values for all cards.
* @param {string[]} icons - The icons to display on the cards.
*/
function cardTable(numbers, icons) {
    const cardTableDiv = document.createElement("div");
    cardTableDiv.setAttribute("id", "card-container");
    
    for (let ii of numbers) {
	    let cardDiv = cardTableElement(icons[ii]);
	    cardTableDiv.appendChild(cardDiv);
    }

    return cardTableDiv;
}

