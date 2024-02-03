
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

    const getBoard = () => board;

    const placeMarker = (rowSelection, columnSelection, player) => {

        if (board[rowSelection][columnSelection].getValue() === 0) {

        board[rowSelection][columnSelection].addMarker(player);

        } else {
            alert("spot already played");
        }

    };


    const printBoard = () => {

        const updatedBoard = board.map((row) => row.map(cell => cell.getValue()));

        console.log(updatedBoard);

    };

    return {
        
        getBoard,
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


function GameController() {


    

}