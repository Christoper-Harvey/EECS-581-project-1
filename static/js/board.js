/**
 * NAME: Battleship - EECS581 Project 1 - board.js
 * DESCRIPTION: This program loads the board in on startup
 * INPUT: None
 * OUTPUT: changes UI to reflect changes in the game
 * SOURCES: None
 * AUTHORS: Chris Harvey
 * DATE: 9/10/24
 */
document.addEventListener("DOMContentLoaded", function () {//loading the board in
    const boards = [    //these are the 4 boards - two for each player - one for opponent's ships and one for self's ships
        document.getElementById("p1self"),
	    document.getElementById("p2self"),
        document.getElementById("p1opponent"),
        document.getElementById("p2opponent")
    ];
    const rowLabels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];//row labels
    const colLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];//column labels

    boards.forEach(board => {
        // Add column labels (top row)
        const emptyCorner = document.createElement("div"); // Top-left empty corner
        board.appendChild(emptyCorner);//this is the foundation for all boards to build onto

        //generate cols with col labels
        colLabels.forEach(label => {
            const colLabelDiv = document.createElement("div");//make new html div for new col
            colLabelDiv.classList.add("label", "col-label");//adding new class
            colLabelDiv.textContent = label;//setting new label
            board.appendChild(colLabelDiv);//adding new col to the board
        });

        //generate rows with row labels and cells
        rowLabels.forEach((rowLabel, rowIndex) => {
            const rowLabelDiv = document.createElement("div");//make new html div for new row
            rowLabelDiv.classList.add("label", "row-label");//adding new class
            rowLabelDiv.textContent = rowLabel;//setting new label
            board.appendChild(rowLabelDiv);//adding new row to board

            // Add cells for each column in this row
            colLabels.forEach((colLabel, colIndex) => {
                const cellDiv = document.createElement("div");//new html div for cell
                cellDiv.classList.add("cell");//new class for cell
                cellDiv.dataset.row = rowIndex;//assign new cell row and col index
                cellDiv.dataset.col = colIndex;
                board.appendChild(cellDiv);//add new cell to board
            });
        });
    });
});
