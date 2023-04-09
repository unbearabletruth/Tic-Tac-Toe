const Players = (name, weapon) => {
    return {name, weapon};
}

const Player1 = Players("Plato", "x");
const Player2 = Players("Darwin", "o");

const gameBoardModule = (() => {
    let player = Player1
    gameBoard = ["", "", "", "", "", "", "", "", ""];

    const fillArray = (e) => {
        if (player === Player1){
            gameBoard.splice(e.target.id, 1, player.weapon);
            player = Player2;
        } else if (player === Player2) {
            gameBoard.splice(e.target.id, 1, player.weapon);
            player = Player1
        }
    }
    return {gameBoard, fillArray};
})();



const displayController = (() => {
    const {gameBoard} = gameBoardModule;
    const {fillArray} = gameBoardModule;
    
    const render = () => {
    for (let i = 0; i < gameBoard.length; i++) {
        const current = document.getElementById(`${i}`);
        current.textContent = gameBoard[i];
     }
    };
    
    const fillBoard = () => {
        squares.forEach(square => {
            square.addEventListener("click", fillArray)
            console.log("her")
        });
        };
    fillBoard();
    render();
    
    return {render};
})();



