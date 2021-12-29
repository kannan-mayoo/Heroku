const statusDisplay = document.getElementById("player-turn");


let gameActive = true;

let currentPlayer = "X";

let gameState = ["", "", "", "", "", "", "", "", "", ];



const winningStatus = () => `Player ${currentPlayer} has won the match`;
const drawMatch = () => `The match has drawn`;
const currentPlayerTurn = () => ` It's ${currentPlayer}'s turn  `;


statusDisplay.innerHTML = currentPlayerTurn();


function handlePlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function playerChange() {
    // if (currentPlayer === "X") {
    //     currentPlayer = "O";
    // } else {
    //     currentPlayer = "X";
    // }


    // The above if-else condition can also be declared in a single line as coded below.
    // It can be weird to looking at first, but it is a simple if-else condition declared in a single line.

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


function resultValidation() {
    let wonGame = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            wonGame = true;
            break
        }
    }
    if (wonGame) {
        statusDisplay.innerHTML = winningStatus();
        gameActive = false;
        return;

    }
    let matchDrawn = !gameState.includes("");
    if (matchDrawn) {
        statusDisplay.innerHTML = drawMatch();
        gameActive = false;
        return;
    }

    playerChange();
}



function handleClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;

    const clickedCellIndex = parseInt(
        clickedCell.getAttribute('div-cell-index')
    );


    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }


    handlePlayed(clickedCell, clickedCellIndex);
    resultValidation();
}


function restartGame() {
    // foreach(clickedCell => clickedCell(getAttribute('div-cell-index').innerHTML = ""));
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.box')
        .forEach(box => box.innerHTML = "");

}



document.querySelectorAll('.box').forEach(box => box.addEventListener('click', handleClick));
document.querySelector('.game-restart').addEventListener('click', restartGame);