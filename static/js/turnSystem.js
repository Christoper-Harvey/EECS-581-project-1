let turn = 1; //int to track which player's turn it is - alternates between 1 and 2
let p1 = new Player(1)  //Player with id 1
let p2 = new Player(2) //Player with id 2

//makes it the next player's turn
function nextTurn() {
    if(turn == 1) {//change to p2's turn
        turn = 2;
        document.getElementById("p1self").style.display = "none";
        document.getElementById("p1opponent").style.display = "none";

        document.getElementById("p2self").style.display = "grid";
        document.getElementById("p2opponent").style.display = "grid";

        document.getElementById("player-turn").innerText = "Player 2's Turn";
        // window.alert("Player 2: Your Turn\n" + p1.shipsLeft + " ships remaining");
    } else {//change to p1's turn
        turn = 1;
        document.getElementById("p1self").style.display = "grid";
        document.getElementById("p1opponent").style.display = "grid";

        document.getElementById("p2self").style.display = "none";
        document.getElementById("p2opponent").style.display = "none";

        document.getElementById("player-turn").innerText = "Player 1's Turn";
        // window.alert("Player 1: Your Turn\n" + p2.shipsLeft + " ships remaining");
    }

    return turn
}