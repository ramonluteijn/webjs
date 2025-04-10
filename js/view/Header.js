import { Mixhall } from './components/header/mixhall.js';

export class Header {
    constructor(MixhallController) {
        const header = this.createHeader();
        this.createButtonDiv(header);
        this.createIngredientHallButton();
        new Mixhall(header, MixhallController);
        this.createCurrentHallLabel(header);
        this.createTestingButton();
    }

    createHeader() {
        const header = document.createElement("header");
        header.id = "header";
        header.className = "relative w-full h-36 bg-lightblue text-center";
        header.innerHTML = "<h1 class='text-4xl font-bold m-0'>Future Color</h1>";
        document.body.appendChild(header);
        return header;
    }

    createButtonDiv(header) {
        const buttonDiv = document.createElement("div");
        buttonDiv.id = "buttonDiv";
        buttonDiv.style.width = "100%";
        header.appendChild(buttonDiv);
    }

    createIngredientHallButton() {
        this.createButton("ingredientFormButton", "Ingredient Hall", () => Header.AppState("Ingredients"));
    }

    createTestingButton() {
        this.createButton("testingButton", "Testing", () => Header.AppState("Testing"));
    }

    createButton(id, text, onClick) {
        const button = document.createElement("button");
        button.id = id;
        button.innerHTML = text;
        button.className = "bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 m-2";
        button.addEventListener("click", onClick);
        document.getElementById("buttonDiv").appendChild(button);
    }

    createCurrentHallLabel(parent) {
        const label = document.createElement("p");
        label.id = "currentHallLabel";
        label.className = "m-2";
        label.innerHTML = "Current Hall: None";
        parent.appendChild(label);
    }

    static AppState(currentState) {
        const gridContainer = document.getElementById('gridContainer');
        const displaySettings = {
            mixhall: { ingredientForm: "none", testingColumn: "none", machinesColumn: "flex", weatherColumn: "flex", bucketsColumn: "flex", ingredientsColumn: "flex", gridContainer: "none" },
            Ingredients: { ingredientForm: "flex", testingColumn: "none", machinesColumn: "none", weatherColumn: "none", bucketsColumn: "flex", ingredientsColumn: "flex", gridContainer: "none" },
            Testing: { ingredientForm: "none", testingColumn: "flex", machinesColumn: "none", weatherColumn: "none", bucketsColumn: "none", ingredientsColumn: "none", gridContainer: gridContainer ? "flex" : "none" }
        };

        const stateKey = currentState.includes("mixhall") ? "mixhall" : currentState;
        const settings = displaySettings[stateKey] || {};

        for (const [id, display] of Object.entries(settings)) {
            const element = document.getElementById(id);
            if (element) {
                element.style.display = display;
            }
        }

        document.getElementById('currentHallLabel').innerHTML = `Current hall: ${currentState}`;
    }
}