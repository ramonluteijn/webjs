import { Machine } from '../models/Machine.js';

export class MachineController {
    constructor() {
        this.machines = [];
    }

    createMachine(speed, time) {
        const machine = new Machine(speed, time);
        this.machines.push(machine);
    }

    getMachines() {
        return this.machines;
    }
}