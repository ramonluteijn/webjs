import { IngredientController } from "../controllers/IngredientController.js";
import { Machine } from "./components/main/machine.js";
import { Bucket } from "./components/main/bucket.js";
import { Ingredient } from "./components/main/ingredient.js";
import { Weather } from "./components/header/weather.js";
import { Testing } from "./components/main/testing.js";
import { TestingController } from "../controllers/TestingController.js";

export class Main {
    constructor(MixhallController, bucketController, weatherController) {
        this.createMainElement();
        this.initializeComponents(MixhallController, bucketController, weatherController);
    }

    createMainElement() {
        const main = document.createElement("main");
        main.id = "main";
        main.className = "flex flex-row w-full p-4 mt-4";
        document.body.appendChild(main);
    }

    initializeComponents(MixhallController, bucketController, weatherController) {
        this.IngredientController = new IngredientController();
        this.testingController = new TestingController();

        new Weather(weatherController, MixhallController);
        new Ingredient("ingredientsColumn", this.IngredientController);
        new Bucket("bucketsColumn", bucketController);
        new Machine("machinesColumn", MixhallController);
        new Testing("testingColumn", this.testingController);
    }
}