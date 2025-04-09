import { Forms } from "../forms.js";
import { Column } from "../column.js";
export class Bucket {
    constructor(elementID, bucketController) {
        Column.createColumn(elementID, "Buckets");

        let form = Forms.createForm("bucketForm");

        let submitButton = Forms.createFormButton("Submit bucket");
        form.appendChild(submitButton);

        submitButton.addEventListener("click", (event) => {
            event.preventDefault();

            bucketController.createBucket();
        });

        document.getElementById(elementID).appendChild(form);
    }
}