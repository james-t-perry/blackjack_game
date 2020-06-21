let deck: Array<Object> = [];
let suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds']
let faces = [{ value: 11, face: 'Ace' }, { value: 2, face: '2' }, { value: 3, face: '3' }, { value: 4, face: '4' }, { value: 5, face: '5' }, { value: 6, face: '6' }, { value: 7, face: '7' }, { value: 8, face: '8' }, { value: 9, face: '9' }, { value: 10, face: '10' }, { value: 10, face: 'Jack' }, { value: 10, face: 'Queen' }, { value: 10, face: 'King' }]
let playerHand: Array<Object> = [];
let compHand: Array<Object> = [];
let playerCount: number = 0;
let compCount: number = 0;
let newCard = {};
let oldCards = [];
let gameOver: boolean = false;
let deckNumber: number = 4;

let winCounter: number = 0;
let tieCounter: number = 0;
let lossCounter: number = 0;
let handCounter: number = 0;

// Generate the Deck
function newDeck() {
    suits.forEach(suit => {
        faces.forEach(face => {
            let card = { ...face, suit: suit }
            deck.push(card)
        })
    })
}

// newDeck()
//  Shuffle the deck

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}



// Multiple Decks
for(let i = 0; i < deckNumber; i++){
    newDeck()
}
shuffleArray(deck)
console.log(deck);
//  Initial Deal function
function initDeal() {
    playerHand.push(addCard());
    compHand.push(addCard());
    playerHand.push(addCard());
    compHand.push(addCard());
    countPlayer();
    countComp();
    playerCards(playerHand)
    compCards(compHand)
    blackjackCheck();
}

initDeal()

console.log(playerHand);
console.log(compHand);

// Player Count
function countPlayer() {
    playerCount = 0;
    let numAces = 0;
    playerHand.forEach(card => {
        playerCount += card['value'];
        if (card['face'] == 'Ace') {
            numAces++
        }
    })
    if (playerCount > 21 && numAces !== 0){
        playerCount = playerCount - 10
    }
    console.log(playerCount);
    console.log(numAces); 
    document.getElementById("playerCounter").innerText = `${playerCount}`
  
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
    if (compCount > 21 && numAces !== 0){
        compCount = compCount - 10
    }
    console.log(compCount);
    console.log(numAces);  
    document.getElementById("compCounter").innerText = `${compCount}`
 
}
//  Blackjack Check
function blackjackCheck(){
if (playerCount === 21) {
    playerWin();
    document.getElementById('message').innerText = "You got blackjack! You win!";
}
else if (compCount === 21) {
    playerLose();
    document.getElementById('message').innerText = "The computer got blackjack! You lose.";
}
else if (compCount === 21 && playerCount === 21) {
    tie()
    document.getElementById('message').innerText = "You both got blackjack! That shouldn't happen! Try your luck again?";
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
    console.log(playerHand);
    countPlayer()
    if (playerCount > 21) {
        playerLose()
    }
})

// Computer New Card

document.getElementById('stay').addEventListener('click', compTurn)

// Deal Again

function dealAgain() {
    // oldCards = [...oldCards,...playerHand,...compHand];
    gameOver = false
    // let usedCards = document.getElementsByClassName('newCard')
    playerHand = [];
    compHand = [];
    initDeal();
    document.getElementById('message').innerText = "Your move again, player!"
    blackjackCheck()
    console.log(playerHand, playerCount, compHand, compCount);
    console.log(deck, oldCards);
}
document.getElementById('newDeal').addEventListener('click', dealAgain)

// Shuffle Old Deck
function shuffleOld() {
    console.log('Shuffling Old'); 
    shuffleArray(oldCards);
    deck = [...oldCards]
    oldCards = [];
    console.log(deck);
    console.log(oldCards);
}
//  Start Game
function startGame() {
    resetCounters()
    gameOver = false
    deck = [];
    oldCards = [];
    playerHand = [];
    compHand = [];
    newDeck();
    shuffleArray(deck);
    initDeal();
}

