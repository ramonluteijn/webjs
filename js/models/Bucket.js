export class Bucket {
    constructor() {
        this.ingredients = [];
        this.bucketId = `bucket-${Date.now()}`;
        this.bucketStyling();
    }

    bucketStyling() {
        let bucketDiv = document.createElement("div");
        bucketDiv.style.width = "150px";
        bucketDiv.style.height = "150px";
        bucketDiv.style.backgroundColor = "blue";
        bucketDiv.style.border = "1px solid red";
        bucketDiv.draggable = true;
        bucketDiv.innerHTML = `
            <p style="margin: 0;">Bucket</p>
            <div id="${this.bucketId}-ingredientDetails"></div>
            <p id="${this.bucketId}-ingredientCount" style="margin: 0;">Ingredients: 0</p>
        `;
        bucketDiv.addEventListener("dragover", (event) => {
            event.preventDefault();
        });

        bucketDiv.addEventListener("drop", (event) => {
            event.preventDefault();
            let data = JSON.parse(event.dataTransfer.getData("text/plain"));
            if (this.ingredients.length === 0 || this.ingredients[0].speed === data.speed) {
                this.ingredients.push(data);
                if (this.ingredients.length === 1) {
                    this.addIngredientToBucket(data);
                }
                this.updateIngredientCount();
                document.getElementById(data.id).remove();
            } else {
                alert("Ingredients must have the same speed to be mixed!");
            }
        });

        bucketDiv.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text/plain", JSON.stringify({
                id: this.bucketId
            }));
        });

        document.getElementById("bucketsColumn").appendChild(bucketDiv);
    }

    addIngredientToBucket(ingredient) {
        let ingredientDetails = document.getElementById(`${this.bucketId}-ingredientDetails`);
        let ingredientDiv = document.createElement("div");
        ingredientDiv.innerHTML = `
            <p style="margin: 0;">Speed: ${ingredient.speed}</p>
            <p style="margin: 0;">Time: ${ingredient.time} ms</p>
            <p style="margin: 0;">Structure: ${ingredient.structure}</p>
        `;
        ingredientDetails.appendChild(ingredientDiv);
    }

    updateIngredientCount() {
        let ingredientCount = document.getElementById(`${this.bucketId}-ingredientCount`);
        ingredientCount.innerText = `Ingredients: ${this.ingredients.length}`;
    }
}