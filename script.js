const cards = document.querySelectorAll(".card"),
    timeTag = document.querySelector(".time b"),
    flipsTag = document.querySelector(".flips b"),
    refreshBtn = document.querySelector(".details button");

let maxTime = 20;
let timeLeft = maxTime;
let flips = 0;
let matchedCount = 0;
let disableDeck = false;
let isPlaying = false;
let cardOne, cardTwo, timer;

function initTimer() {
    if (timeLeft <= 0) {
        clearInterval(timer);
        alert("TIME'S UP! Refresh to try again!");
        
    } else {
        timeLeft--;
        timeTag.innerText = timeLeft;
    }
}

function flipCard({ target: clickedCard }) {
    if (!isPlaying) {
        isPlaying = true;
        timer = setInterval(initTimer, 1000);
    }
    if (clickedCard !== cardOne && !disableDeck && timeLeft > 0) {
        flips++;
        flipsTag.innerText = flips;
        clickedCard.classList.add("flip");
        if (!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneIcon = cardOne.querySelector(".back-view i").className;
        let cardTwoIcon = cardTwo.querySelector(".back-view i").className;

        checkMatchedCards(cardOneIcon, cardTwoIcon);
    }
}

function checkMatchedCards(icon1, icon2) {
    if (icon1 === icon2) {
        matchedCount++;
        if (matchedCount === 6 && timeLeft > 0) {
            clearInterval(timer);
            setTimeout(() =>{
                alert("MATCHA! You've matched all the cards!");
            }, 500);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        disableDeck = false;
    } else {
        setTimeout(() => {
            cardOne.classList.add("shake");
            cardTwo.classList.add("shake");
        }, 400);

        setTimeout(() => {
            cardOne.classList.remove("shake", "flip");
            cardTwo.classList.remove("shake", "flip");
            cardOne = cardTwo = "";
            disableDeck = false;
        }, 1200);
    }
}

function shuffleCards() {
    timeLeft = maxTime;
    flips = matchedCount = 0;
    cardOne = cardTwo = "";
    clearInterval(timer);
    timeTag.innerText = timeLeft;
    flipsTag.innerText = flips;
    disableDeck = isPlaying = false;

    let arr = [
        "bx-sushi", "bx-bowl-rice", "bx-beer", 
        "bx-cake", "bx-baguette", "bx-popsicle",
        "bx-sushi", "bx-bowl-rice", "bx-beer", 
        "bx-cake", "bx-baguette", "bx-popsicle"
    ];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let iconTag = card.querySelector(".back-view i");
        setTimeout(() => {
            iconTag.className = `bx ${arr[index]}`;
        }, 500);
        card.addEventListener("click", flipCard);
    });
}

shuffleCards();

refreshBtn.addEventListener("click", shuffleCards);

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});