document.getElementById('newGame').addEventListener('click', startGame)

// Reset all counters
function resetCounters(){
    winCounter = 0;
    lossCounter = 0;
    tieCounter = 0;
    handCounter = 0;
    document.getElementById('win').innerText = `Wins: ${winCounter}`;
    document.getElementById('loss').innerText = `Losses: ${lossCounter}`;
    document.getElementById('tie').innerText = `Ties: ${tieCounter}`;
    document.getElementById('hand').innerText = `Hands Played: ${handCounter}`;
}
document.getElementById('counterReset').addEventListener('click', resetCounters)

//  Game outcome conditions 

function playerLose() {
    document.getElementById('message').innerText = 'You lose, sorry!  Deal Again?';
    lossCounter = lossCounter + 1;
    document.getElementById('loss').innerText = `Losses: ${lossCounter}`;
    handCounter = handCounter + 1;
    document.getElementById('hand').innerText = `Hands Played: ${handCounter}`;
    oldCards = [...oldCards,...playerHand,...compHand];
    console.log("Old Cards:", oldCards);
    gameOver = true

}
function playerWin() {
    document.getElementById('message').innerText = "Player Wins!! Deal Again?";
    winCounter = winCounter + 1;
    document.getElementById('win').innerText = `Wins: ${winCounter}`;
    handCounter = handCounter + 1;
    document.getElementById('hand').innerText = `Hands Played: ${handCounter}`;
    oldCards = [...oldCards,...playerHand,...compHand];
    console.log("Old Cards:", oldCards);
    gameOver = true
}
function tie() {
    document.getElementById('message').innerText = `It's a tie! Try your luck again?`
    tieCounter = tieCounter + 1;
    document.getElementById('tie').innerText = `Ties: ${tieCounter}`;
    handCounter = handCounter + 1;
    document.getElementById('hand').innerText = `Hands Played: ${handCounter}`;
    oldCards = [...oldCards,...playerHand,...compHand];
    console.log("Old Cards:", oldCards);
    gameOver = true
}

//  Computer play hand

function compPlay() {
    compHand.push(addCard());
    countComp();
}

// Decide Winner

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
        }
        else if (compCount < playerCount) {
            playerWin();
        }
        else {
            tie();
        }
    }
}

// Message functions 

function playerCards(e){
    e.forEach(element => {
        let card = document.createElement('div');
        card.classList.add('col-2', 'newCard');
        var cardSuit = element.suit;
        switch(cardSuit){
            case 'Hearts':
                card.innerHTML = `<p>♥</p><p>${element.face}</p><p>♥</p>`
                card.style.color = 'red';
                break
            case 'Diamonds':
                card.innerHTML =`<p>♦</p><p>${element.face}</p><p>♦</p>`
                card.style.color = 'red';
                break
            case 'Spades':
                card.innerHTML = `<p>♠</p><p>${element.face}</p><p>♠</p>`
                break
            case 'Clubs':
                card.innerHTML = `<p>♣</p><p>${element.face}</p><p>♣</p>`
                break
        }
        document.getElementById('playerCards').append(card)
    });
}

function compCards(e){
    e.forEach(element => {
        let card = document.createElement('div');
        card.classList.add('col-2', 'newCard');
        var cardSuit = element.suit;
        switch(cardSuit){
            case 'Hearts':
                card.innerHTML = `<p>♥</p><p>${element.face}</p><p>♥</p>`
                card.style.color = 'red';
                break
            case 'Diamonds':
                card.innerHTML =`<p>♦</p><p>${element.face}</p><p>♦</p>`
                card.style.color = 'red';
                break
            case 'Spades':
                card.innerHTML = `<p>♠</p><p>${element.face}</p><p>♠</p>`
                break
            case 'Clubs':
                card.innerHTML = `<p>♣</p><p>${element.face}</p><p>♣</p>`
                break
        }
        document.getElementById('compCards').append(card)
    });
    // document.getElementById('compCards')..innerText = '';
    // document.querySelector('#compCards').lastChild.style.backgroundColor = 'blue'
}

