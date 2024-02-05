
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

    const winningCombos = [
    // horizontal 3-in-a-rows
    [board[0][0], board[0][1], board[0][2]],
    [board[1][0], board[1][1], board[1][2]],
    [board[2][0], board[2][1], board[2][2]],
    // vertical 3-in-a-rows
    [board[0][0], board[1][0], board[2][1]],
    [board[0][1], board[1][1], board[2][1]],
    [board[0][2], board[1][2], board[2][2]],
    // diagonal 3-in-a-rows
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]],

    ];

    const getBoard = () => board;
    const getWinningCombos = () => winningCombos;

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

gameBoard.printBoard();


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
        },
        {
            name: player2,
            marker: 2,
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

            switchPlayer();
            printNewRound();
    
        } else {
                alert("spot already played");
        }

        

    };

    //printNewRound();

    return {

        playRound,
        getActivePlayer,

    }

}

const game = GameController();