import { Column } from "../column.js";
import { Forms } from "../forms.js";

export class Testing {
    constructor(elementID, testingController) {

        Column.createColumn(elementID, "Testing", "flex flex-col").innerHTML = "";

        let form = Forms.createForm("testingForm");
        form.innerHTML = "<h2 class=\"text-lg font-bold\">Testing</h2>"
        form.classList.remove("w-full");
        form.classList.add("w-1/2");

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

        let creationDiv = document.createElement("div");
        creationDiv.id = "creationDiv";
        creationDiv.classList.add("flex", "flex-row", "gap-4");

        document.getElementById(elementID).classList.add("gap-4");

        document.getElementById(elementID).appendChild(creationDiv);
        document.getElementById(creationDiv.id).appendChild(form);
        document.getElementById(creationDiv.id).appendChild(Column.createColumn("colorsColumn", "Colors"));

        let colorsColumn = document.getElementById("colorsColumn");
        colorsColumn.classList.remove("border", "w-full");
        colorsColumn.classList.add("w-1/2","gap-2");

    }
}