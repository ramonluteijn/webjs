export class Bucket {
    highestTime = 0;
    structureCounts = { "Korrel": 0, "Grove korrel": 0, "Glad": 0, "Slijmerig": 0 };

    constructor() {
        this.ingredients = [];
        this.bucketId = `bucket-${Date.now()}`;
        this.bucketStyling();
        this.highestTime = 0;
    }

    bucketStyling() {
        let bucketDiv = document.createElement("div");
        bucketDiv.id = this.bucketId;
        bucketDiv.style.width = "175px";
        bucketDiv.style.height = "175px";
        bucketDiv.style.backgroundColor = "blue";
        bucketDiv.style.border = "1px solid red";
        bucketDiv.draggable = true;
        bucketDiv.innerHTML = `
            <p style="margin: 0;">Bucket</p>
            <p style="margin: 0;">Time: ${this.highestTime}</p>
            <div id="${this.bucketId}-ingredientDetails"></div>
            <p id="${this.bucketId}-ingredientCount" style="margin: 0;">Ingredients: 0</p>
            <div id="${this.bucketId}-structureCounts"></div>
            <div id="${this.bucketId}-ingredientColors" style="display: flex; flex-direction: row;"></div>
        `;
        bucketDiv.addEventListener("dragover", (event) => {
            event.preventDefault();
        });

        bucketDiv.addEventListener("drop", (event) => {
            event.preventDefault();
            let data = JSON.parse(event.dataTransfer.getData("text/plain"));
            console.log("Dropped data:", data);
            if (this.ingredients.length === 0 || this.ingredients[0].speed === data.speed) {
                this.ingredients.push(data);
                if (this.ingredients.length === 1) {
                    this.addIngredientToBucket(data);
                }
                if (data.time > this.highestTime) {
                    console.log(data.time);
                    this.highestTime = data.time;
                    bucketDiv.querySelector("p:nth-child(2)").innerText = `Time: ${this.highestTime}`;
                }
                this.updateIngredientCount();
                this.updateStructureCounts(data.structure);
                this.updateIngredientColors(data.color);
                document.getElementById(data.id).remove();
            } else {
                alert("Ingredients must have the same speed to be mixed!");
            }
        });

        bucketDiv.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text/plain", JSON.stringify({
                id: this.bucketId,
                highestTime: this.highestTime,
                structureCounts: this.structureCounts,
                ingredients: this.ingredients,
                speed: this.ingredients[0].speed
            }));
        });

        document.getElementById("bucketsColumn").appendChild(bucketDiv);
    }

    addIngredientToBucket(ingredient) {
        let ingredientDetails = document.getElementById(`${this.bucketId}-ingredientDetails`);
        let ingredientDiv = document.createElement("div");
        ingredientDiv.innerHTML = `
            <p style="margin: 0;">Speed: ${ingredient.speed}</p>
            <p style="margin: 0;">Structure: ${ingredient.structure}</p>
        `;
        ingredientDetails.appendChild(ingredientDiv);
    }

    updateIngredientCount() {
        let ingredientCount = document.getElementById(`${this.bucketId}-ingredientCount`);
        ingredientCount.innerText = `Ingredients: ${this.ingredients.length}`;
    }

    updateStructureCounts(structure) {
        this.structureCounts[structure]++;
        let structureCountsDiv = document.getElementById(`${this.bucketId}-structureCounts`);
        structureCountsDiv.innerHTML = `
            <p style="margin: 0;">Korrel: ${this.structureCounts["Korrel"]}</p>
            <p style="margin: 0;">Grove korrel: ${this.structureCounts["Grove korrel"]}</p>
            <p style="margin: 0;">Glad: ${this.structureCounts["Glad"]}</p>
            <p style="margin: 0;">Slijmerig: ${this.structureCounts["Slijmerig"]}</p>
        `;
    }

    updateIngredientColors(color) {
        let ingredientColorsDiv = document.getElementById(`${this.bucketId}-ingredientColors`);
        let colorDiv = document.createElement("div");
        colorDiv.style.width = "20px";
        colorDiv.style.height = "20px";
        colorDiv.style.backgroundColor = color;
        colorDiv.style.margin = "2px";
        ingredientColorsDiv.appendChild(colorDiv);
    }
}