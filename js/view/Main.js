import { IngredientController } from "../controllers/IngredientController.js";
import { BucketController } from "../controllers/BucketController.js";
import { MachineController } from "../controllers/MachineController.js";
import { WeatherController } from "../controllers/WeatherController.js";
import {MixhallController} from "../controllers/MixhallController.js";
import { Weather } from "../apis/Weather.js";

export class Main {
    constructor(MixhallController) {
        this.mixhallController = MixhallController;
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
        this.WeatherController = new WeatherController();
        this.addIngredientForm();
        this.addBucketForm();
        this.addMachineForm();

        this.addWeatherForm();
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

        let minTimeInput = this.createFormField("number", "Minimale mengtijd (ms)");
        form.appendChild(minTimeInput);

        let speedInput = this.createFormField("number", "Mengsnelheid");
        form.appendChild(speedInput);

        let colorInput = this.createFormField("color", "Kleur");
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

        let submitButton = this.createFormButton("Submit ingredient");
        form.appendChild(submitButton);

        submitButton.addEventListener("click", (event) => {
            event.preventDefault();
            this.IngredientController.createIngredient(speedInput.value, minTimeInput.value, colorInput.value, structureSelect.value);
        });

        document.getElementById("ingredientsColumn").appendChild(form);
    }

    addBucketForm() {
        let form = this.createForm("bucketForm");

        let submitButton = this.createFormButton("Submit bucket");
        form.appendChild(submitButton);

        submitButton.addEventListener("click", (event) => {
            event.preventDefault();

            this.BucketController.createBucket();
        });

        document.getElementById("bucketsColumn").appendChild(form);
    }

    addMachineForm() {
        let form = this.createForm("machineForm");
        let submitButton = this.createFormButton("Submit machine");
        form.appendChild(submitButton);

        submitButton.addEventListener("click", (event) => {
            event.preventDefault();

            this.mixhallController.createMachine();
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

    createFormField(type, placeholder) {
        let input = document.createElement("input");
        input.setAttribute("type", type);
        input.setAttribute("placeholder", placeholder);
        return input;
    }

    createFormButton(label) {
        let submitButton = document.createElement("button");
        submitButton.innerHTML = label;
        return submitButton;
    }

    addWeatherForm() {

        let form = this.createForm("weatherForm");

        let postalCode = this.createFormField("number", "postcode numbers");
        form.appendChild(postalCode);

        let countryCode = this.createFormField("text", "Country code");
        form.appendChild(countryCode);

        let submitButton = this.createFormButton("Submit location");
        form.appendChild(submitButton);

        submitButton.addEventListener("click", (event) => {
            event.preventDefault();
            this.WeatherController.getWeatherData(countryCode.value, postalCode.value)
        });

        document.getElementById("bucketsColumn").appendChild(form);
    }
}