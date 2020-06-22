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
let deckNumber: number = 0;
let decks: string = '';
let createdCard;

let winCounter: number = 0;
let tieCounter: number = 0;
let lossCounter: number = 0;
let handCounter: number = 0;

// Prompt for number of decks
function decksCheck() {
    decks = prompt("How many decks do you want to play with?", '2');
    if (decks != null) {
        deckNumber = parseInt(decks);
        for (let i = 0; i < deckNumber; i++) {
            newDeck()
        }
    }
}
decksCheck()
// Multiple Decks
// for (let i = 0; i < deckNumber; i++) {
//     newDeck()
// }
// Generate the Deck
function newDeck() {
    suits.forEach(suit => {
        faces.forEach(face => {
            let card = { ...face, suit: suit }
            deck.push(card)
        })
    })
}

//  Shuffle the deck

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
shuffleArray(deck)

// Create deck

function createDeck(deck) {
    for (let i = 0; i <= deck.length; i++) {
        let card = document.createElement('div')
        card.style.zIndex = `${i}`
        card.style.marginLeft = `${i}px`
        card.classList.add('cardBack', 'deckCards')
        document.getElementById('deck').append(card)
    }
}
createDeck(deck)
console.log(deck);

// Remove from deck
function removeTop() {
    document.querySelector('#deck').lastChild.remove()
}

//  Initial Deal function
function initDeal() {
    playerHand.push(addCard());
    compHand.push(addCard());
    playerHand.push(addCard());
    compHand.push(addCard());
    for (let i = 1; i <= 4; i++) {
        removeTop()
    }
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
    if (playerCount > 21 && numAces !== 0) {
        for (let i = 0; i < numAces; i++) {
            playerCount = playerCount - 10
        }
        numAces = 0
    }
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
    if (compCount > 21 && numAces !== 0) {
        for (let i = 0; i < numAces; i++) {
            compCount = compCount - 10
        }
        numAces = 0
    }
}

//  Blackjack Check
function blackjackCheck() {
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
    if (deck.length == 0) {
        shuffleOld()
    }
    return newCard
}

// Player new card

document.getElementById('newCardButton').addEventListener('click', function () {
    playerHand.push(addCard());
    console.log(newCard);
    console.log(playerHand);
    createCard()
    document.querySelector('#deck').lastChild.remove()
    document.getElementById('playerCards').append(createdCard)
    countPlayer()
    if (playerCount > 21) {
        playerLose()
    }
})

// Computer New Card

document.getElementById('stay').addEventListener('click', compTurn)

// Deal Again

function dealAgain() {

    gameOver = false
    removeCards()
    playerHand = [];
    compHand = [];
    document.getElementById('compCounter').innerText = '?'
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
    createDeck(deck)
    console.log(deck);
    console.log(oldCards);
}
//  Start Game
function startGame() {
    resetCounters()
    removeCards()
    removeDeck()
    document.getElementById('compCounter').innerText = '?'
    gameOver = false
    deck = [];
    oldCards = [];
    playerHand = [];
    compHand = [];
    decksCheck()
    newDeck();
    shuffleArray(deck);
    createDeck(deck)
    initDeal();
}

document.getElementById('newGame').addEventListener('click', startGame)

// Reset all counters
function resetCounters() {
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
    compReveal()
    document.getElementById('message').innerText = 'You lose, sorry!  Deal Again?';
    lossCounter = lossCounter + 1;
    document.getElementById('loss').innerText = `Losses: ${lossCounter}`;
    handCounter = handCounter + 1;
    document.getElementById('hand').innerText = `Hands Played: ${handCounter}`;
    oldCards = [...oldCards, ...playerHand, ...compHand];
    console.log("Old Cards:", oldCards);
    gameOver = true

}
function playerWin() {
    compReveal()
    document.getElementById('message').innerText = "Player Wins!! Deal Again?";
    winCounter = winCounter + 1;
    document.getElementById('win').innerText = `Wins: ${winCounter}`;
    handCounter = handCounter + 1;
    document.getElementById('hand').innerText = `Hands Played: ${handCounter}`;
    oldCards = [...oldCards, ...playerHand, ...compHand];
    console.log("Old Cards:", oldCards);
    gameOver = true
}
function tie() {
    compReveal()
    document.getElementById('message').innerText = `It's a tie! Try your luck again?`
    tieCounter = tieCounter + 1;
    document.getElementById('tie').innerText = `Ties: ${tieCounter}`;
    handCounter = handCounter + 1;
    document.getElementById('hand').innerText = `Hands Played: ${handCounter}`;
    oldCards = [...oldCards, ...playerHand, ...compHand];
    console.log("Old Cards:", oldCards);
    gameOver = true
}

//  Computer play hand

function compPlay() {
    let compCard2 = document.getElementById('compCards').children[1]
    compCard2.classList.remove("cardBack")
    compHand.push(addCard());
    document.querySelector('#deck').lastChild.remove()
    createCard()
    document.getElementById('compCards').append(createdCard)
    countComp();
    document.getElementById('compCounter').innerText = `${compCount}`
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

// Generate Cards

function playerCards(e) {
    e.forEach(element => {
        let card = document.createElement('div');
        card.classList.add('col-2', 'newCard');
        var cardSuit = element.suit;
        switch (cardSuit) {
            case 'Hearts':
                card.innerHTML = `<p>♥</p><p>${element.face}</p><p>♥</p>`
                card.style.color = 'red';
                break
            case 'Diamonds':
                card.innerHTML = `<p>♦</p><p>${element.face}</p><p>♦</p>`
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

function compCards(e) {
    e.forEach(element => {
        let card = document.createElement('div');
        card.classList.add('col-2', 'newCard');
        var cardSuit = element.suit;
        switch (cardSuit) {
            case 'Hearts':
                card.innerHTML = `<p>♥</p><p>${element.face}</p><p>♥</p>`
                card.classList.add('red');
                break
            case 'Diamonds':
                card.innerHTML = `<p>♦</p><p>${element.face}</p><p>♦</p>`
                card.classList.add('red');
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
    let compCard2 = document.getElementById('compCards').children[1]
    compCard2.classList.add("cardBack")
    // compCard2.innerHTML = ``   
}

function createCard() {
    createdCard = document.createElement('div');
    createdCard.classList.add('col-2', 'newCard');
    var cardSuit = newCard['suit'];
    switch (cardSuit) {
        case 'Hearts':
            createdCard.innerHTML = `<p>♥</p><p>${newCard['face']}</p><p>♥</p>`
            createdCard.style.color = 'red';
            break
        case 'Diamonds':
            createdCard.innerHTML = `<p>♦</p><p>${newCard['face']}</p><p>♦</p>`
            createdCard.style.color = 'red';
            break
        case 'Spades':
            createdCard.innerHTML = `<p>♠</p><p>${newCard['face']}</p><p>♠</p>`
            break
        case 'Clubs':
            createdCard.innerHTML = `<p>♣</p><p>${newCard['face']}</p><p>♣</p>`
            break
    }
    return createdCard
}

// Remove cards from screen

function removeCards() {
    let usedCards = document.querySelectorAll('.newCard')
    usedCards.forEach(element => {
        element.remove()
    });
}

function removeDeck(){
    let usedDeck = document.querySelectorAll('.deckCards');
    usedDeck.forEach(element => {
        element.remove()
    });
}



// function createDeck2(){
//         let c
//     });
// }

// Flip Comp card
function compReveal() {
    let compCard2 = document.getElementById('compCards').children[1]
    compCard2.classList.remove("cardBack")
    document.getElementById('compCounter').innerText = `${compCount}`
}



