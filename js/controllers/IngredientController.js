import { Ingredient } from "../models/Ingredient.js";

export class IngredientController {
    constructor() {
        this.ingredients = [];
    }

    createIngredient(speed, time, color, structure) {
        const ingredient = new Ingredient(speed, time, color, structure);
        this.ingredients.push(ingredient);
    }
}