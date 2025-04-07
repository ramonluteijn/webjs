import { IngredientController } from "../controllers/IngredientController.js";
import { BucketController } from "../controllers/BucketController.js";
import { MachineController } from "../controllers/MachineController.js";

export class Main {
    constructor() {
        let main = document.createElement("main");
        main.setAttribute("id", "main");
        main.style.display = "flex";
        main.style.width = "100%";
        document.body.appendChild(main);

        this.createColumn("ingredientsColumn", "Ingredients");
        this.createColumn("bucketsColumn", "Buckets");
        this.createColumn("machinesColumn", "Machines");

        this.IngredientController = new IngredientController();
        this.BucketController = new BucketController();
        this.MachineController = new MachineController();
        this.addIngredientForm();
        this.addBucketForm();
        this.addMachineForm();
    }

    createColumn(id, title) {
        let column = document.createElement("div");
        column.setAttribute("id", id);
        column.style.flex = "1";
        column.style.padding = "10px";
        column.style.border = "1px solid black";
        column.innerHTML = `<h2>${title}</h2>`;
        document.getElementById("main").appendChild(column);
    }

    addIngredientForm() {
        let form = this.createForm("ingredientForm");

        let minTimeInput = document.createElement("input");
        minTimeInput.setAttribute("type", "number");
        minTimeInput.setAttribute("placeholder", "Minimale mengtijd (ms)");
        form.appendChild(minTimeInput);

        let speedInput = document.createElement("input");
        speedInput.setAttribute("type", "number");
        speedInput.setAttribute("placeholder", "Mengsnelheid");
        form.appendChild(speedInput);

        let colorInput = document.createElement("input");
        colorInput.setAttribute("type", "color");
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

        let submitButton = document.createElement("button");
        submitButton.innerHTML = "Submit ingredient";
        form.appendChild(submitButton);

        submitButton.addEventListener("click", (event) => {
            event.preventDefault();

            this.IngredientController.createIngredient(speedInput.value, minTimeInput.value, colorInput.value, structureSelect.value);
        });

        document.getElementById("ingredientsColumn").appendChild(form);
    }

    addBucketForm() {
        let form = this.createForm("bucketForm");

        let submitButton = document.createElement("button");
        submitButton.innerHTML = "Submit bucket";
        form.appendChild(submitButton);

        submitButton.addEventListener("click", (event) => {
            event.preventDefault();

            this.BucketController.createBucket();
        });

        document.getElementById("bucketsColumn").appendChild(form);
    }

    addMachineForm() {
        let form = this.createForm("machineForm");

        let minTimeInput = document.createElement("input");
        minTimeInput.setAttribute("type", "number");
        minTimeInput.setAttribute("placeholder", "Minimale mengtijd (ms)");
        form.appendChild(minTimeInput);

        let speedInput = document.createElement("input");
        speedInput.setAttribute("type", "number");
        speedInput.setAttribute("placeholder", "Mengsnelheid");
        form.appendChild(speedInput);

        let submitButton = document.createElement("button");
        submitButton.innerHTML = "Submit machine";
        form.appendChild(submitButton);

        submitButton.addEventListener("click", (event) => {
            event.preventDefault();

            this.MachineController.createMachine();
        });

        document.getElementById("machinesColumn").appendChild(form);
    }

    createForm(id) {
        let form = document.createElement("form");
        form.setAttribute("id", id);
        form.style.display = "flex";
        form.style.flexDirection = "column";
        form.style.width = "100%";
        return form;
    }
}