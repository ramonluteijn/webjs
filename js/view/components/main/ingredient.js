import { Forms } from "../forms.js";
import { Column } from "../column.js";

export class Ingredient {
    constructor(elementID, ingredientController) {
        Column.createColumn(elementID, "Ingredients");

        let form = Forms.createForm("ingredientForm");

        let minTimeInput = Forms.createFormField("number", "Minimale mengtijd (ms)");
        form.appendChild(minTimeInput);

        let speedInput = Forms.createFormField("number", "Mengsnelheid");
        form.appendChild(speedInput);

        let colorInput = Forms.createFormField("color", "Kleur");
        form.appendChild(colorInput);

        let structureSelect = document.createElement("select");
        let structures = ["Korrel", "Grove korrel", "Glad", "Slijmerig"];
        structures.forEach(structure => {
            let option = document.createElement("option");
            option.value = structure;
            option.text = structure;
            structureSelect.appendChild(option);
        });
        form.appendChild(structureSelect);

        let submitButton = Forms.createFormButton("Submit ingredient");
        form.appendChild(submitButton);

        submitButton.addEventListener("click", (event) => {
            event.preventDefault();
            ingredientController.createIngredient(speedInput.value, minTimeInput.value, colorInput.value, structureSelect.value);
        });

        document.getElementById(elementID).appendChild(form);
    }
}