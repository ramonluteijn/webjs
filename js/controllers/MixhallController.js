import { Mixhall } from '../models/Mixhall.js';
import { Machine } from "../models/Machine.js";
export class MixhallController {
    constructor() {
        this.mixhalls = [];
        this.mixhall = null;
    }

    createMixhall(name) {
        const mixhall = new Mixhall(name);
        this.mixhalls.push(mixhall);
    }

    createMachine(speed, time) {
        this.mixhall.machines.createMachine(speed,time);
    }

    getMachinesFromMixhall(mixhallName) {
        const mixhall = this.mixhalls.find(m => m.name === mixhallName);
        if (mixhall) {
            return mixhall.getMachines();
        } else {
            console.error(`Mixhall with name ${mixhallName} not found`);
            return [];
        }
    }

    updateCurrentMixhallName(mixhallName) {
        this.mixhall = this.mixhalls.find(m => m.name === mixhallName);
    }
}