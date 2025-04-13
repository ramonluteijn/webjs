export class MixedColor{
    constructor(color) {
        this.color = color;
        this.initializeColor();
    }

    // initialize the color element
    initializeColor(){
        let colorElement = document.createElement("div");
        colorElement.style.width = "50px";
        colorElement.style.height = "50px";
        colorElement.style.backgroundColor = this.color;
        colorElement.style.border = "1px solid black";
        colorElement.style.position = "relative";
        colorElement.draggable = true;
        colorElement.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text/plain", JSON.stringify({
                color: this.color
            }));
        });

        let colorOptionDiv = document.createElement("div");
        colorOptionDiv.style.width = "100%";
        colorOptionDiv.id = "colorOptionDiv";
        colorOptionDiv.classList.add("flex", "flex-row", "gap-2", "flex-wrap");

        document.getElementById("colorsColumn").appendChild(colorOptionDiv);
        document.getElementById(colorOptionDiv.id).appendChild(colorElement);

    }
}