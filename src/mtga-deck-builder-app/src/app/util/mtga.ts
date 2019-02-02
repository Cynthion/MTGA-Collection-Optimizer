const { allCards } = require('mtga');

let card = allCards.findCard(67134);

console.log(card.get('prettyName'));
