export class MixedColor{
    constructor(color) {
        this.color = color;
        this.initializeColor();
    }

    initializeColor(){
        //Set width and height of the color in html
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
        document.getElementById("colorsColumn").appendChild(colorElement);

    }
}