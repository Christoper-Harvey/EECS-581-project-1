document.addEventListener("DOMContentLoaded", function () {
    const colLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const rowLabels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

    let isAttackPhase = false;
    let placedShips = [];

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

    // Event listener to start the attack phase
    document.getElementById("start-game").addEventListener("click", function () {
        isAttackPhase = true;
        document.getElementById("controls").style.display = "none"; // Hide controls after ship placement
        alert("All ships placed! Attack phase begins.");
    });

    // Check if a ship can be placed on the board
    function canPlaceShip(row, col, length, direction) {
        if (direction === "horizontal") {
            if (col + length > 10) return false;
            for (let i = 0; i < length; i++) {
                if (placedShips.some(ship => ship.row === row && ship.col === col + i)) {
                    return false; // A ship is already here
                }
            }
        } else if (direction === "vertical") {
            if (row + length > 10) return false;
            for (let i = 0; i < length; i++) {
                if (placedShips.some(ship => ship.row === row + i && ship.col === col)) {
                    return false; // A ship is already here
                }
            }
        }
        return true;
    }

    // Place ship on the board
    function placeShip(row, col, length, direction) {
        for (let i = 0; i < length; i++) {
            const currentRow = direction === "horizontal" ? row : row + i;
            const currentCol = direction === "horizontal" ? col + i : col;

            const cell = document.querySelector(`.cell[data-row="${currentRow}"][data-col="${currentCol}"]`);
            cell.classList.add("placed");

            // Store the ship's position
            placedShips.push({ row: currentRow, col: currentCol });
        }
    }

    // Click event handler for attacking
    const board = document.getElementById("board");
    board.addEventListener("click", function (event) {
        if (isAttackPhase && event.target.classList.contains("cell")) {
            const row = event.target.dataset.row;
            const col = event.target.dataset.col;

            // Check if the player hits or misses
            if (placedShips.some(ship => ship.row == row && ship.col == col)) {
                event.target.classList.add("hit");
                // alert("Hit!");
            } else {
                event.target.classList.add("miss");
                // alert("Miss!");
            }
        }
    });
});
