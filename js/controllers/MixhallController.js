import { Mixhall } from '../models/Mixhall.js';
import { Machine } from "../models/Machine.js";
export class MixhallController {
    constructor() {
        this.mixhalls = [];
        this.mixhall = null;
        this.oneMachineRunning = false;
    }

    createMixhall(name) {
        const mixhall = new Mixhall(name);
        this.mixhalls.push(mixhall);
    }

    createMachine(speed, time) {
        this.mixhall.machines.createMachine(speed,time, this);
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

    lowerSpeedByPercentage(reason){
        //Lower speed for all machines in both mixhalls
        for (const mixhall of this.mixhalls) {
            for (const machine of mixhall.getMachines()) {
                machine.addDebuff(reason);
            }
        }
    }

    removeAlldebuffs(){
        //Increase speed for all machines in both mixhalls
        for (const mixhall of this.mixhalls) {
            for (const machine of mixhall.getMachines()) {
                machine.removeAllDebuffs();
            }
        }
        this.oneMachineRunning = false;
    }

    allowOnlyOneMachineRunning(){
        this.oneMachineRunning = true;
    }
    machineIsAllowedToRun(){
        if(this.oneMachineRunning) {
            for (const mixhall of this.mixhalls) {
                for (const machine of mixhall.getMachines()) {
                    if(machine.isRunning) {
                        alert ("Only one machine can run at a time, because its above 35 celsius");
                        return false;
                    }
                }
            }
        }
        return true;
    }
}