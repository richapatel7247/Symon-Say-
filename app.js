let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let heighest = 0;

let btns = ["pink", "green", "orange", "blue"];

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");
let body = document.querySelector("body");


document.addEventListener("keypress", function() {
    if(started == false) {
        started = true;
        levelUp();
    } 
});


function flash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 300);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    
    let randomIdx = Math.floor( Math.random() * 3 );
    let randomColor = btns[randomIdx];
    let randomBtn = document.querySelector(`.${randomColor}`);
    gameSeq.push(randomColor);
    flash(randomBtn);
    if(heighest < level) {
        heighest = level;
    }
    h3.innerText = `High Score   ${heighest}`;
}
  
function checkAns(idx) {
    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }    
    }  else {
        h2.innerHTML = `Game Over!  Your Score was <b>${level}</b> <br> Press any key to start`;
        body.classList.add("bodyFlash");
        setTimeout(function() {
          body.classList.remove("bodyFlash");
        }, 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    flash(btn);
    let userCol = btn.getAttribute("id");
    userSeq.push(userCol);
    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".smallBox");
for(let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}