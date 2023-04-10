const squares = document.querySelectorAll(".square");
const winnertext = document.querySelector("#title");

const Players = (name, weapon) => {
    return {name, weapon};
}

const Player1 = Players("Plato", "x");
const Player2 = Players("Darwin", "o");

const gameBoardModule = (() => {    
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    let player = Player1

    const fillArray = (square) => {
        if (square.textContent != "x" && square.textContent != "o"){
            if (player === Player1){
                gameBoard.splice(square.id, 1, player.weapon);
                console.log(gameBoard);
                player = Player2;
            } else if (player === Player2) {
                gameBoard.splice(square.id, 1, player.weapon);
                player = Player1
            }
        }  
    };

    const checkWin = () => {
        if (gameBoard[0] === gameBoard[1] && gameBoard[0] === gameBoard[2] && gameBoard[0] != ""){
            console.log(gameBoard[0])
            if (gameBoard[0] === `${Player1.weapon}`){
                winnertext.textContent = `we have a winner: ${Player1.name}`;
        }else {
            winnertext.textContent = `we have a winner: ${Player2.name}`
        }
    }
    };

    return {gameBoard, fillArray, checkWin};
})();


const displayController = (() => {
    const board = Object.create(gameBoardModule);

    const render = () => {
    for (let i = 0; i < gameBoard.length; i++) {
        const current = document.getElementById(`${i}`);
        current.textContent = gameBoard[i];
     }
    };

    const fillBoard = () => {
        squares.forEach(square => {
            square.addEventListener("click", () => {
                board.fillArray(square);
                board.checkWin();
                render();
            })
        });
        };
    
    fillBoard();
    return {render, fillBoard};
})();



