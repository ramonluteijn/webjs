import { Forms } from './components/forms.js';
import { Mixhall } from './components/header/mixhall.js'
import { Weather } from './components/header/weather.js';
export class Header {
    constructor(MixhallController, WeatherController) {

        let header = document.createElement("header");
        header.setAttribute("id", "header");
        header.style.position = "relative";
        header.style.top = "0";
        header.style.left = "0";
        header.style.width = "100%";
        header.style.height = "150px";
        header.style.backgroundColor = "lightblue";
        header.innerHTML = "<h1>Future Color</h1>";
        header.style.textAlign = "center";
        let h1 = header.getElementsByTagName("h1")[0];
        h1.style.margin = "0";

        document.body.appendChild(header);

        this.createIngredientHallButton()
        new Mixhall(header, MixhallController);
        new Weather(WeatherController);
    }

    createIngredientHallButton() {
        let button = document.createElement("button");
        button.setAttribute("id", `ingredientFormButton`);
        button.innerHTML = "Ingredient Hall";
        button.style.margin = "10px";
        button.addEventListener("click", () => {
            document.getElementById('ingredientForm').style.display = "flex";
        });
        document.getElementById("header").appendChild(button);
    }
}