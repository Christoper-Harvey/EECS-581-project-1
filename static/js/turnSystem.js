let turn = 1; //int to track which player's turn it is - alternates between 1 and 2
p1 = new Player(1)  //Player with id 1
p2 = new Player(2) //Player with id 2

//makes it the next player's turn
function nextTurn() {
    if(turn == 1) {
        turn = 2;
    } else {
        turn = 1;
    }
    window.alert("Player " + turn + ": Your Turn"); //make fancy later
}