var sudokuBoard = [];
var boardEmptyCount = 0;


function CheckInputValue(id) {
    let tempInput = document.getElementById(id);
    tempInput.style.color = "#000000";
    if(tempInput.value != ""){
        for(let i=1; i<10; i++){
            if(tempInput.value == String(i)) {
                if(id != "input80"){
                    document.getElementById("input" + (parseInt(id.substring(5)) + 1)).select();
                }
                return;
            }
        }
        if(tempInput.value == " " && id != "input80") {
            document.getElementById("input" + (parseInt(id.substring(5)) + 1)).select();
        }
        tempInput.value = "";
    }
}

function ResetBackground() {
    for(let i=0; i<81; i++){
        let tempInput = document.getElementById("input" + i);
        tempInput.style.backgroundColor = "";
        if(tempInput.value == "?"){
            tempInput.value = "";
        }
    }
}

function ResetInputs() {
    ResetBackground();
    for(let i=0; i<81; i++){
        document.getElementById("input" + i).value = "";
    }
}

function ParseBoard() {
    sudokuBoard = [];
    boardEmptyCount = 0;
    for (let i=0; i<81; i++) {
        let tempInput = document.getElementById("input" + i);
        if (tempInput.value == "" || tempInput.value == "?") {
            sudokuBoard[i] = 0;
            boardEmptyCount++;
        }
        else {
            sudokuBoard[i] = parseInt(tempInput.value);
        }
    }
}

function CheckRowsIntegrity() {
    for(let i=0; i<9; i++) {
        for(let a=1; a<10; a++) {
            let counter = 0;
            let lastIndex = 0;
            for(let j=0; j<9; j++) {
                if (sudokuBoard[i*9 + j] == a) {
                    counter++;
                    if (counter > 1){
                        document.getElementById("input" + lastIndex).style.backgroundColor = "#bd0909";
                        document.getElementById("input" + (i*9 + j)).style.backgroundColor = "#bd0909";
                        return false;
                    }
                    lastIndex = i*9 + j;
                }
            }
        }
    }
    return true;
}

function CheckColsIntegrity() {
    for(let i=0; i<9; i++) {
        for(let a=1; a<10; a++) {
            let counter = 0;
            let lastIndex = 0;
            for(let j=0; j<9; j++) {
                if (sudokuBoard[i + j*9] == a) {
                    counter++;
                    if (counter > 1){
                        document.getElementById("input" + lastIndex).style.backgroundColor = "#bd0909";
                        document.getElementById("input" + (i + j*9)).style.backgroundColor = "#bd0909";
                        return false;
                    }
                    lastIndex = i + j*9;
                }
            }
        }
    }
    return true;
}

function CheckSquaresIntegrity() {
    for(let x=0; x<3; x++){
        for(let y=0; y<3; y++){
            for(let a=1; a<10; a++) {
                let counter = 0;
                let lastIndex = 0;
                for(let i=0; i<3; i++) {
                    for(let j=0; j<3; j++) {
                        if (sudokuBoard[x*3 + y*27 + i + j*9] == a) {
                            counter++;
                            if (counter > 1){
                                document.getElementById("input" + lastIndex).style.backgroundColor = "#bd0909";
                                document.getElementById("input" + (x*3 + y*27 + i + j*9)).style.backgroundColor = "#bd0909";
                                return false;
                            }
                            lastIndex = x*3 + y*27 + i + j*9;
                        }
                    } 
                }
            }
        }
    }
    return true;
}

function CheckBoardIntegrity() {
    if(!CheckRowsIntegrity()) {
        return false;
    }
    if(!CheckColsIntegrity()) {
        return false;
    }
    if(!CheckSquaresIntegrity()) {
        return false;
    }
    return true;
}

function SolveRows() {
    for (let y = 0; y < 9; y++) {
        let emptyCount = 0;
        let nonEmptySum = 0;
        let emptyPosition = 0;
        // Check row
        for (let x = 0; x < 9; x++) {
            // Check if spot is empty
            if (sudokuBoard[9 * y + x] == 0) {
                emptyCount++;
                emptyPosition = 9 * y + x;
            }
            // Add to sum if it's not empty
            else {
                nonEmptySum += sudokuBoard[9 * y + x];
            }
            // Break the loop if there is more than 1 empty space
            if (emptyCount > 1) {
                break;
            }
        }
        // Solve if there is only 1 empty space left 
        if (emptyCount == 1) {
            sudokuBoard[emptyPosition] = 45 - nonEmptySum;
            boardEmptyCount--;
        }
    }
}

