const squares = document.querySelectorAll(".square");
const winnertext = document.querySelector("#title");

const Players = (name, weapon) => {
    return {name, weapon};
};
const Player1 = Players("Plato", "x");
const Player2 = Players("Darwin", "o");

const gameBoardModule = (() => {    
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    let player = Math.random() < 0.5 ? Player1 : Player2;

    const fillArray = (e) => {
        if (e.target.textContent != "x" && e.target.textContent != "o"){
            if (player === Player1){
                gameBoard.splice(e.target.id, 1, player.weapon);
                player = Player2;
            } else if (player === Player2) {
                gameBoard.splice(e.target.id, 1, player.weapon);
                player = Player1;  
            }   
        }
        checkWin();
        render(); 
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

        for (winCondition of winConditions){
            if (gameBoard[winCondition[0]] === gameBoard[winCondition[1]] &&
                gameBoard[winCondition[1]] === gameBoard[winCondition[2]] &&
                gameBoard[winCondition[0]] != ''){
                const winnerWeapon = gameBoard[winCondition[0]];
                removefillBoard();
                return gameOver(winnerWeapon);
            }
        }
        if (!gameBoard.includes("")){
            return gameOver("draw!"); 
        }
    };

    const gameOver = (winner) => {
        if (winner === `${Player1.weapon}`){
            winnertext.textContent = `We have a winner! ${Player1.name}!`;
    } 
        else if (winner === `${Player2.weapon}`){
            winnertext.textContent = `We have a winner! ${Player2.name}!`;
    } 
        else {
            winnertext.textContent = "We have a draw!"
        }
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
            square.addEventListener("click", fillArray);
        });
        };
        
    const removefillBoard = () => {
            squares.forEach(square => {
                square.removeEventListener("click", fillArray);
            });
            };

    return {gameBoard, fillArray, checkWin, render, fillBoard, removefillBoard};
})();


const displayController = (() => {
    const board = gameBoardModule;

    const setNames = () => {
        if (document.querySelector("#firstplayer").value != ""){
            Player1.name = document.querySelector("#firstplayer").value;
        }
        if (document.querySelector("#secondplayer").value != ""){
            Player2.name = document.querySelector("#secondplayer").value;
        }
    };

    const resetColors = () => {
        squares.forEach(square => {
            square.addEventListener("click", () => {
                square.style.color = "#404040";
            })
        });
    };

    const startGame = () => {
        const start = document.querySelector("#start");
        start.addEventListener("click", () => {
            setNames();
            board.fillBoard();       
    });
    };

    const restartGame = () => {
        const restart = document.querySelector("#restart");
        restart.addEventListener("click", () => {
            gameBoard = ["", "", "", "", "", "", "", "", ""];
            winnertext.textContent = "Let's play again!";
            resetColors();
            board.removefillBoard();
            board.fillBoard();
            setNames();
            board.render();
        })
    };

    restartGame();
    startGame();
    return {};
})();


