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

        const minTimeInput = Forms.createFormField("number", "Minimale mengtijd (ms)");
        form.appendChild(minTimeInput);

        const speedDropdownContainer = document.createElement("div");
        speedDropdownContainer.className = "mb-4";

        const speedDropdown = document.createElement("select");
        speedDropdown.classList.add("mt-2",'border', 'border-gray-400', 'bg-white', 'rounded-md', 'w-full', 'py-2' ,'px-3', 'text-gray-700','focus:outline-none','focus:ring-2', 'focus:ring-blue-500', 'focus:border-blue-500', 'hover:border-gray-500', 'appearance-none', 'pr-8');
        const speeds = ["Slow", "Medium", "Fast"];
        speeds.forEach((speed) => {
            const option = document.createElement("option");
            option.value = speed;
            option.textContent = speed;
            speedDropdown.appendChild(option);
        });
        speedDropdownContainer.appendChild(speedDropdown);
        form.appendChild(speedDropdownContainer);



        const structureSelect = document.createElement("select");
        structureSelect.className = "p-2 mb-4";
        const structures = ["Korrel", "Grove korrel", "Glad", "Slijmerig"];
        structureSelect.classList.add("mt-2",'border', 'border-gray-400', 'bg-white', 'rounded-md', 'w-full', 'py-2' ,'px-3', 'text-gray-700','focus:outline-none','focus:ring-2', 'focus:ring-blue-500', 'focus:border-blue-500', 'hover:border-gray-500', 'appearance-none', 'pr-8');
        structures.forEach(structure => {
            const option = document.createElement("option");
            option.value = structure;
            option.text = structure;
            structureSelect.appendChild(option);
        });
        form.appendChild(structureSelect);

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