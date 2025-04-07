import { MachineController } from '../controllers/MachineController.js';
export class Mixhall {
    constructor(name) {
        this.name = name;
        this.machines = new MachineController();
    }

    addMachine(speed, time) {
        this.machines.createMachine(speed,time);
    }

    getMachineController(){
        return this.machines;
    }
    
    getMachines() {
        return this.machines.getMachines();
    }
}