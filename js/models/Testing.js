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
                let cell = document.createElement("div");
                cell.style.width = "50px";
                cell.style.height = "50px";
                cell.style.border = "1px solid black";
                cell.style.position = "relative";

                // Add dragover event
                cell.addEventListener("dragover", (event) => {
                    event.preventDefault();
                });

                // Add drop event
                cell.addEventListener("drop", (event) => {
                    event.preventDefault();
                    let data = JSON.parse(event.dataTransfer.getData("text/plain"));
                    if (!cell.hasChildNodes()) {
                        let droppedItem = document.createElement("div");
                        droppedItem.style.width = "100%";
                        droppedItem.style.height = "100%";
                        droppedItem.style.backgroundColor = data.color;
                        droppedItem.innerHTML = `<p>${data.structure}</p>`;
                        cell.appendChild(droppedItem);
                    } else {
                        alert("Cell already occupied!");
                    }
                });

                // Append the cell to the grid container
                gridContainer.appendChild(cell);
            }
        }

        // Append the grid container to the document
        document.getElementById("testingColumn").appendChild(gridContainer);
    }
}