import { Forms } from "../forms.js";
import { Column } from "../column.js";

export class Machine {
    constructor(elementID, mixhallController) {

        Column.createColumn(elementID, "Machines");

        let form = Forms.createForm("machineForm");

        const speedDropdownContainer = document.createElement("div");
        speedDropdownContainer.className = "mb-4";
        let speedDropdown = Forms.createDropdown( ["Slow", "Medium", "Fast"])

        speedDropdownContainer.appendChild(speedDropdown);
        form.appendChild(speedDropdownContainer);

        let submitButton = Forms.createFormButton("Submit machine");
        form.appendChild(submitButton);

        submitButton.addEventListener("click", (event) => {
            event.preventDefault();
            mixhallController.createMachine(
                speedDropdown.value,
            );
        });

        document.getElementById(elementID).appendChild(form);
    }
}