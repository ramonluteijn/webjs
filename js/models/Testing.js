export class Testing {
    constructor() {

    }

    loadGrid(gridArray){
        //Set width and length based off of the gridArray
        this.width = gridArray[0].length;
        this.length = gridArray.length;
        //gridArray is a 2d array so [[]]
        let gridContainer = document.createElement("div");
        gridContainer.style.display = "grid";
        gridContainer.style.gridTemplateColumns = `repeat(${this.width}, 1fr)`;
        gridContainer.style.gridTemplateRows = `repeat(${this.length}, 1fr)`;
        gridContainer.style.gap = "5px";
        gridContainer.style.overflowX = "hidden";

        // Loop through the gridArray to create tiles
        for (let i = 0; i < this.length; i++) {
            for (let j = 0; j < this.width; j++) {
                let cell = gridArray[i][j].createGridTile();
                gridContainer.appendChild(cell);
            }
        }
 
        // Check if the gridContainer column already exists
        let existingGridColumn = document.getElementById("gridContainer");
        if (!existingGridColumn) {
            // Create a new column for the grid if it doesn't exist
            existingGridColumn = document.createElement("div");
            existingGridColumn.setAttribute("id", "gridContainer");
            existingGridColumn.className = "flex flex-col w-full p-4 border border-gray-300 rounded";
            existingGridColumn.innerHTML = "<h2 class='text-lg font-bold'>Grid</h2>";
            document.getElementById("testingColumn").appendChild(existingGridColumn);
        } else {
            // Clear existing grid tiles in the gridContainer if it already exists
            existingGridColumn.innerHTML = "<h2 class='text-lg font-bold'>Grid</h2>";
        }
        existingGridColumn.appendChild(gridContainer);
    }
}