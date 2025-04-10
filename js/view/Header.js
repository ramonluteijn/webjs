import { Mixhall } from './components/header/mixhall.js'

export class Header {
    constructor(MixhallController) {
        let header = document.createElement("header");
        header.setAttribute("id", "header");
        header.className = "relative w-full h-36 bg-lightblue text-center";
        header.innerHTML = "<h1 class='text-4xl font-bold'>Future Color</h1>";
        let h1 = header.getElementsByTagName("h1")[0];
        h1.className = "m-0";

        document.body.appendChild(header);

        document.body.appendChild(header);
        let buttonDiv = document.createElement("div");
        buttonDiv.setAttribute("id", "buttonDiv");
        buttonDiv.style.width = "100%";
        header.appendChild(buttonDiv);
        this.createTestingButton();
        this.createIngredientHallButton();
        new Mixhall(header, MixhallController);
    }

    createIngredientHallButton() {
        let button = document.createElement("button");
        button.setAttribute("id", `ingredientFormButton`);
        button.innerHTML = "Ingredient Hall";
        button.className = "bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 m-2";
        button.addEventListener("click", () => {
            document.getElementById('ingredientForm').style.display = "flex";
        });
        document.getElementById("buttonDiv").appendChild(button);
    }

    createTestingButton() {
        let button = document.createElement("button");
        button.setAttribute("id", `testingButton`);
        button.innerHTML = 'Testing';
        button.style.margin = "10px";
        button.addEventListener("click", () => {
            document.getElementById('currentHallLabel').innerHTML = "Current hall: Testing";
        });

        document.getElementById("buttonDiv").appendChild(button);
    }
}