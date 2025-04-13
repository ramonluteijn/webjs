export class Ingredient {
    constructor(speed, time, color, structure) {
        this.speed = speed;
        this.time = time;
        this.color = color;
        this.structure = structure;

        this.IngredientStyling();
    }

    // initialize the ingredient with styling and event listeners
    IngredientStyling() {
        let ingredientDiv = document.createElement("div");
        ingredientDiv.className = "flex items-center w-full p-2 border border-gray-300 rounded mb-2";
        ingredientDiv.draggable = true;
        ingredientDiv.id = `ingredient-${Date.now()}`;

        let shapeDiv = document.createElement("div");
        shapeDiv.style.backgroundColor = this.color;
        shapeDiv.className = "w-16 h-16 rounded-l";
        this.getIngredientShape(shapeDiv, this.structure);
        ingredientDiv.appendChild(shapeDiv);

        let infoDiv = document.createElement("div");
        infoDiv.className = "flex flex-col justify-center pl-4";
        infoDiv.innerHTML = `
            <p class="text-sm">Time: ${this.time} ms</p>
            <p class="text-sm">Speed: ${this.speed}</p>
            <p class="text-sm">Structure: ${this.structure}</p>
        `;
        ingredientDiv.appendChild(infoDiv);

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

    // get the shape of the ingredient based on its structure
    getIngredientShape(shapeDiv, structure) {
        if (structure === "Korrel") {
            shapeDiv.style.borderRadius = "50%";
        } else if (structure === "Grove korrel") {
            shapeDiv.style.borderRadius = "25%";
        } else if (structure === "Glad") {
            shapeDiv.style.borderRadius = "0%";
        } else if (structure === "Slijmerig") {
            shapeDiv.style.borderRadius = "10%";
        }
    }
}