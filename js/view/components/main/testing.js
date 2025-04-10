import { Column } from "../column.js";
import { Forms } from "../forms.js";

export class Testing {
    constructor(elementID, testingController) {

        Column.createColumn(elementID, "Testing", "flex flex-row"
        ).innerHTML = "";

        let form = Forms.createForm("testingForm");
        form.innerHTML = "<h2 class=\"text-lg font-bold\">Testing</h2>"
        let lengthInput = Forms.createFormField("number", "Lengte");
        form.appendChild(lengthInput);

        let widthInput = Forms.createFormField("number", "Breedte");
        form.appendChild(widthInput);

        let submitButton = Forms.createFormButton("Submit");
        form.appendChild(submitButton);

        submitButton.addEventListener("click", (event) => {
            event.preventDefault();
            testingController.createNewTesting(widthInput.value, lengthInput.value);
        });


        document.getElementById(elementID).appendChild(form);
        document.getElementById(elementID).appendChild(Column.createColumn("colorsColumn", "Colors"));

    }
}