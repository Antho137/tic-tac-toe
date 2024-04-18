const player_X = 'X';
const player_O = 'O';
let currentPlayer = player_X;
const winningBoxes = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

const messageText = document.querySelector('#message');
const board = document.getElementById('board')
const boxes = document.querySelectorAll('.box');
const restartBtn = document.getElementById('restart');

messageText.textContent = `${player_X}'s turn!`;

const drawBoard = () => {
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener("click", () => {
            if (boxes[i].textContent !== '') {
                return;
            }

            boxes[i].textContent = currentPlayer
            if (getWinner(currentPlayer)) {
                messageText.textContent=`${currentPlayer} wins!`
                return;
            }
        
            if (getTie()) {
                messageText.textContent= `Game is tied!`
                return;
            }

            currentPlayer = (currentPlayer === player_X) ? player_O : player_X; 
            if (currentPlayer == player_X) {
                messageText.textContent= `${player_X}'s turn!`;
            } else {
                messageText.textContent= `${player_O}'s turn!`;
            }
        });
    }
};

function getWinner(currentPlayer) {
    for (let i = 0; i < winningBoxes.length; i++) {
        const [a, b, c] = winningBoxes[i];
        if (boxes[a].textContent === currentPlayer && boxes[b].textContent === currentPlayer && boxes[c].textContent === currentPlayer) {
            return true;
        }
    }
    return false;
}

function getTie() {
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].textContent === '') {
            return false;
        }
    }
    return true;
}

const restart = () => {
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].textContent = "";
    }
    messageText.innerHTML = `${player_X}'s turn!`;
    currentPlayer = `${player_X}`;
};

restartBtn.addEventListener("click", restart);
drawBoard();