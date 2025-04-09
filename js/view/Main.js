import { IngredientController } from "../controllers/IngredientController.js";
import { Machine } from "./components/main/machine.js";
import { Bucket } from "./components/main/bucket.js";
import { Ingredient } from "./components/main/ingredient.js";
export class Main {
    constructor(MixhallController, bucketController) {
        let main = document.createElement("main");
        main.setAttribute("id", "main");
        main.style.display = "flex";
        main.style.width = "100%";
        document.body.appendChild(main);

        this.IngredientController = new IngredientController();
        new Ingredient("ingredientsColumn", this.IngredientController);
        new Bucket("bucketsColumn", bucketController);
        new Machine("machinesColumn", MixhallController);
    }
}