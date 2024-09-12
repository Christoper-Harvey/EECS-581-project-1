document.addEventListener("DOMContentLoaded", function () {
    const boards = [
        document.getElementById("p1self"),
	    document.getElementById("p2self"),
        document.getElementById("p1opponent"),
        document.getElementById("p2opponent")
    ];
    const rowLabels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const colLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

    boards.forEach(board => {
        // Add column labels (top row)
        const emptyCorner = document.createElement("div"); // Top-left empty corner
        board.appendChild(emptyCorner);

        colLabels.forEach(label => {
            const colLabelDiv = document.createElement("div");
            colLabelDiv.classList.add("label", "col-label");
            colLabelDiv.textContent = label;
            board.appendChild(colLabelDiv);
        });

        // Generate rows with row labels and cells
        rowLabels.forEach((rowLabel, rowIndex) => {
            // Add row label
            const rowLabelDiv = document.createElement("div");
            rowLabelDiv.classList.add("label", "row-label");
            rowLabelDiv.textContent = rowLabel;
            board.appendChild(rowLabelDiv);

            // Add cells for each column in this row
            colLabels.forEach((colLabel, colIndex) => {
                const cellDiv = document.createElement("div");
                cellDiv.classList.add("cell");
                cellDiv.dataset.row = rowIndex;
                cellDiv.dataset.col = colIndex;
                board.appendChild(cellDiv);
            });
        });
    });
});
