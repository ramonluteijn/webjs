import { Column } from "../column.js";
import { Forms } from "../forms.js";

export class Testing {
    constructor(elementID, testingController) {
        Column.createColumn(elementID, "Testing");

        let form = Forms.createForm("testingForm");
        let lengthInput = Forms.createFormField("number", "Lengte");
        form.appendChild(lengthInput);

        let widthInput = Forms.createFormField("number", "Breedte");
        form.appendChild(widthInput);

        let submitButton = Forms.createFormButton("Submit");
        form.appendChild(submitButton);

        submitButton.addEventListener("click", (event) => {
            event.preventDefault();
            testingController.createTesting(widthInput.value, lengthInput.value);
        });

        document.getElementById(elementID).appendChild(form);
    }
}