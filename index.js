const gameBoard = (function() { //tucking gameBoard to be a module so only one instance will be running
    const rows = 3;
    const columns = 3;
    const board = [];

    // Create a 2d array that will represent the state of the game board
    // For this 2d array, row 0 will represent the top row and
    // column 0 will represent the left-most column.
    // This nested-loop technique is a simple and common way to create a 2d array.
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    // This will be the method of getting the entire board that our
    // UI will eventually need to render it.
    const getBoard = () => board;

    const fillSquare = (space, player) => {
        while(true) {
            if (board[space[0]][space[1]].getValue() == '') { //if space is empty, we can fill it
                board[space[0]][space[1]].addToken(player);
                break;
            } else {
                console.log('Invalid, choose another square.');
                space[0] = prompt("choose x: ");
                space[1] = prompt("choose y: ");
            }
        }
        
    }

    // This method will be used to print our board to the console.
    // It is helpful to see what the board looks like after each turn as we play,
    // but we won't need it after we build our UI
    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    };

    return {getBoard, printBoard, fillSquare};
})();

function Cell() { //cell will be a factory since we need multiple
  let value = '';

  // Accept a player's token to change the value of the cell
  const addToken = (player) => {
    value = player;
  };

  // How we will retrieve the current value of this cell through closure
  const getValue = () => value;

  return {addToken, getValue};
}

function displayController(playerOneName = "Player One", playerTwoName = "Player Two") {
    const players = [
        {name: playerOneName, token: 'X'}, //player1 is X
        {name: playerTwoName, token: 'O'} //player2 is O
    ];

    let activePlayer = players[0]; //initalize activePlayer to be player1

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        gameBoard.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const playRound = () => {
        let x = prompt("choose x: ");
        let y = prompt("choose y: ");

        gameBoard.fillSquare([x,y], getActivePlayer().token);
        switchPlayerTurn();
        printNewRound();
    };

    // Initial play game message
    printNewRound();

    return {playRound, getActivePlayer};
}

const play = displayController();