function SolveCols() {
    for (let x = 0; x < 9; x++) {
        let emptyCount = 0;
        let nonEmptySum = 0;
        let emptyPosition = 0;
        // Check col
        for (let y = 0; y < 9; y++) {
            // Check if spot is empty
            if (sudokuBoard[9 * y + x] == 0) {
                emptyCount++;
                emptyPosition = 9 * y + x;
            }
            // Add to sum if it's not empty
            else {
                nonEmptySum += sudokuBoard[9 * y + x];
            }
            // Break the loop if there is more than 1 empty space
            if (emptyCount > 1) {
                break;
            }
        }
        // Solve if there is only 1 empty space left
        if (emptyCount == 1) {
            sudokuBoard[emptyPosition] = 45 - nonEmptySum;
            boardEmptyCount--;
        }
    }
}

// Check if a number exists in a square
function IsInSquare(squarePosition, number) {
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            if (sudokuBoard[squarePosition + y * 9 + x] == number) {
                return 1;
            }
        }
    }
    return 0;
}

// Check if a number exists in a row
function IsInRow(row, number) {
    for (let i = 0; i < 9; i++) {
        if (sudokuBoard[row + i] == number) {
            return 1;
        }
    }
    return 0;
}

// Check if a number exists in a column
function IsInCol(col, number) {
    for (let i = 0; i < 9; i++) {
        if (sudokuBoard[i * 9 + col] == number) {
            return 1;
        }
    }
    return 0;
}

// Check in how many places can a given number go to in a given square
function ViableNumberOptionsInSquare(squareY, squareX, number) {
    let n = 0;
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            let currentCell = (squareY + squareX) + y * 9 + x;
            if (sudokuBoard[currentCell] == 0 && !IsInRow(squareY + (y * 9), number) && !IsInCol(squareX + x, number)) {
                n++;
            }
        }
    }
    return n;
}

function SolveSquare(squareY, squareX) {
    // Loop through square y
    for (let y = 0; y < 3; y++) {
        // Loop through square x
        for (let x = 0; x < 3; x++) {
            let currentCell = (squareY + squareX) + y * 9 + x;
            // Check if the cell is empty
            if (sudokuBoard[currentCell] == 0) {
                // Loop through possible numbers
                for (let i = 1; i <= 9; i++) {
                    // Check if number already exist in the square, row and column
                    if (!IsInSquare((squareY + squareX), i) && !IsInRow(squareY + (y * 9), i) && !IsInCol(squareX + x, i)) {
                        // Check if only 1 cell in the square can contain that number(i)
                        if (ViableNumberOptionsInSquare(squareY, squareX, i) == 1) {
                            sudokuBoard[currentCell] = i;
                            boardEmptyCount--;
                            break;
                        }
                    }
                }
            }
        }
    }
}

function DisplayBoard(){
    for (let i=0; i<81; i++) {
        let tempInput = document.getElementById("input" + i);
        if (tempInput.value == "" || tempInput.value == "?") {
            if (sudokuBoard[i] != 0) {
                tempInput.style.color = "#00a166";
                tempInput.value = sudokuBoard[i];
            }
            else {
                tempInput.style.color = "#700000";
                tempInput.value = "?";
            }
        }
    }
}

function SolveSudoku() {
    // Fix background
    ResetBackground();

    // Parsing
    ParseBoard();
    
    // Check board integrity
    if(!CheckBoardIntegrity()) {
        return;
    }

    // Solving
    while (boardEmptyCount != 0) {
        let tempEmptyCount = boardEmptyCount;
        /* Solving START */
        SolveRows();
        SolveCols();
        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++) {
                SolveSquare(y * 27, x * 3); /* 27 because 3 rows * 9 cols */
            }
        }
        /* Solving END */
        if (boardEmptyCount == tempEmptyCount) {
            break;
        }
    }

    // Displaying the board
    DisplayBoard(sudokuBoard);
}
