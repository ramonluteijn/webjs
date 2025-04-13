import { Forms } from "../forms.js";
import { Column } from "../column.js";

export class Ingredient {
    constructor(elementID, ingredientController) {
        Column.createColumn(elementID, "Ingredients");
        this.ingredientController = ingredientController;
        this.createIngredientForm(elementID);
    }

    createIngredientForm(elementID) {
        const form = Forms.createForm("ingredientForm");

        // Label and input for minimum time
        const minTimeLabel = document.createElement("label");
        minTimeLabel.textContent = "Minimale mengtijd (ms)";
        form.appendChild(minTimeLabel);
        const minTimeInput = Forms.createFormField("number", "Minimale mengtijd (ms)");
        minTimeInput.setAttribute("value", "1");
        form.appendChild(minTimeInput);

        // Label and input for speed dropdown
        const speedLabel = document.createElement("label");
        speedLabel.textContent = "Select Speed";
        form.appendChild(speedLabel);

        const speedDropdownContainer = document.createElement("div");
        speedDropdownContainer.className = "mb-4";
        let speedDropdown = Forms.createDropdown( ["Slow", "Medium", "Fast"])

        speedDropdownContainer.appendChild(speedDropdown);
        form.appendChild(speedDropdownContainer);

        // Label and input for structure dropdown
        const structureLabel = document.createElement("label");
        structureLabel.textContent = "Select Structure";
        form.appendChild(structureLabel);

        let structureSelect = Forms.createDropdown( ["Korrel", "Grove korrel", "Glad", "Slijmerig"])
        form.appendChild(structureSelect);

        // Label and input for color
        const colorLabel = document.createElement("label");
        colorLabel.textContent = "Select Color";
        form.appendChild(colorLabel);
        const colorInput = Forms.createFormField("color", "Kleur");
        form.appendChild(colorInput);

        const submitButton = Forms.createFormButton("Submit ingredient");
        form.appendChild(submitButton);

        submitButton.addEventListener("click", (event) => {
            event.preventDefault();
            this.ingredientController.createIngredient(
                speedDropdown.value,
                minTimeInput.value,
                colorInput.value,
                structureSelect.value);
        });

        document.getElementById(elementID).appendChild(form);
    }
}