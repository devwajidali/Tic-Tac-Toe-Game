let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let player1 = document.querySelector("#player1");
let player2 = document.querySelector("#player2");

let turnO = true;
let count = 0;
let score1 = 0;
let score2 = 0;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    count=0;
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO === true) {
            turnO = false;
            box.innerText = "O";
            count++;
        } else {
            box.innerText = "X";
            turnO = true;
            count++;
        }
        box.disabled = true;

        checkWinner();
    })
})

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    if (winner === "O") {
        score1++;
        player1.innerText = `score : ${score1}`;
    } else {
        score2++;
        player2.innerText = `score : ${score2}`;
    }
}

const showDraw = () => {
    msg.innerText = "Match Draw !";
    msgContainer.classList.remove("hide");
}


const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos1Val === pos3Val) {
                showWinner(pos1Val);
            } else if (count === 9) {
                showDraw();    
            }
        }
    }
}


newBtn.addEventListener("click", resetGame);

resetBtn.addEventListener("click", resetGame);
