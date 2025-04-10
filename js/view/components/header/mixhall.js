import { Header } from "../../Header.js";

export class Mixhall {
    constructor(header, mixhallController) {
        this.mixhallController = mixhallController;
        this.createMixhallButton(header, "Mixhall 1", "mixhall1");
        this.createMixhallButton(header, "Mixhall 2", "mixhall2");
    }

    createMixhallButton(parent, label, mixhallName) {
        this.mixhallController.createMixhall(mixhallName);

        let button = document.createElement("button");
        button.setAttribute("id", `${mixhallName}Button`);
        button.innerHTML = label;
        button.className = "bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 m-2";
        button.addEventListener("click", () => this.loadMachines(mixhallName));
        document.getElementById("buttonDiv").appendChild(button);
    }

    loadMachines(mixhallName) {
        //Show machine column
        Header.AppState(mixhallName);
        this.mixhallController.updateCurrentMixhallName(mixhallName);

        let machines = this.mixhallController.getMachinesFromMixhall(mixhallName);

        Array.from(document.getElementsByClassName("machine")).forEach(machine => {
            machine.remove();
        });

        machines.forEach((machine) => {
            machine.MachineStyling();
        })
    }
}