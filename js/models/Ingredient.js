export class Ingredient {
    constructor(speed, time, color, structure) {
        this.speed = speed;
        this.time = time;
        this.color = color;
        this.structure = structure;

        this.IngredientStyling();
    }

    IngredientStyling() {
        let ingredientDiv = document.createElement("div");
        ingredientDiv.style.width = "125px";
        ingredientDiv.style.height = "125px";
        ingredientDiv.style.backgroundColor = this.color;
        ingredientDiv.style.border = "1px solid red";
        ingredientDiv.draggable = true;
        ingredientDiv.id = `ingredient-${Date.now()}`;

        this.getIngredientShape(ingredientDiv, this.structure);

        ingredientDiv.innerHTML = `
            <p>Time: ${this.time} ms</p>
            <p>Speed: ${this.speed}</p>
            <p>Structure: ${this.structure}</p>
        `;

        ingredientDiv.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text/plain", JSON.stringify({
                speed: this.speed,
                time: this.time,
                color: this.color,
                structure: this.structure,
                id: ingredientDiv.id
            }));
        });

        document.getElementById("ingredientsColumn").appendChild(ingredientDiv);
    }
    
    getIngredientShape(ingredientDiv, structure) {
        if(structure === "Korrel") {
            ingredientDiv.style.borderRadius = "50%";
        }
        else if(structure === "Grove korrel") {
            ingredientDiv.style.borderRadius = "25%";
        }
        else if(structure === "Glad") {
            ingredientDiv.style.borderRadius = "0%";
        }
        else if(structure === "Slijmerig") {
            ingredientDiv.style.borderRadius = "10%";
        }
    }
}