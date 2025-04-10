export class Testing {
    constructor(width, length) {
        this.width = width;
        this.length = length;
        this.testingGrid();
    }

    testingGrid() {
        // Create a container for the grid
        let gridContainer = document.createElement("div");
        gridContainer.style.display = "grid";
        gridContainer.style.gridTemplateColumns = `repeat(${this.width}, 1fr)`;
        gridContainer.style.gridTemplateRows = `repeat(${this.length}, 1fr)`;
        gridContainer.style.gap = "5px";

        // Loop through the grid dimensions
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.length; j++) {
                // Create a cell


                // Append the cell to the grid container
                gridContainer.appendChild(cell);
            }
        }

        // Append the grid container to the document
        document.getElementById("testingColumn").appendChild(gridContainer);
    }
}