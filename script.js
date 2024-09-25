
let currentPlayer = 'X';
let XR = 0;
let OR = 0;

function Cell() {
    let value = '';

    const getValue = () => value;
    const setValue = (newValue) => {
        if (value === '') {
            value = newValue;
        }
    };
    return { getValue, setValue };
}

function drawGameboard () {
    const rows = 3;
    const columns = 3;
    const gameboard = [];

    for (let i = 0; i < rows; i++) {
        gameboard[i] = [];
        for (let j = 0; j < columns; j++) {
          gameboard[i].push(Cell());
        }
    }

    return gameboard;
}

function renderGameboard(gameboard) {
    const boardRenderer = document.getElementById('gameboard');
    boardRenderer.innerHTML = '';

    gameboard.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');
            cellDiv.dataset.row = rowIndex;
            cellDiv.dataset.col = colIndex;

            cellDiv.addEventListener('click', function () {
                playRound(gameboard, rowIndex, colIndex);
        });

        boardRenderer.appendChild(cellDiv);
    });

});
}


function playRound (gameboard, row, col) {
    
    const XResults = document.getElementById('XResults');
    const OResults = document.getElementById('OResults');
    
    const cell = gameboard[row][col];

    if (cell.getValue() === '') {
        cell.setValue(currentPlayer);
            
        const cellDiv = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        cellDiv.textContent = cell.getValue();

        if (winCheck(gameboard)) {
            alert(`${currentPlayer} wins!`);
            
            if (currentPlayer === 'X') {
                XR++; 
            } else if (currentPlayer === 'O') {
                OR++; 
            }

            updateScore(XResults, OResults); 
            resetGameboard();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}   

function updateScore(XResults, OResults) {
    XResults.textContent = XR; 
    OResults.textContent = OR; 
}

function winCheck(gameboard) {

    const winningCombinations = [
        [[0, 0], [0, 1], [0, 2]], 
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]], 
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        [[0, 0], [1, 1], [2, 2]], 
        [[0, 2], [1, 1], [2, 0]]
    ];

    let winner = null;
    
    winningCombinations.forEach(combination => {
        const [a, b, c] = combination;
        const cellA = gameboard[a[0]][a[1]];
        const cellB = gameboard[b[0]][b[1]];
        const cellC = gameboard[c[0]][c[1]];

        if (cellA.getValue() && cellA.getValue() === cellB.getValue() && cellA.getValue() === cellC.getValue()) {
            winner = cellA.getValue();
        }
    });

    if (winner) {
        return true;
    }
    return false;
}

    
function resetGameboard () {
    const gameboard = drawGameboard();
    renderGameboard(gameboard);
    currentPlayer = 'X';
}


function resetGameboardButton () {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener ('click', function() {
        XR = 0;
        OR = 0;
        const XResults = document.getElementById('XResults');
        const OResults = document.getElementById('OResults');
        XResults.textContent = XR;
        OResults.textContent = OR;
        const gameboard = drawGameboard();
        renderGameboard(gameboard);
        currentPlayer = 'X';
    });
}

function startGame() {
    const startGameButton = document.getElementById('start');
    startGameButton.addEventListener('click', function() {
        resetGameboard();
    });

}    


(function init() {
    const gameboard = drawGameboard();
    resetGameboardButton();
    startGame();
})();



