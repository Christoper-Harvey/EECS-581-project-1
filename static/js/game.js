document.addEventListener("DOMContentLoaded", function () {
    const colLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const rowLabels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

    let turn;

    let isAttackPhase = false;
    let p2PlaceShips = false;

    let p1Ships = [];
    let p2Ships = [];

    const boards = [
        document.getElementById("p1opponent"),
	    document.getElementById("p2opponent"),
    ]

    // Preload audio files
    const canonFire = new Audio('/static/sfx/canonFire.wav');
    const endGame = new Audio('/static/sfx/finalExplosionGameEnd.wav');
    const victoryCry = new Audio('/static/sfx/victoryCry.wav');
    const victoryTrumpet = new Audio('/static/sfx/victoryTrumpet.wav');

    // This will be used to play the victory theme
    // endGame.play(); // Used for the final hit, big sound
    // victoryTrumpet.play(); // the two below play at the same time.
    // victoryCry.play();

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

    // Event listener to start the attack phase
    document.getElementById("next-player-place-ship").addEventListener("click", function () {
        p2PlaceShips = true;
        // nextTurn(); 
        document.getElementById("p1-wrapper").style.display = "none";
        document.getElementById("p2-wrapper").style.display = "flex";

        document.getElementById("next-player-place-ship").style.display = "none"; // Hide controls after ship placement
        document.getElementById("start-game").style.display = "block"; // Hide controls after ship placement
        alert("Player 2 place your ships");
    });

    // Event listener to start the attack phase
    document.getElementById("start-game").addEventListener("click", function () {
        isAttackPhase = true;
        // nextTurn();
        document.getElementById("p2-wrapper").style.display = "none";
        document.getElementById("p1-wrapper").style.display = "flex";

        document.getElementById("controls").style.display = "none"; // Hide controls after ship placement
        document.getElementById("end-turn").style.display = "block"; // Show end turn button
        alert("All ships placed! Attack phase begins.");
    });

    // Event listener for swapping turns
    document.getElementById("end-turn").addEventListener("click", function () {
        turn = nextTurn(); // I added this here so we can use the turn to do functions. This can be removed if not needed.
    });

    // Event listener for placing ships
    document.getElementById("place-ship").addEventListener("click", function () {
        const shipLength = parseInt(document.getElementById("ship-length").value);
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

        placeShip(startRow, startCol, shipLength, direction);
    });

    // Check if a ship can be placed on the board
    function canPlaceShip(row, col, length, direction) {
        if (direction === "horizontal") {
            if (col + length > 10) return false;
            for (let i = 0; i < length; i++) {
                if (p2PlaceShips){
                    if (p2Ships.some(ship => ship.row === row && ship.col === col + i)) {
                        return false; // A ship is already here
                    }
                } else{
                    if (p1Ships.some(ship => ship.row === row && ship.col === col + i)) {
                        return false; // A ship is already here
                    }
                }
            }
        } else if (direction === "vertical") {
            if (row + length > 10) return false;
            for (let i = 0; i < length; i++) {
                if (p2PlaceShips){
                    if (p2Ships.some(ship => ship.row === row + i && ship.col === col)) {
                        return false; // A ship is already here
                    }
                } else{
                    if (p1Ships.some(ship => ship.row === row + i && ship.col === col)) {
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
                p2Ships.push({ row: currentRow, col: currentCol });
            } else {
                p1Ships.push({ row: currentRow, col: currentCol });
            }
        }
    }


    // Click event handler for attacking
    // const board = document.getElementById("p1self");
    boards.forEach(board => {
        board.addEventListener("click", function (event) {
            if (isAttackPhase && event.target.classList.contains("cell")) {
                const row = event.target.dataset.row;
                const col = event.target.dataset.col;
    
                canonFire.play();
                if (board == document.getElementById("p1opponent")){
                    setTimeout(() => {
                        // Check if the player hits or misses
                        if (p2Ships.some(ship => ship.row == row && ship.col == col)) {
                            event.target.classList.add("hit");
                            playRandomHitSound();
                            playHitAnimation(event.target);
                        } else {
                            event.target.classList.add("miss");
                            playRandomMissSound();
                            playMissAnimation(event.target);
                        }
                    }, 1500);  // 1.5 second delay
                } else {
                    setTimeout(() => {
                        // Check if the player hits or misses
                        if (p1Ships.some(ship => ship.row == row && ship.col == col)) {
                            event.target.classList.add("hit");
                            playRandomHitSound();
                            playHitAnimation(event.target);
                        } else {
                            event.target.classList.add("miss");
                            playRandomMissSound();
                            playMissAnimation(event.target);
                        }
                    }, 1500);  // 1.5 second delay
                }
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
