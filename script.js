

let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

let btns = ["red", "green", "blue", "yellow"];
let h2 = document.querySelector("h2");

// Start game on first click
document.addEventListener("click", function () {
    if (!started) {
        console.log("Game Started");
        started = true;
        levelUp();
    }
});

function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userflash(btn) {
    btn.classList.add("user-flash");
    setTimeout(function () {
        btn.classList.remove("user-flash");
    }, 100);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randCol = btns[randIdx];
    let randbtn = document.querySelector(`#${randCol}`); // FIXED SELECTOR

    gameSeq.push(randCol);
    console.log(gameSeq);

    gameflash(randbtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
        console.log("same value");
    } else {
        let finalScore = level; // Store score before resetting

        document.querySelector("body").style.backgroundColor = "red";
        
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
            h2.innerHTML = `Game Over! Your Score was <b>${finalScore}</b> <br> Press any key to restart`;
        }, 500); // Ensure red flash happens first
        
        reset();
    }
}

function btnPress() {
    let btn = this;
    userflash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

// Attach event listener to buttons
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

// Reset function to restart the game
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;

    // Restart game when a key is pressed
    document.addEventListener("keydown", function () {
        if (!started) {
            started = true;
            levelUp();
        }
    }, { once: true }); // Ensures the event listener is added only once
}
