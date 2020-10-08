let currentTurn = 1
let gameStatus;
let boardForm = document.querySelector('.boardForm')

const player1 = {
    name: 'Player 1',
    character: 'X'
}
const player2 = {
    name: 'Player 2',
    character: 'O'
}
init()

function init() {
    //add listener to 'New game button'
    document.querySelector('.new-game-btn')
    .addEventListener('click', createNewGame)

    //add listeners to form
    document.querySelector('.boardForm')
    .addEventListener('click', selectSquare)
}
function createNewGame(event) {
    event.preventDefault()
    currentTurn = 1;
    gameStatus = "On"
    buttons = document.querySelectorAll('.button')
    buttons.forEach( (button, index) => {
        button.innerHTML = ''
        button.value = index + 1
    })

    const board = document.querySelector('.board')
    if (board.style.display === "") {
        board.style.display = "block"
    }
    displayPlayerTurn();
}
function selectSquare(event) {
    event.preventDefault();
    let currentPlayer = checkPlayersTurn()
    if (!checkIfButtonSelected(event) && gameStatus === "On" ) {
        event.target.innerHTML = currentPlayer.character
        currentPlayer.currentTurn = false;
        event.target.value = currentPlayer.character
        displayPlayerTurn()
        checkForWinner()
        changePlayersTurn()
    } else if (gameStatus === "Off") {
        alert("The game has ended! Select New Game to play again")
    } else {
        alert("This Box was already chosen!! \nPlease Choose Another Box")
    }
}
function checkPlayersTurn() {
    if(currentTurn === 1) {
        return player1
    } else {
        return player2
    }
}
function changePlayersTurn() {
    if(currentTurn === 1) {
        currentTurn = 0;
    } else {
        currentTurn = 1;
    }
}
function displayPlayerTurn() {
    const currentPlayer = checkPlayersTurn()
    document.querySelector('.turnDisplay')
    .innerHTML = currentPlayer.name + "'s Turn <br> You Are " + currentPlayer.character + "'s"
}
function checkIfButtonSelected(event) {
    if (event.target.value == 'X' || event.target.value == 'O') {
        return true;
    } else {
        false;
    }
}
function checkIfArrayComplete(valueArray) {
    let count = 0;
    valueArray.forEach(element => {
        if (element === 'O' || element === 'X') {
            count = count + 1;
        }
    })
    return count
}
function checkForWinner() {
    buttons = document.querySelectorAll('.button')
    let valueArray = []
    buttons.forEach( (button) => {
       valueArray.push(button.value)
    })
    console.log(valueArray);
    //======= horizontal matches
    if(valueArray[0] === valueArray[1] && 
        valueArray[1] === valueArray[2] && 
        valueArray[0] === valueArray[2] ) {
        displayWinner(valueArray[0])
    } else if(valueArray[3] === valueArray[4] && 
        valueArray[4] === valueArray[5] && 
        valueArray[3] === valueArray[5] ) {
        displayWinner(valueArray[3])
    } else if(valueArray[6] === valueArray[7] && 
        valueArray[8] === valueArray[9] && 
        valueArray[6] === valueArray[9] ) {
        displayWinner(valueArray[6])
    //====== vertical matches
    } else if(valueArray[0] === valueArray[3] && 
        valueArray[3] === valueArray[6] && 
        valueArray[0] === valueArray[6] ) {
        displayWinner(valueArray[0])
    } else if(valueArray[1] === valueArray[4] && 
        valueArray[4] === valueArray[7] && 
        valueArray[1] === valueArray[7] ) {
        displayWinner(valueArray[1])
    } else if(valueArray[2] === valueArray[5] && 
        valueArray[5] === valueArray[8] && 
        valueArray[2] === valueArray[8] ) {
        displayWinner(valueArray[1])
    }
    //===== diagonal matches 
    else if(valueArray[0] === valueArray[4] && 
        valueArray[4] === valueArray[8] && 
        valueArray[0] === valueArray[8] ) {
        displayWinner(valueArray[0])
    } else if(valueArray[2] === valueArray[4] && 
        valueArray[4] === valueArray[6] && 
        valueArray[2] === valueArray[6] ) {
        displayWinner(valueArray[2])
    } else {
        let count = checkIfArrayComplete(valueArray)
        if (count === 9) {
            displayWinner()
        }
    }
    //===== horizontal winners
    // index 0, 1, 2 match - done
    // index 3, 4, 5 match - done
    // index 6, 7, 8 match - done
    //===== vertical winners
    // index 0, 3, 6 match - done
    // index 1, 4, 7 match - done 
    // index 2, 5, 8 match - done 
    //===== diagonal winners
    // index 0, 4, 8 match - done
    // index 2, 4, 6 match - done
}
function displayWinner(winningCharacter = 0) {
    if(winningCharacter === player1.character) {
        document.querySelector('.turnDisplay').innerHTML = player1.name + " is the winner!";
        endGame();
    } else if(winningCharacter === player2.character) {
        document.querySelector('.turnDisplay').innerHTML = player2.name + " is the winner!";
        endGame();
    } else {
        document.querySelector('.turnDisplay').innerHTML = "The Game is a Tie!!";
        endGame();
    }
}
function endGame() {
    gameStatus = "Off";
}



// Done
// As a user, I should be able to start a new tic tac toe game

// Done
// As a user, I should be able to click on a square to add X first and then O, and so on

// Done
// As a user, I should be shown a message after each turn for if I win, lose, tie or who's turn it is next

// Done
// As a user, I should not be able to click the same square twice

//Done
// As a user, I should be shown a message when I win, lose or tie


// As a user, I should not be able to continue playing once I win, lose, or tie

//Done
// As a user, I should be able to play the game again without refreshing the page