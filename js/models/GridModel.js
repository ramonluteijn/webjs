import { ColorUtils } from "../Utils/ColorUtils.js";

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


        // add event listener to show color popup
        cell.addEventListener("click", () => {
            const rgbValues = this.color.match(/\d+/g).map(Number);
            this.showColorPopup(rgbValues);
        });

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
                this.color = data.color;
                droppedItem.style.backgroundColor = data.color;
                cell.appendChild(droppedItem);
            } else {
                alert("Cell already occupied!");
            }
        });

        if(this.color){
            let droppedItem = document.createElement("div");
            droppedItem.style.width = "100%";
            droppedItem.style.height = "100%";
            droppedItem.style.backgroundColor = this.color;
        }

        return cell;
    }

    showColorPopup(baseColor) {
        const triadicColors = ColorUtils.getTriadicColors(baseColor);
        const popupContent = `
        <div>
            <h3>Triadic Kleuren</h3>
            <div style="background-color: rgb(${triadicColors[0].join(',')}); width: 100px; height: 100px;"></div>
            <p>RGB: ${triadicColors[0].join(', ')}</p>
            <div style="background-color: rgb(${triadicColors[1].join(',')}); width: 100px; height: 100px;"></div>
            <p>RGB: ${triadicColors[1].join(', ')}</p>
        </div>
    `;

        // create popup element
        const popup = document.createElement('div');
        popup.innerHTML = popupContent;
        popup.style.position = 'absolute';
        popup.style.backgroundColor = 'white';
        popup.style.border = '1px solid black';
        popup.style.padding = '10px';
        popup.style.zIndex = '1000';

        document.body.appendChild(popup);

        // close popup after 5 seconds
        setTimeout(() => {
            document.body.removeChild(popup);
        }, 5000);
    }
}