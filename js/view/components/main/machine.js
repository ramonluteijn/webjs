import { Forms } from "../forms.js";
import { Column } from "../column.js";

export class Machine {
    constructor(elementID, mixhallController) {

        Column.createColumn(elementID, "Machines");

        let form = Forms.createForm("machineForm");
        let submitButton = Forms.createFormButton("Submit machine");
        form.appendChild(submitButton);

        submitButton.addEventListener("click", (event) => {
            event.preventDefault();

            mixhallController.createMachine();
        });

        document.getElementById(elementID).appendChild(form);
    }
}