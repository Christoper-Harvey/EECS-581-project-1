document.addEventListener("DOMContentLoaded", function () {
    const colLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const rowLabels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

    var hasFired = false;   //tracker to allow payer to fire only once per turn

    let isAttackPhase = false;
    let p2PlaceShips = false;

    let p1hits = 0;
    let p1miss = 0;
    let p2hits = 0;
    let p2miss = 0;
    let turn = 1;

    let numShips = 0;
    let shipsToPlace = [];
    let currentShipIndex = 0;

    const boards = [
        document.getElementById("p1opponent"),
	    document.getElementById("p2opponent"),
    ]

    document.getElementById('pass').addEventListener('click', function() {
        // Hide the pass screen when the button is clicked
        document.getElementById('pass-screen').style.display = 'none';
    });
    
    // Function to show the pass screen
    function showPassScreen() {
        document.getElementById("pass-screen").children[0].innerText = `Pass computer to Player ${turn}`;
        document.getElementById('pass-screen').style.display = 'flex';
    }
    

    document.getElementById('start-game-button').addEventListener('click', function() {
        document.getElementById('start-game-prompt').style.display = 'none';
        document.getElementById('start-game-button').style.display = 'none';
        document.getElementById('controls').style.display = 'block';
        document.getElementById("game-state").innerText = "Ship Count";
    });

    document.getElementById("shipConfirm").addEventListener("click", function (){

        document.getElementById("game-state").innerText = "Player 1's Turn";

        numShips = parseInt(document.getElementById("ship-length").value);

        document.getElementById("shipConfirm").style.display = "none";
        document.getElementById("ship-length").style.display = "none";
        document.getElementById("ship-length-label").style.display = "none";

        document.getElementById("start-coord").style.display = "inline";
        document.getElementById("start-coord-label").style.display = "inline";

        document.getElementById("direction").style.display = "inline";
        document.getElementById("direction-label").style.display = "inline";

        document.getElementById("place-ship").style.display = "inline";
        document.getElementById("next-player-place-ship").style.display = "inline";

        for (let i = 1; i <= numShips; i++) {
            shipsToPlace.push(i);  // Ships will be placed from size 1x1 up to 1xN
        }
        updateShipPlacementStatus();
    });

    // Function to update ship placement status
    function updateShipPlacementStatus() {
        const statusElement = document.getElementById("ship-placement-status");
        if (currentShipIndex < shipsToPlace.length) {
            statusElement.innerText = `Place ship of size ${shipsToPlace[currentShipIndex]}`;
        } else {
            statusElement.innerText = "All ships placed!";
            document.getElementById("next-player-place-ship").disabled = false;
            document.getElementById("place-ship").disabled = true;
            if (p2PlaceShips){
                document.getElementById("start-game").disabled = false;
            }
        }
    }

    // Event listener to start the attack phase
    document.getElementById("next-player-place-ship").addEventListener("click", function () {
        if (currentShipIndex >= shipsToPlace.length) {
            // Player 1 is done, switch to Player 2
            turn = 2;
            showPassScreen();

            p2PlaceShips = true;
            currentShipIndex = 0;  // Reset for Player 2

            document.getElementById("game-state").innerText = "Player 2's Turn";

            document.getElementById("p1self").style.display = "none";
            document.getElementById("p1opponent").style.display = "none";

            document.getElementById("p2self").style.display = "grid";
            document.getElementById("p2opponent").style.display = "grid";

            document.getElementById("start-coord").value = "";
            document.getElementById("place-ship").disabled = false;

            document.getElementById("next-player-place-ship").style.display = "none";
            // document.getElementById("start-game").disabled = true;  // Disable until Player 2 places all ships
            document.getElementById("start-game").style.display = "inline";
            updateShipPlacementStatus();  // Reset status for Player 2
            // alert("Player 2, place your ships!");
        }
    });


    // Event listener to start the attack phase
    document.getElementById("start-game").addEventListener("click", function () {
        turn = 1;
        showPassScreen();
        isAttackPhase = true;
        // nextTurn();
        document.getElementById("p1self").style.display = "grid";
        document.getElementById("p1opponent").style.display = "grid";

        document.getElementById("p2self").style.display = "none";
        document.getElementById("p2opponent").style.display = "none";

        document.getElementById("controls").style.display = "none"; // Hide controls after ship placement
        document.getElementById("scoreboard").style.display = "inline";
        document.getElementById("end-turn").style.display = "block"; // Show end turn button
        // alert("All ships placed! Attack phase begins.");
        document.getElementById('p1-ships-left').innerText = p1.shipsLeft;
        document.getElementById('p2-ships-left').innerText = p2.shipsLeft;

        document.getElementById("game-state").innerText = "Player 1's Turn";
    });

    // Event listener for swapping turns
    document.getElementById("end-turn").addEventListener("click", function () {
        if (!hasFired) {
            alert("You haven't fired your shot yet!");
            return;
        }
        turn = nextTurn(); // I added this here so we can use the turn to do functions. This can be removed if not needed.
        showPassScreen();
        hasFired = false;
    });

    // Event listener for placing ships
    document.getElementById("place-ship").addEventListener("click", function () {
        const shipLength = shipsToPlace[currentShipIndex];
        const startCoord = document.getElementById("start-coord").value.toUpperCase();
        const direction = document.getElementById("direction").value;

        const startCol = colLabels.indexOf(startCoord[0]);
        const startRow = parseInt(startCoord.slice(1)) - 1;

        if (startCol === -1 || startRow === -1) {
            alert("Invalid coordinate.");
            return;
        }

        // Check if the ship fits within the grid
        if (!canPlaceShip(startRow, startCol, shipLength, direction)) {
            alert("Ship cannot be placed at this location.");
            return;
        }

        // Place ship and move to the next ship
        placeShip(startRow, startCol, shipLength, direction);
        currentShipIndex++;
        updateShipPlacementStatus();

        // Check if all ships are placed
        if (currentShipIndex >= shipsToPlace.length) {
            document.getElementById("next-player-place-ship").disabled = false;
        }
    });

    // Check if a ship can be placed on the board
    function canPlaceShip(row, col, length, direction) {
        if (direction === "horizontal") {
            if (col + length > 10) return false;
            for (let i = 0; i < length; i++) {
                if (p2PlaceShips){
                    if (p2.ships.some(ship => ship.row === row && ship.col === col + i)) {
                        return false; // A ship is already here
                    }
                } else{
                    if (p1.ships.some(ship => ship.row === row && ship.col === col + i)) {
                        return false; // A ship is already here
                    }
                }
            }
        } else if (direction === "vertical") {
            if (row + length > 10) return false;
            for (let i = 0; i < length; i++) {
                if (p2PlaceShips){
                    if (p2.ships.some(ship => ship.row === row + i && ship.col === col)) {
                        return false; // A ship is already here
                    }
                } else{
                    if (p1.ships.some(ship => ship.row === row + i && ship.col === col)) {
                        return false; // A ship is already here
                    }
                }

            }
        }
        return true;
    }

    // Place ship on the board
    function placeShip(row, col, length, direction) {
        let boardId = p2PlaceShips ? "p2self" : "p1self"; // Determine which player's board
        const board = document.getElementById(boardId);   // Get the correct board element
        let coordinates = [];  // Array to store ship's positions in "A1" format
    
        for (let i = 0; i < length; i++) {
            const currentRow = direction === "horizontal" ? row : row + i;
            const currentCol = direction === "horizontal" ? col + i : col;
    
            // Query the correct cell in the specified board
            const cell = board.querySelector(`.cell[data-row="${currentRow}"][data-col="${currentCol}"]`);
            cell.classList.add("placed");
    
            // Convert currentRow and currentCol to "A1" format and add to coordinates array
            const colLabel = colLabels[currentCol]; // 'A', 'B', etc.
            const rowLabel = rowLabels[currentRow]; // '1', '2', etc.
            const coord = `${colLabel}${rowLabel}`;
            coordinates.push(coord); // Add to the ship's coordinates array
        }
    
        // Store the ship's coordinates in the player's ship array
        if (p2PlaceShips) {
            p2.addShip(length, coordinates); // Pass the array of coordinates to Player class
        } else {
            p1.addShip(length, coordinates); // Pass the array of coordinates to Player class
        }
    }


    // Click event handler for attacking
    boards.forEach(board => {
        board.addEventListener("click", function (event) {
            if (isAttackPhase && !hasFired && event.target.classList.contains("cell")) {
                const row = event.target.dataset.row;
                const col = event.target.dataset.col;
                const coord = `${colLabels[col]}${rowLabels[row]}`; // Convert row/col to A1 format
    
                if (board == document.getElementById("p1opponent")) {
                    // Player 1 is attacking Player 2's ships
                    let hitShip = null;
                    let hitResult = { hit: false, sunk: false }; // Store hit results
    
                    p2.ships.forEach((ship, index) => {
                        const result = ship.hit(coord);
                        if (result.hit) {
                            hitShip = ship;
                            hitResult = result; // Store the result of the hit
                        }
                    });
    
                    if (hitResult.hit) {
                        // Check if the cell has already been hit
                        if (!event.target.classList.contains('hit') && !event.target.classList.contains('miss')) {
                            hasFired = true;
                            canonFire.play();
                            setTimeout(() => {
                                event.target.classList.add("hit");
                                document.getElementById('p2self').querySelector(`.cell[data-row="${row}"][data-col="${col}"]`).classList.add("hit-self");
                                playRandomHitSound();
                                playHitAnimation(event.target);
    
                                // Check if the ship is sunk
                                if (hitResult.sunk) {
                                    playSunkSound();
                                    p2.shipsLeft--;
                                    checkWin();
                                }
    
                                p1hits++;
                                document.getElementById('p1-hits').innerText = p1hits;
                                document.getElementById('p2-ships-left').innerText = p2.shipsLeft;
                            }, 1500);
                        }
                    } else {
                        // Missed the ship
                        if (!event.target.classList.contains('miss') && !event.target.classList.contains('hit')) {
                            hasFired = true;
                            canonFire.play();
                            setTimeout(() => {
                                event.target.classList.add("miss");
                                document.getElementById('p2self').querySelector(`.cell[data-row="${row}"][data-col="${col}"]`).classList.add("miss-self");
                                playRandomMissSound();
                                playMissAnimation(event.target);
                                p1miss++;
                                document.getElementById('p1-miss').innerText = p1miss;
                            }, 1500);
                        }
                    }
                } else {
                    // Player 2 is attacking Player 1's ships
                    let hitShip = null;
                    let hitResult = { hit: false, sunk: false }; // Store hit results
    
                    p1.ships.forEach((ship, index) => {
                        const result = ship.hit(coord);
                        if (result.hit) {
                            hitShip = ship;
                            hitResult = result; // Store the result of the hit
                        }
                    });
    
                    if (hitResult.hit) {
                        // Check if the cell has already been hit
                        if (!event.target.classList.contains('hit') && !event.target.classList.contains('miss')) {
                            hasFired = true;
                            canonFire.play();
                            setTimeout(() => {
                                event.target.classList.add("hit");
                                document.getElementById('p1self').querySelector(`.cell[data-row="${row}"][data-col="${col}"]`).classList.add("hit-self");
                                playRandomHitSound();
                                playHitAnimation(event.target);
    
                                // Check if the ship is sunk
                                if (hitResult.sunk) {
                                    playSunkSound();
                                    p1.shipsLeft--;
                                    checkWin();
                                }
    
                                p2hits++;
                                document.getElementById('p2-hits').innerText = p2hits;
                                document.getElementById('p1-ships-left').innerText = p1.shipsLeft;
                            }, 1500);
                        }
                    } else {
                        // Missed the ship
                        if (!event.target.classList.contains('miss') && !event.target.classList.contains('hit')) {
                            hasFired = true;
                            canonFire.play();
                            setTimeout(() => {
                                event.target.classList.add("miss");
                                document.getElementById('p1self').querySelector(`.cell[data-row="${row}"][data-col="${col}"]`).classList.add("miss-self");
                                playRandomMissSound();
                                playMissAnimation(event.target);
                                p2miss++;
                                document.getElementById('p2-miss').innerText = p2miss;
                            }, 1500);
                        }
                    }
                }
            } else if (isAttackPhase && event.target.classList.contains("cell") && hasFired) {
                alert("You can only fire once per turn.");
            }
        });
    });
    
    

    //checks if a player has won and executes end game
    function checkWin() {
        if (p2.shipsLeft == 0) {
            //p1 wins
            startFireworks();
            endGame.play();
            victoryCry.play();
            victoryTrumpet.play();
            setTimeout(() => {
                showWinnerModal('Player 1')
            }, 100);
            setTimeout(() => {champions.play();}, 5000);
        } else if (p1.shipsLeft == 0) {
            //p2 wins
            startFireworks();
            endGame.play();
            victoryCry.play();
            victoryTrumpet.play();
            setTimeout(() => {
                showWinnerModal('Player 2')
            }, 100);
            setTimeout(() => {champions.play();}, 5000);
        }
    }

    function showWinnerModal(winner) {
        const modal = document.getElementById("win-modal");
        const winnerMessage = document.getElementById("winner-message");
        winnerMessage.innerText = `${winner} WINS!`;
        modal.style.display = "flex";  // Show the modal
    }

    document.getElementById("play-again-button").addEventListener("click", function () {
        location.reload();  // Refresh the page to start over
    });
});