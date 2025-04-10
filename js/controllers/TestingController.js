import {Testing} from "../models/Testing.js";

export class TestingController {
    constructor() {
        this.testing = null;
    }

    createTesting(width, length) {
        this.testing = new Testing(width, length);
    }
}