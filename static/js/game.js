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

    let numShips = 0;
    let shipsToPlace = [];
    let currentShipIndex = 0;

    const boards = [
        document.getElementById("p1opponent"),
	    document.getElementById("p2opponent"),
    ]

    // Preload audio files
    const canonFire = new Audio('/static/sfx/canonFire.wav');
    const endGame = new Audio('/static/sfx/finalExplosionGameEnd.wav');
    const victoryCry = new Audio('/static/sfx/victoryCry.wav');
    const victoryTrumpet = new Audio('/static/sfx/victoryTrumpet.wav');

    const champions = new Audio('/static/sfx/champions.wav');

    // Preload miss sounds
    const hitSounds = [
        new Audio('/static/sfx/hitLarge.wav'),
        new Audio('/static/sfx/hitSmall.wav')
    ];

    // Preload miss sounds
    const missSounds = [
        new Audio('/static/sfx/miss1.wav'),
        new Audio('/static/sfx/miss2.wav')
    ];

    document.getElementById("shipConfirm").addEventListener("click", function (){

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
            if (p2PlaceShips){
                document.getElementById("start-game").disabled = false;
            }
        }
    }

    // Event listener to start the attack phase
    document.getElementById("next-player-place-ship").addEventListener("click", function () {
        if (currentShipIndex >= shipsToPlace.length) {
            // Player 1 is done, switch to Player 2
            p2PlaceShips = true;
            currentShipIndex = 0;  // Reset for Player 2

            document.getElementById("p1-wrapper").style.display = "none";
            document.getElementById("p2-wrapper").style.display = "flex";
            document.getElementById("next-player-place-ship").style.display = "none";
            // document.getElementById("start-game").disabled = true;  // Disable until Player 2 places all ships
            document.getElementById("start-game").style.display = "inline";
            updateShipPlacementStatus();  // Reset status for Player 2
            // alert("Player 2, place your ships!");
        }
    });


    // Event listener to start the attack phase
    document.getElementById("start-game").addEventListener("click", function () {
        if (p2.shipsLeft > 0) {
            isAttackPhase = true;
            // nextTurn();
            document.getElementById("p2-wrapper").style.display = "none";
            document.getElementById("p1-wrapper").style.display = "flex";

            document.getElementById("controls").style.display = "none"; // Hide controls after ship placement
            document.getElementById("end-turn").style.display = "block"; // Show end turn button
            // alert("All ships placed! Attack phase begins.");
        }
        else {
            window.alert("You must place at least one ship.");
        }
    });

    // Event listener for swapping turns
    document.getElementById("end-turn").addEventListener("click", function () {
        if (!hasFired) {
            window.alert("You haven't fired your shot yet!");
            return;
        }
        turn = nextTurn(); // I added this here so we can use the turn to do functions. This can be removed if not needed.
        hasFired = false;
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
                // window.alert("PLAYER 1 WINS!");
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
                // window.alert("PLAYER 2 WINS!");
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


    // // Function to stop fireworks
    // function stopFireworks() {
    //     document.getElementById("fireworksCanvas").style.display = "none";
    // }


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

        for (let i = 0; i < length; i++) {
            const currentRow = direction === "horizontal" ? row : row + i;
            const currentCol = direction === "horizontal" ? col + i : col;

            // Query the correct cell in the specified board
            const cell = board.querySelector(`.cell[data-row="${currentRow}"][data-col="${currentCol}"]`);
            cell.classList.add("placed");

            // Store the ship's position in the correct player's array
            if (p2PlaceShips) {
                p2.ships.push({ row: currentRow, col: currentCol });
                p2.shipsLeft++;
            } else {
                p1.ships.push({ row: currentRow, col: currentCol });
                p1.shipsLeft++;
            }
        }
    }


    // Click event handler for attacking
    // const board = document.getElementById("p1self");
    boards.forEach(board => {
        board.addEventListener("click", function (event) {
            if (isAttackPhase && !hasFired && event.target.classList.contains("cell")) {
                const row = event.target.dataset.row;
                const col = event.target.dataset.col;
    
                if (board == document.getElementById("p1opponent")){
                        // Check if the player hits or misses
                        if (p2.ships.some(ship => ship.row == row && ship.col == col)) {
                            // Check if the cell has already been hit
                            if (!event.target.classList.contains('hit') && !event.target.classList.contains('miss')) {
                                hasFired = true;
                                canonFire.play();
                                setTimeout(() => {
                                    event.target.classList.add("hit");
                                    playRandomHitSound();
                                    playHitAnimation(event.target);
                                    p2.shipsLeft--;
                                    checkWin();
                                    p1hits++;
                                    document.getElementById('p1-hits').innerText = p1hits;
                                }, 1500);
                            }
                        } else {
                            // Check if the cell has already been missed
                            if (!event.target.classList.contains('miss') && !event.target.classList.contains('hit')) {
                                hasFired = true;
                                canonFire.play();
                                setTimeout(() => {
                                    event.target.classList.add("miss");
                                    playRandomMissSound();
                                    playMissAnimation(event.target);
                                    p1miss++;
                                    document.getElementById('p1-miss').innerText = p1miss;
                                }, 1500);
                            }
                        }
                } else {
                    // Check if the player hits or misses
                    if (p1.ships.some(ship => ship.row == row && ship.col == col)) {
                        // Check if the cell has already been hit
                        if (!event.target.classList.contains('hit') && !event.target.classList.contains('miss')) {
                            hasFired = true;
                            canonFire.play();
                            setTimeout(() => {
                                event.target.classList.add("hit");
                                playRandomHitSound();
                                playHitAnimation(event.target);
                                p1.shipsLeft--;
                                checkWin();
                                p2hits++;
                                document.getElementById('p2-hits').innerText = p2hits;
                            }, 1500);
                        }
                    } else {
                        // Check if the cell has already been missed
                        if (!event.target.classList.contains('miss') && !event.target.classList.contains('hit')) {
                            hasFired = true;
                            canonFire.play();
                            setTimeout(() => {
                                event.target.classList.add("miss");
                                playRandomMissSound();
                                playMissAnimation(event.target);
                                p2miss++;
                                document.getElementById('p2-miss').innerText = p2miss;
                            }, 1500);
                        }
                    }                        
                }
            }
            else if (isAttackPhase && event.target.classList.contains("cell") && hasFired) {
                window.alert("You can only fire once per turn.");
            }
        });
    });
    
    // Function to randomly select and play one of the miss sounds
    function playRandomMissSound() {
        const randomIndex = Math.floor(Math.random() * missSounds.length);
        missSounds[randomIndex].play();
    }

    // Function to randomly select and play one of the hit sounds
    function playRandomHitSound() {
        const randomIndex = Math.floor(Math.random() * hitSounds.length);
        hitSounds[randomIndex].play();
    }

    // Play hit animation using a GIF file
    function playHitAnimation(cell) {
        // Remove any existing hit animation
        const existingHit = cell.querySelector(".hit-animation");
        if (existingHit) {
            existingHit.remove();
        }
        const img = document.createElement("img");
        img.src = '/static/animations/explosion.gif';
        img.classList.add("hit-animation");  // Add a class for reference
        img.style.width = "50px";  // Match cell size
        img.style.height = "50px";
        cell.appendChild(img);

        // Optionally, remove the GIF after a delay (GIFs loop automatically)
        setTimeout(() => {
            img.remove();
        }, 1800);  // 1.8 second delay to remove the GIF
    }

    // Play miss animation using a GIF file
    function playMissAnimation(cell) {
        const img = document.createElement("img");
        img.src = '/static/animations/miss.gif';
        img.style.width = "50px";  // Match cell size
        img.style.height = "50px";
        cell.appendChild(img);

        // Optionally, remove the GIF after a delay (GIFs loop automatically)
        setTimeout(() => {
            img.remove();
        }, 1100);  // 1.1 second delay to remove the GIF
    }
});