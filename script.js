const squares = document.querySelectorAll(".square");
const winnertext = document.querySelector("#title");
const restart = document.querySelector("#restart");
const start = document.querySelector("#start");



const Players = (name, weapon) => {
    return {name, weapon};
}
const Player1 = Players("Plato", "x");
const Player2 = Players("Darwin", "o");


console.log(Player1)

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
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        winConditions.forEach(winCondition => {
            if (gameBoard[winCondition[0]] === gameBoard[winCondition[1]] &&
                gameBoard[winCondition[1]] === gameBoard[winCondition[2]] &&
                gameBoard[winCondition[0]] != ''){
                const winnerWeapon = gameBoard[winCondition[0]];
                gameOver(winnerWeapon);
            }
        });
    };

    const gameOver = (winner) => {
        if (winner === `${Player1.weapon}`){
            winnertext.textContent = `We have a winner! ${Player1.name}!`;
    } 
        else if (winner === `${Player2.weapon}`){
            winnertext.textContent = `We have a winner! ${Player2.name}!`;
    } 
        else if (winner != `${Player1.weapon}` && winner != `${Player2.weapon}` && !gameBoard.includes("")){
            winnertext.textContent = "We have a draw!"
        }
    }   
    
    return {gameBoard, fillArray, checkWin};
})();

const namePlayer1 = document.querySelector("#firstplayer").value;
    console.log(namePlayer1)

const displayController = (() => {
    const board = Object.create(gameBoardModule);

    
    
    const setNames = () => {
        if (document.querySelector("#firstplayer").value != ""){
            Player1.name = document.querySelector("#firstplayer").value;
        }
        if (document.querySelector("#secondplayer").value != ""){
            Player2.name = document.querySelector("#secondplayer").value;
        }
    };

    const startGame = () => {
        start.addEventListener("click", () => {
            setNames();
            fillBoard();
            
    });
    };

    const render = () => {
    for (let i = 0; i < gameBoard.length; i++) {
        const current = document.getElementById(`${i}`);
        if (gameBoard[i] === "x"){
            current.style.color = "#0ea5e9";
        }
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

    const restartGame = () => {
        restart.addEventListener("click", () => {
            gameBoard = ["", "", "", "", "", "", "", "", ""];
            winnertext.textContent = "Let's play again!"
            squares.forEach(square => {
                square.addEventListener("click", () => {
                    square.style.color = "#404040";
                })
            });
            setNames();
            render();
        })
    };

    restartGame();
    startGame();
    return {render, fillBoard};
})();


//after game is over stop event listener which populates
//draw doesn't work properly
