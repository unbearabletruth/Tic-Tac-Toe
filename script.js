const squares = document.querySelectorAll(".square");

const Players = (name, weapon) => {
    return {name, weapon};
}

const Player1 = Players("Plato", "x");
const Player2 = Players("Darwin", "o");

const gameBoardModule = (() => {    
    gameBoard = ["", "", "", "", "", "", "", "", ""];

    return {gameBoard};
})();

const displayController = (() => {
    const {gameBoard} = gameBoardModule;
    let player = Player1
    
    const render = () => {
    for (let i = 0; i < gameBoard.length; i++) {
        const current = document.getElementById(`${i}`);
        current.textContent = gameBoard[i];
     }
    };

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
            render();
        }
        
    };

    const fillBoard = () => {
        squares.forEach(square => {
            square.addEventListener("click", () => {
                fillArray(square);
            })
        });
        };
    
    
    fillBoard();

    
    return {render};
})();



