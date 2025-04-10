import { Machine } from '../models/Machine.js';
import { MixhallController } from "./MixhallController.js";

export class MachineController {
    constructor() {
        this.machines = [];
    }

    createMachine(speed, time, MixhallController) {
        const machine = new Machine(speed, time, MixhallController);
        this.machines.push(machine);
    }

    getMachines() {
        return this.machines;
    }
}