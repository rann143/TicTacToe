
const gameBoard = (function CreateGameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];


    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

   
    //Winnging Combos
    const winCombos = [
    // horizontal 3-in-a-rows
    [[0,0], [0,1], [0,2]],
    [[1,0], [1,1], [1,2]],
    [[2,0], [2,1], [2,2]],
    // vertical 3-in-a-rows
    [[0,0], [1,0], [2,0]],
    [[0,1], [1,1], [2,1]],
    [[0,2], [1,2], [2,2]],
    // diagonal 3-in-a-rows
    [[0,0], [1,1], [2,2]],
    [[0,2], [1,1], [2,0]],
    
    ];

    const getWinningCombos = () => winCombos;


    const getBoard = () => board;

    const placeMarker = (rowSelection, columnSelection, player) => {

        board[rowSelection][columnSelection].addMarker(player);
       
        //THIS LOGIC BELOW NOW IN THE GAMECONTROLLER 
        // if (board[rowSelection][columnSelection].getValue() === 0) {

        // board[rowSelection][columnSelection].addMarker(player);

        // } else {
        //     alert("spot already played");
        // }

    };


    const printBoard = () => {

        const updatedBoard = board.map((row) => row.map(cell => cell.getValue()));

        console.log(updatedBoard);

    };

    return {
        
        getBoard,
        getWinningCombos,
        placeMarker,
        printBoard,
        
    }

})();



function Cell() {
    let value = 0;

    const addMarker = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {
        addMarker,
        getValue
    }

}


function GameController(

player1 = "Player 1",
player2 = "Player 2"

) {

    const board = gameBoard;

    const players = [
        {
            name: player1,
            marker: 1,
            moves: [],
        },
        {
            name: player2,
            marker: 2,
            moves: [],
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

    const playRound = (rowPlacement, columnPlacement) => {

        if (board.getBoard()[rowPlacement][columnPlacement].getValue() === 0) {

            board.placeMarker(rowPlacement, columnPlacement, getActivePlayer().marker);
            console.log(`${getActivePlayer().name} has moved`);

            //Add functionality to check for a winner and handle that logic
            // getActivePlayer().moves.push([rowPlacement, columnPlacement]);

            if (hasWon() === true) {
                alert(`${getActivePlayer().name} WINS!!!`)
            }



            switchPlayer();
            printNewRound();

        } else {
                alert("spot already played");
        }

    };

    const hasWon = () => {

        for (let i = 0; i < 3; i++) {
            // check if row i match and aren’t 0
            if (board.getBoard()[i][0].getValue() > 0
                && board.getBoard()[i][0].getValue() == board.getBoard()[i][1].getValue()
                && board.getBoard()[i][1].getValue() == board.getBoard()[i][2].getValue()) {
                return true;
            }
        }

        for (let i = 0; i < 3; i++) {
            // check if column i match and aren’t 0
            if (board.getBoard()[0][i].getValue() > 0
                && board.getBoard()[0][i].getValue() == board.getBoard()[1][i].getValue()
                && board.getBoard()[1][i].getValue() == board.getBoard()[2][i].getValue()) {
                return true;
            }
        }

        for (let i = 0; i < 1; i++) {
            // check if back diagonal spaces are matching
            if (board.getBoard()[i][i].getValue() > 0
                && board.getBoard()[i][i].getValue() == board.getBoard()[(i + 1)][(i + 1)].getValue()
                && board.getBoard()[(i + 1)][(i + 1)].getValue() == board.getBoard()[(i + 2)][(i + 2)].getValue()) {
                    return true
                }
        }

        for (let i = 0; i < 1; i++) {
            //check if forward diagonal spaces are matching
            if (board.getBoard()[i][(i+2)].getValue() > 0
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
        hasWon,

    }

}

const game = GameController();