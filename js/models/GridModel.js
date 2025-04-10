
export class GridModel {
    constructor() {
        this.color = null;
    }

    createGridTile(){
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
    }
    setColor(color) {
        this.color = color;
    }
}