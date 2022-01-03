const username = document.getElementById('username');
const saveScorebtn = document.getElementById('saveScore');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
console.log(highScores);

username.addEventListener('keyup', () => {
    console.log(username.value);
    saveScore.disabled = !username.value;
})

saveHighScore = (e) => {
    console.log('you clicked the save button');
    e.preventDefault();

    const score2 = {
        score: mostRecentScore,
        name: username.value
    };
    highScores.push(score2)
    console.log(highScores)
};


//=================================================

var counter = 60;
var interval = setInterval(function () {
    counter--;
    // Display 'counter' wherever you want to display it.
    if (counter <= 0) {
        clearInterval(interval);
        $('#timer').html("<h3>Save Your Score Below!</h3>");
        alert("Times Up!!! How many SETS did you find?")
        return;
    } else {
        $('#time').text(counter);
        // console.log("Timer --> " + counter);
    }
}, 1000);

//=========================================

const cards = document.querySelectorAll('.memory-card'); // all cards selected as common variable
cards.forEach(card => card.addEventListener('click', flipCard)) //function flip card should activate every time a card is clicked

let firstCard, secondCard, thirdCard
let hasFlippedCard = false;
let hasFlippedSecondCard = false;
let hasFlippedThirdCard = false;
let lockBoard = false;

var score = 0;
var newScore = 0;

document.getElementById('score').innerHTML = "Set Count : " + score; //access set counter with updating score

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip')

    if (!hasFlippedCard) {
        //first click
        hasFlippedCard = true;
        firstCard = this;
        console.log({
            hasFlippedCard,
            firstCard
        })
        console.log(this.dataset) // set group identified

    } else if (hasFlippedCard === true && hasFlippedSecondCard !== true) {
        //second click
        secondCard = this;
        hasFlippedSecondCard = true;

        console.log({
            hasFlippedSecondCard,
            secondCard
        })
        console.log(this.dataset)

    } else {
        //third click
        thirdCard = this;
        hasFlippedThirdCard = true;

        console.log({
            hasFlippedThirdCard,
            thirdCard
        })
        console.log(this.dataset)

        checkForSet();
    }
}


function checkForSet() {
    if (firstCard.dataset.framework === secondCard.dataset.framework && secondCard.dataset.framework === thirdCard.dataset.framework) {
        console.log('Set Found')
        disableCards();
        hasFlippedThirdCard = false;
        hasFlippedSecondCard = false;
        hasFlippedCard = false;


        newScore = score += 1;
        (document.getElementById('score').innerHTML = "Set Count : " + (newScore));
        console.log('your score is: ' + (newScore))

        localStorage.setItem('mostRecentScore', newScore);

    } else {
        console.log('Try Again')
        unflipCards();
        hasFlippedThirdCard = false;
        hasFlippedSecondCard = false;
        hasFlippedCard = false;
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    thirdCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')
        thirdCard.classList.remove('flip')

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard, thirdCard, lockBoard] = [null, null, null, null]
}

(function shuffle() { //shuffle cards on board refresh
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();