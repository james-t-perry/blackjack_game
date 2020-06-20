var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var deck = [];
var suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
var faces = [{ value: 11, face: 'Ace' }, { value: 2, face: '2' }, { value: 3, face: '3' }, { value: 4, face: '4' }, { value: 5, face: '5' }, { value: 6, face: '6' }, { value: 7, face: '7' }, { value: 8, face: '8' }, { value: 9, face: '9' }, { value: 10, face: '10' }, { value: 10, face: 'Jack' }, { value: 10, face: 'Queen' }, { value: 10, face: 'King' }];
var playerHand = [];
var compHand = [];
var playerCount = 0;
var compCount = 0;
var newCard = [];
var oldCards = [];
var winCounter = 0;
var tieCounter = 0;
var lossCounter = 0;
// Generate the Deck
function newDeck() {
    suits.forEach(function (suit) {
        faces.forEach(function (face) {
            var card = __assign(__assign({}, face), { suit: suit });
            deck.push(card);
        });
        console.log(deck);
    });
}
newDeck();
//  Shuffle the deck
function shuffleArray(array) {
    var _a;
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1];
    }
}
shuffleArray(deck);
console.log(deck);
//  Initial Deal function
function initDeal() {
    playerHand.push(deck.shift());
    if (deck.length == 0) {
        shuffleOld();
    }
    ;
    compHand.push(deck.shift());
    if (deck.length == 0) {
        shuffleOld();
    }
    ;
    playerHand.push(deck.shift());
    if (deck.length == 0) {
        shuffleOld();
    }
    ;
    compHand.push(deck.shift());
    if (deck.length == 0) {
        shuffleOld();
    }
    ;
    countPlayer();
    countComp();
    blackjackCheck();
}
initDeal();
console.log(playerHand);
console.log(compHand);
// Player Count
function countPlayer() {
    playerCount = 0;
    playerHand.forEach(function (card) {
        playerCount += card["value"];
    });
    console.log(playerCount);
}
// Computer Count
function countComp() {
    compCount = 0;
    var numAces = 0;
    compHand.forEach(function (card) {
        compCount += card['value'];
        if (card['face'] == 'Ace') {
            numAces++;
        }
    });
    console.log(compCount);
}
//  Blackjack Check
function blackjackCheck() {
    if (playerCount === 21) {
        PlayerWin();
        console.log("You got blackjack! You win!");
    }
    else if (compCount === 21) {
        PlayerLose();
        console.log("The computer got blackjack! You lose.");
    }
    else if (compCount === 21 && playerCount === 21) {
        tie();
        console.log("You both got blackjack! That shouldn't happen! Try your luck again?");
    }
}
//  New Card Function 
function addCard() {
    newCard = deck.shift();
    if (deck.length == 0) {
        shuffleOld();
    }
    return newCard;
}
// Player new card
document.getElementById('newCardButton').addEventListener('click', function () {
    playerHand.push(addCard());
    if (deck.length == 0) {
        shuffleOld();
    }
    console.log(playerHand);
    countPlayer();
    if (playerCount > 21) {
        PlayerLose();
    }
});
// Computer New Card
document.getElementById('stay').addEventListener('click', compTurn);
// if (compCount > playerCount) {
//     lossCounter = lossCounter++
//     console.log('Computer Wins! Want to play again');}})
// Deal Again
function dealAgain() {
    playerHand = [];
    compHand = [];
    initDeal();
    console.log(playerHand, playerCount, compHand, compCount, deck, oldCards);
}
document.getElementById('newDeal').addEventListener('click', dealAgain);
// Shuffle Old Deck
function shuffleOld() {
    shuffleArray(oldCards);
    deck = __spreadArrays(oldCards);
    oldCards = [];
}
//  Start Game
function startGame() {
    winCounter = 0;
    lossCounter = 0;
    tieCounter = 0;
    deck = [];
    playerHand = [];
    compHand = [];
    newDeck();
    shuffleArray(deck);
    initDeal();
}
document.getElementById('newGame').addEventListener('click', startGame);
function PlayerLose() {
    console.log('You lose');
    lossCounter = lossCounter + 1;
    document.getElementById('loss').innerText = "Losses: " + lossCounter;
    oldCards = __spreadArrays(oldCards, playerHand, compHand);
    console.log("Old Cards:", oldCards);
}
function PlayerWin() {
    console.log("Player Wins!!");
    winCounter = winCounter + 1;
    document.getElementById('win').innerText = "Wins: " + winCounter;
    oldCards = __spreadArrays(oldCards, playerHand, compHand);
    console.log("Old Cards:", oldCards);
}
function tie() {
    console.log("It's a tie! Try your luck again?");
    tieCounter = tieCounter + 1;
    document.getElementById('tie').innerText = "Ties: " + tieCounter;
    oldCards = __spreadArrays(oldCards, playerHand, compHand);
    console.log("Old Cards:", oldCards);
}
function compPlay() {
    compHand.push(addCard());
    if (deck.length == 0) {
        shuffleOld();
    }
    countComp();
}
function compTurn() {
    if (compCount < 17) {
        compPlay();
        if (compCount > 21) {
            PlayerWin();
        }
        else {
            compTurn();
        }
    }
    else {
        if (compCount > playerCount) {
            PlayerLose();
            // oldCards = [...oldCards, ...playerHand, ...compHand]
            // console.log("Old Cards:", oldCards);
        }
        else if (compCount < playerCount) {
            PlayerWin();
            // oldCards = [...oldCards, ...playerHand, ...compHand]
            // console.log("Old Cards:", oldCards);
        }
        else {
            tie();
            // oldCards = [...oldCards, ...playerHand, ...compHand]
            // console.log("Old Cards:", oldCards);
        }
    }
}
