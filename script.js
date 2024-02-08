
const gameBoard = (function CreateGameboard() {
   
    const rows = 3;
    const columns = 3;
    const board = [];

    const setFirstBoard = () => {
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns; j++) {
                board[i].push(Cell());
            }
        }
    }      

    setFirstBoard();

    const getBoard = () => board;

    const placeMarker = (rowSelection, columnSelection, player) => {

        board[rowSelection][columnSelection].addMarker(player);

    };


    const printBoard = () => {

        const updatedBoard = board.map((row) => row.map(cell => cell.getValue()));

        console.log(updatedBoard);

    };

    const setNewBoard = () => {

        board.forEach((row) => row.forEach((cell) => cell.reset()));

        console.log(board);

    }

    return {
        
        getBoard,
        placeMarker,
        printBoard,
        setNewBoard,
        
    }

})();

function Cell() {
    let value = "";

    const addMarker = (player) => {
        value = player;
    };

    const reset = () => {
        value = "";
    }

    const getValue = () => value;

    return {
        addMarker,
        getValue, 
        reset
    }

}

function GameController(

player1 = "Player X",
player2 = "Player O"

) {

    const board = gameBoard;

    const players = [
        {
            name: player1,
            marker: "X",
        },
        {
            name: player2,
            marker: "O",
        }
    ];

    let activePlayer = players[0];

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {

        board.printBoard();
        console.log(
            `${getActivePlayer().name}'s turn`
        );

    };

    const printNewGame = () => {
        board.setNewBoard();
    }

    const playRound = (rowPlacement, columnPlacement) => {

        if (board.getBoard()[rowPlacement][columnPlacement].getValue() === "") {

            board.placeMarker(rowPlacement, columnPlacement, getActivePlayer().marker);
            console.log(`${getActivePlayer().name} has moved`);

            //Functionality to check for a winner and handle that logic

            if (hasWon() === true) {
                alert(`${getActivePlayer().name} WINS!!!`);
                printNewGame();
                
            }
            else if (board.getBoard().every(row => row.every(isFilled)) && hasWon() === false) {
                alert('Tie Game!');
                printNewGame();
            }
            else {
                switchPlayer();
                printNewRound();
            }


            


        } else {
                alert("spot already played");
        }

    };

    const isFilled = (cell) => cell.getValue() !== "";

    const hasWon = () => {

        for (let i = 0; i < 3; i++) {
            // check if row i match and aren’t 0
            if (board.getBoard()[i][0].getValue() !== ""
                && board.getBoard()[i][0].getValue() == board.getBoard()[i][1].getValue()
                && board.getBoard()[i][1].getValue() == board.getBoard()[i][2].getValue()) {
                return true;
            }
        }

        for (let i = 0; i < 3; i++) {
            // check if column i match and aren’t 0
            if (board.getBoard()[0][i].getValue() !== ""
                && board.getBoard()[0][i].getValue() == board.getBoard()[1][i].getValue()
                && board.getBoard()[1][i].getValue() == board.getBoard()[2][i].getValue()) {
                return true;
            }
        }

        for (let i = 0; i < 1; i++) {
            // check if back diagonal spaces are matching
            if (board.getBoard()[i][i].getValue() !== ""
                && board.getBoard()[i][i].getValue() == board.getBoard()[(i + 1)][(i + 1)].getValue()
                && board.getBoard()[(i + 1)][(i + 1)].getValue() == board.getBoard()[(i + 2)][(i + 2)].getValue()) {
                    return true
                }
        }

        for (let i = 0; i < 1; i++) {
            //check if forward diagonal spaces are matching
            if (board.getBoard()[i][(i+2)].getValue() !== ""
                && board.getBoard()[i][(i + 2)].getValue() == board.getBoard()[(i + 1)][(i + 1)].getValue()
                && board.getBoard()[(i + 1)][(i + 1)].getValue() == board.getBoard()[(i + 2)][i].getValue()) {
                    return true
                }
        }
        
        //Hard-coded version below:

        // //logic for horizontal wins
        // if ((board.getBoard()[0][0].getValue() === 1 && board.getBoard()[0][1].getValue() === 1 && board.getBoard()[0][2].getValue() === 1) || 
        // (board.getBoard()[0][0].getValue() === 2 && board.getBoard()[0][1].getValue() === 2 && board.getBoard()[0][2].getValue() === 2)) 
        // {
        //     return true;

        // } 
        // else if ((board.getBoard()[1][0].getValue() === 1 && board.getBoard()[1][1].getValue() === 1 && board.getBoard()[1][2].getValue() === 1) || 
        // (board.getBoard()[1][0].getValue() === 2 && board.getBoard()[1][1].getValue() === 2 && board.getBoard()[1][2].getValue() === 2)) 
        // {
        //     return true;
        // }
        // else if ((board.getBoard()[2][0].getValue() === 1 && board.getBoard()[2][1].getValue() === 1 && board.getBoard()[2][2].getValue() === 1) || 
        // (board.getBoard()[2][0].getValue() === 2 && board.getBoard()[2][1].getValue() === 2 && board.getBoard()[2][2].getValue() === 2)) 
        // {
        //     return true;
        // }
        // // logic for vertical wins
        // else if ((board.getBoard()[0][0].getValue() === 1 && board.getBoard()[1][0].getValue() === 1 && board.getBoard()[2][0].getValue() === 1) || 
        // (board.getBoard()[0][0].getValue() === 2 && board.getBoard()[1][0].getValue() === 2 && board.getBoard()[2][0].getValue() === 2)) 
        // {
        //     return true;

        // } 
        // else if ((board.getBoard()[0][1].getValue() === 1 && board.getBoard()[1][1].getValue() === 1 && board.getBoard()[2][1].getValue() === 1) || 
        // (board.getBoard()[0][1].getValue() === 2 && board.getBoard()[1][1].getValue() === 2 && board.getBoard()[2][1].getValue() === 2)) 
        // {
        //     return true;
        // }
        // else if ((board.getBoard()[0][2].getValue() === 1 && board.getBoard()[1][2].getValue() === 1 && board.getBoard()[2][2].getValue() === 1) || 
        // (board.getBoard()[0][2].getValue() === 2 && board.getBoard()[1][2].getValue() === 2 && board.getBoard()[2][2].getValue() === 2)) 
        // {
        //     return true;
        // }
        // // logic for diagonals
        // else if ((board.getBoard()[0][0].getValue() === 1 && board.getBoard()[1][1].getValue() === 1 && board.getBoard()[2][2].getValue() === 1) || 
        // (board.getBoard()[0][0].getValue() === 2 && board.getBoard()[1][1].getValue() === 2 && board.getBoard()[2][2].getValue() === 2)) 
        // {
        //     return true;
        // }
        // else if ((board.getBoard()[0][2].getValue() === 1 && board.getBoard()[1][1].getValue() === 1 && board.getBoard()[2][0].getValue() === 1) || 
        // (board.getBoard()[0][2].getValue() === 2 && board.getBoard()[1][1].getValue() === 2 && board.getBoard()[2][0].getValue() === 2)) 
        // {
        //     return true;
        // }

        return false;
        

    };

    printNewRound();

    return {

        playRound,
        getActivePlayer,
        getBoard: board.getBoard(),
        hasWon,
        printNewGame,

    }

}

const display = (function ScreenController() {

    const game = GameController();
    const playerTurnDiv = document.querySelector(".turn");
    const boardDiv = document.querySelector(".board");
    const resetGameBtn = document.querySelector(".reset");

    const updateScreen = () => {
        boardDiv.textContent = "";
    

        const board = game.getBoard;
        const activePlayer = game.getActivePlayer();

        playerTurnDiv.textContent = `${activePlayer.name}'s Move!`;

        board.forEach((row, index0) => {

            row.forEach((cell, index) => {
            const cellButton = document.createElement("button");
            cellButton.classList.add('cell');
        
            cellButton.dataset.row = index0;
            cellButton.dataset.column = index;
            cellButton.textContent = cell.getValue();
            boardDiv.appendChild(cellButton);
            })
        })

    }

    function clickHandlerBoard(e) {
        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;

        if (!selectedRow || !selectedColumn) return;

        game.playRound(selectedRow, selectedColumn);
        updateScreen();
    }

    resetGameBtn.addEventListener('click', event => { 
        game.printNewGame();
        updateScreen();
    }
    );

    boardDiv.addEventListener('click', clickHandlerBoard);

    updateScreen();

})();
