import { MachineController } from '../controllers/MachineController.js';

export class Mixhall {
    constructor(name) {
        this.name = name;
        this.machines = new MachineController();
    }
    getMachines() {
        return this.machines.getMachines();
    }
}