/**
 * NAME: Battleship - EECS581 Project 1 - turnSystem
 * DESCRIPTION: This program controls switching turns in the game of battleship
 * INPUT: None
 * OUTPUT: changes UI to reflect a change in player's turn and switches game state to player's turn
 * SOURCES: None
 * AUTHORS: Ryan Strong
 * DATE: 9/11/24
 */

let turn = 1; //int to track which player's turn it is - alternates between 1 and 2
let p1 = new Player(1)  //Player with id 1
let p2 = new Player(2) //Player with id 2

//switches turn to the next player
function nextTurn() {
    if(turn == 1) {//change to p2's turn
        turn = 2;//turn tracker now shows p2
        document.getElementById("p1self").style.display = "none";//hide p1's boards
        document.getElementById("p1opponent").style.display = "none";

        document.getElementById("p2self").style.display = "grid";//unhide p2's boards
        document.getElementById("p2opponent").style.display = "grid";

        document.getElementById("game-state").innerText = "Player 2's Turn";//top of page now says it's p2's turn
    } else {//change to p1's turn
        turn = 1;//turn tracker to p1
        document.getElementById("p1self").style.display = "grid";//unhide p1's boards
        document.getElementById("p1opponent").style.display = "grid";

        document.getElementById("p2self").style.display = "none";//hide p2's boards
        document.getElementById("p2opponent").style.display = "none";

        document.getElementById("game-state").innerText = "Player 1's Turn";//top of page now says its p1's turn
    }

    return turn
}