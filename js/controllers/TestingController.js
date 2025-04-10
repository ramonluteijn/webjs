import {Testing} from "../models/Testing.js";

export class TestingController {
    constructor() {
        this.testing = null;
        this.colors = [];
        this.grid = [[]];
    }

    createTesting(width, length) {
        this.testing = new Testing(width, length, this.colors);
    }
}