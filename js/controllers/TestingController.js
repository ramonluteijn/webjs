import {Testing} from "../models/Testing.js";
import { GridModel } from '../models/GridModel.js';

export class TestingController {
    constructor() {
        this.testing = new Testing();
        this.colors = [];
        this.grid = [[]];
    }

    createNewTesting(width, length) {
        this.grid = Array.from({ length }, () => Array.from({ length: width }, () => new GridModel()));
        this.testing.loadGrid(this.grid);
    }

    loadGrid(){
        this.testing.loadGrid(this.grid);
    }
}