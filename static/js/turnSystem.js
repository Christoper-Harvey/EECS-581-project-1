let turn = 1; //int to track which player's turn it is - alternates between 1 and 2
p1 = new Player(1)  //Player with id 1
p2 = new Player(2) //Player with id 2

//makes it the next player's turn
function nextTurn() {
    if(turn == 1) {
        turn = 2;
        document.getElementById("p1-wrapper").style.display = "none";
        document.getElementById("p2-wrapper").style.display = "flex";
    } else {
        turn = 1;
        document.getElementById("p2-wrapper").style.display = "none";
        document.getElementById("p1-wrapper").style.display = "flex";
    }
    window.alert("Player " + turn + ": Your Turn"); //make fancy later

    return turn
}