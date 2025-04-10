export class Mixhall {
    constructor(header, mixhallController) {
        this.currentMixhallLabel = null;
        this.mixhallController = mixhallController;
        this.createMixhallButton(header, "Mixhall 1", "mixhall1");
        this.createMixhallButton(header, "Mixhall 2", "mixhall2");

        this.createCurrentMixhallLabel(header);
        this.updateCurrentMixhallLabel("mixhall1")
    }

    createMixhallButton(parent, label, mixhallName) {
        this.mixhallController.createMixhall(mixhallName);

        let button = document.createElement("button");
        button.setAttribute("id", `${mixhallName}Button`);
        button.innerHTML = label;
        button.className = "bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 m-2";
        button.addEventListener("click", () => this.loadMachines(mixhallName));
        document.getElementById("buttonDiv").appendChild(button);
        // parent.appendChild(button);
    }

    createCurrentMixhallLabel(parent) {
        this.currentMixhallLabel = document.createElement("p");
        this.currentMixhallLabel.setAttribute("id", "currentMixhallLabel");
        this.currentMixhallLabel.className = "m-2";
        this.currentMixhallLabel.innerHTML = "Current Mixhall: None";
        parent.appendChild(this.currentMixhallLabel);
    }

    updateCurrentMixhallLabel(mixhallName) {
        this.currentMixhallLabel.innerHTML = `Current Mixhall: ${mixhallName}`;
        this.mixhallController.updateCurrentMixhallName(mixhallName);
    }

    loadMachines(mixhallName) {
        document.getElementById('ingredientForm').style.display = "none";
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