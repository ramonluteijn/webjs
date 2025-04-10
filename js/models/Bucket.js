export class Bucket {

    constructor() {
        this.ingredients = [];
        this.bucketId = `bucket-${Date.now()}`;
        this.bucketStyling();
        this.highestTime = 0;
    }

    bucketStyling() {
        let bucketDiv = document.createElement("div");
        bucketDiv.id = this.bucketId;
        bucketDiv.className = "w-full h-44 bg-blue-500 border border-red-500 rounded p-2";
        bucketDiv.classList.add("h-auto");
        bucketDiv.draggable = true;
        bucketDiv.innerHTML = `
            <p class="text-white">Bucket</p>
            <p class="text-white">Time: ${this.highestTime}</p>
            <p class="text-white" id="${this.bucketId}-speed">Speed: ${this.speed}</p>
            <div id="${this.bucketId}-ingredientDetails" class="flex flex-row"></div>
            <p id="${this.bucketId}-ingredientCount" class="text-white">Ingredients: 0</p>
        `;
        bucketDiv.addEventListener("dragover", (event) => {
            event.preventDefault();
        });

        bucketDiv.addEventListener("drop", (event) => {
            event.preventDefault();
            let data = JSON.parse(event.dataTransfer.getData("text/plain"));
            if(this.speed == null || data.speed === this.speed){
                this.addIngredientToBucket(data);
                document.getElementById(data.id).remove();
            }
            else {
                alert("Ingredient speed does not match bucket speed");
            }
        });

        bucketDiv.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text/plain", JSON.stringify({
                id: this.bucketId,
                highestTime: this.highestTime,
                ingredients: this.ingredients,
                speed: this.ingredients[0].speed
            }));
        });

        document.getElementById("bucketsColumn").appendChild(bucketDiv);
    }

    addIngredientToBucket(ingredientData) {
        const ingredient = {
            speed: ingredientData.speed,
            time: ingredientData.time,
            color: ingredientData.color,
            structure: ingredientData.structure
        };
        this.ingredients.push(ingredient);
        this.updateBucketTimeAndSpeed(ingredient);
        this.updateBucketSpeed(ingredient);
        this.updateIngredientCount();
        this.addIngredientShape(ingredient);
    }

    updateBucketTimeAndSpeed(ingredient) {
        if (ingredient.time > this.highestTime) {
            this.highestTime = ingredient.time;
            document.querySelector(`#${this.bucketId} p:nth-child(2)`).innerText = `Time: ${this.highestTime}`;
        }
    }

    updateBucketSpeed(ingredient) {
        this.speed = ingredient.speed;
        document.querySelector(`#${this.bucketId}-speed`).innerText = `Speed: ${this.speed}`;
    }

    addIngredientShape(ingredient) {
        let ingredientDetailsDiv = document.getElementById(`${this.bucketId}-ingredientDetails`);
        
        let ingredientContainer = document.createElement("div");
        ingredientContainer.className = "flex flex-wrap items-center m-1";

        let shapeDiv = document.createElement("div");
        shapeDiv.style.backgroundColor = ingredient.color;
        shapeDiv.className = "w-4 h-4 m-1";

        if (ingredient.structure === "Korrel") {
            shapeDiv.style.borderRadius = "50%";
        } else if (ingredient.structure === "Grove korrel") {
            shapeDiv.style.borderRadius = "25%";
        } else if (ingredient.structure === "Glad") {
            shapeDiv.style.borderRadius = "0%";
        } else if (ingredient.structure === "Slijmerig") {
            shapeDiv.style.borderRadius = "10%";
        }

        ingredientContainer.appendChild(shapeDiv);

        ingredientDetailsDiv.classList.add("flex", "flex-row", "flex-wrap", "items-center");
        ingredientDetailsDiv.appendChild(ingredientContainer);
    }

    updateIngredientCount() {
        let ingredientCount = document.getElementById(`${this.bucketId}-ingredientCount`);
        ingredientCount.innerText = `Ingredients: ${this.ingredients.length}`;
    }
}