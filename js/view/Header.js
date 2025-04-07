import { MixhallController } from '../controllers/MixhallController.js';

export class Header {
    constructor(MixhallController) {
        this.mixhallController = MixhallController;
        this.currentMixhallLabel = null;

        let header = document.createElement("header");
        header.setAttribute("id", "header");
        header.style.position = "relative";
        header.style.top = "0";
        header.style.left = "0";
        header.style.width = "100%";
        header.style.height = "150px";
        header.style.backgroundColor = "lightblue";
        header.innerHTML = "<h1>Future Color</h1>";
        header.style.textAlign = "center";
        let h1 = header.getElementsByTagName("h1")[0];
        h1.style.margin = "0";

        this.createMixhallButton(header, "Mixhall 1", "mixhall1");
        this.createMixhallButton(header, "Mixhall 2", "mixhall2");

        this.createCurrentMixhallLabel(header);
        this.updateCurrentMixhallLabel("mixhall1")
        document.body.appendChild(header);

    }

    createMixhallButton(parent, label, mixhallName) {
        this.mixhallController.createMixhall(mixhallName);

        let button = document.createElement("button");
        button.setAttribute("id", `${mixhallName}Button`);
        button.innerHTML = label;
        button.style.margin = "10px";
        button.addEventListener("click", () => this.loadMachines(mixhallName));
        parent.appendChild(button);
    }

    createCurrentMixhallLabel(parent) {
        this.currentMixhallLabel = document.createElement("p");
        this.currentMixhallLabel.setAttribute("id", "currentMixhallLabel");
        this.currentMixhallLabel.style.margin = "10px";
        this.currentMixhallLabel.innerHTML = "Current Mixhall: None";
        parent.appendChild(this.currentMixhallLabel);
    }

    updateCurrentMixhallLabel(mixhallName) {
        this.currentMixhallLabel.innerHTML = `Current Mixhall: ${mixhallName}`;
        this.mixhallController.updateCurrentMixhallName(mixhallName);
    }

    loadMachines(mixhallName) {
        this.updateCurrentMixhallLabel(mixhallName);
        let machines = this.mixhallController.getMachinesFromMixhall(mixhallName);

        Array.from(document.getElementsByClassName("machine")).forEach(machine => {
            machine.remove();
        });

        machines.forEach((machine) => {
            machine.MachineStyling();
        })
    }
}