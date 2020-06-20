let deck = [];
let suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds']
let faces = [{ value: 11, face: 'Ace' }, { value: 2, face: '2' }, { value: 3, face: '3' }, { value: 4, face: '4' }, { value: 5, face: '5' }, { value: 6, face: '6' }, { value: 7, face: '7' }, { value: 8, face: '8' }, { value: 9, face: '9' }, { value: 10, face: '10' }, { value: 10, face: 'Jack' }, { value: 10, face: 'Queen' }, { value: 10, face: 'King' }]
let playerHand: Array<Object> = [];
let compHand: Array<Object> = [];
let playerCount: number = 0;
let compCount: number = 0;
let newCard = [];
let oldCards = [];

let winCounter: number = 0;
let tieCounter: number = 0;
let lossCounter: number = 0;
let handCounter

// Generate the Deck
function newDeck() {
    suits.forEach(suit => {
        faces.forEach(face => {
            let card = { ...face, suit: suit }
            deck.push(card)
        })
        console.log(deck);
    })
}

newDeck()
//  Shuffle the deck

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
shuffleArray(deck)
console.log(deck);


//  Initial Deal function
function initDeal() {
    playerHand.push(deck.shift());
    if(deck.length == 0){shuffleOld()};
    compHand.push(deck.shift());
    if(deck.length == 0){shuffleOld()};
    playerHand.push(deck.shift());
    if(deck.length == 0){shuffleOld()};
    compHand.push(deck.shift());
    if(deck.length == 0){shuffleOld()};
    countPlayer();
    countComp();
    blackjackCheck();
}

initDeal()

console.log(playerHand);
console.log(compHand);



// Player Count
function countPlayer() {
    playerCount = 0
    playerHand.forEach(card => {
        playerCount += card["value"]

    })
    console.log(playerCount);
}

// Computer Count
function countComp() {
    compCount = 0;
    let numAces = 0;
    compHand.forEach(card => {
        compCount += card['value'];
        if (card['face'] == 'Ace') {
            numAces++
        }
    })
    console.log(compCount);
}

//  Blackjack Check
function blackjackCheck(){
if (playerCount === 21) {
    playerWin();
    console.log("You got blackjack! You win!");
}
else if (compCount === 21) {
    playerLose();
    console.log("The computer got blackjack! You lose.");
}
else if (compCount === 21 && playerCount === 21) {
    tie()
    console.log("You both got blackjack! That shouldn't happen! Try your luck again?");
}
}

//  New Card Function 

function addCard() {
    newCard = deck.shift()
    if(deck.length == 0){shuffleOld()}
    return newCard
}

// Player new card

document.getElementById('newCardButton').addEventListener('click', function () {
    playerHand.push(addCard());
    if(deck.length == 0){shuffleOld()}
    console.log(playerHand);
    countPlayer()
    if (playerCount > 21) {
        playerLose()
    }
})

// Computer New Card

document.getElementById('stay').addEventListener('click', compTurn)
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
document.getElementById('newDeal').addEventListener('click', dealAgain)

// Shuffle Old Deck
function shuffleOld() {
    shuffleArray(oldCards);
    deck = [...oldCards]
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

document.getElementById('newGame').addEventListener('click', startGame)

function playerLose() {
    console.log('You lose');
    lossCounter = lossCounter + 1;
    document.getElementById('loss').innerText = `Losses: ${lossCounter}`;
    oldCards = [...oldCards,...playerHand,...compHand];
    console.log("Old Cards:", oldCards);
}
function playerWin() {
    console.log("Player Wins!!");
    winCounter = winCounter + 1;
    document.getElementById('win').innerText = `Wins: ${winCounter}`;
    oldCards = [...oldCards,...playerHand,...compHand];
    console.log("Old Cards:", oldCards);
}
function tie() {
    console.log(`It's a tie! Try your luck again?`)
    tieCounter = tieCounter + 1;
    document.getElementById('tie').innerText = `Ties: ${tieCounter}`;
    oldCards = [...oldCards,...playerHand,...compHand];
    console.log("Old Cards:", oldCards);
}

function compPlay() {
    compHand.push(addCard());
    if(deck.length == 0){shuffleOld()}
    countComp();
}

function compTurn() {
    if (compCount < 17) {
        compPlay()
        if (compCount > 21) {
            playerWin();

            
        }
        else {
            compTurn()
        }
    }
    else {
        if (compCount > playerCount) {
            playerLose()
            // oldCards = [...oldCards, ...playerHand, ...compHand]
            // console.log("Old Cards:", oldCards);
        }
        else if (compCount < playerCount) {
            playerWin();
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