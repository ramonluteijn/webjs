import { Forms } from "../view/components/forms.js";
import { MixedColor } from "./MixedColor.js";

export class Machine {
    constructor(speed, time, mixhallController) {
        this.speed = speed;
        this.machineId = `machine-${Date.now()}`;
        this.timeId = `${this.machineId}-time`;
        this.bucket = null;
        this.MachineStyling();
        this.mixhallController = mixhallController;
        this.isRunning = false;

        this.originalTime = null;
        this.debuffs = { };
    }

    MachineStyling() {
        this.machineDiv = document.createElement("div");
        this.machineDiv.classList.add("machine",'w-full', "h-44", "bg-blue-500", "border" ,"border-red-500", "rounded", "p-2", "relative", "text-white", "flex", "flex-row", "justify-between");
        this.machineDiv.id = this.machineId;
        this.machineDiv.style.height = "125px";
        this.machineDiv.draggable = true;

        const textDiv = document.createElement("div");
        textDiv.setAttribute("id", `${this.machineId}-text`);
        textDiv.innerHTML = `
            <p style="margin: 0;">Machine</p>
            <p id="speed">Speed: ${this.speed}</p>
            <p id="${this.timeId}">Time: No time set</p>
        `;

        const actionButton = Forms.createFormButton("Action");
        actionButton.addEventListener("click",  (event) => {
            event.preventDefault();
            if(this.bucket === null) {
                alert("No bucket assigned");
            } else{
                if(this.mixhallController.machineIsAllowedToRun()){
                    this.startPulsating();
                    this.isRunning = true;

                    // Stop pulsating after bucket.highestTime milliseconds
                    setTimeout(() => {
                        this.stopPulsating();
                        this.mixIngredientsIntoColor();
                        this.bucket = null;
                        this.isRunning = false;
                        this.originalTime = null;
                        document.getElementById(this.timeId).innerText = "Time: No time set";
                    }, this.bucket.highestTime);
                }
            }
        });

        this.machineDiv.addEventListener("dragover", (event) => {
            event.preventDefault();
        });

        this.machineDiv.addEventListener("drop", async (event) => {
            event.preventDefault();
            let data = JSON.parse(event.dataTransfer.getData("text/plain"));
            if (this.bucket === null) {
                if(data.id.includes("bucket")) {
                    this.bucket = data;
                    this.originalTime = data.highestTime;
                    document.getElementById(this.timeId).innerText = `Time: ${data.highestTime}ms`;

                    document.getElementById(data.id).remove();
                } else{
                    alert("Dropped item is not a bucket");
                }
            } else {
                alert("Bucket already exists");
            }
        });

        document.getElementById("machinesColumn").appendChild(this.machineDiv);
        this.machineDiv.appendChild(textDiv);
        this.machineDiv.appendChild(actionButton)
    }

    mixIngredientsIntoColor() {
        let totalRed = 0;
        let totalGreen = 0;
        let totalBlue = 0;

        this.bucket.ingredients.forEach(ingredient => {
            // Convert hex color to RGB
            let hex = ingredient.color.replace("#", "");
            let rgbValues = [
                parseInt(hex.substring(0, 2), 16), // Red
                parseInt(hex.substring(2, 4), 16), // Green
                parseInt(hex.substring(4, 6), 16)  // Blue
            ];

            totalRed += rgbValues[0];
            totalGreen += rgbValues[1];
            totalBlue += rgbValues[2];
        });

        let totalColors = this.bucket.ingredients.length;
        let averageRed = Math.floor(totalRed / totalColors);
        let averageGreen = Math.floor(totalGreen / totalColors);
        let averageBlue = Math.floor(totalBlue / totalColors);

        let mixedColor = `rgb(${averageRed}, ${averageGreen}, ${averageBlue})`;
        new MixedColor(mixedColor);
    }

    startPulsating() {
        this.machineDiv.classList.add("pulsate");
    }

    stopPulsating() {
        this.machineDiv.classList.remove("pulsate");
    }

    addDebuff(debuff) {
        if (!this.debuffs[debuff.reason]) {
            this.debuffs[debuff.reason] = debuff.percentage;

            if (this.bucket) {
                this.bucket.highestTime = this.originalTime * (1 + (debuff.percentage / 100));
            }
            console.log(this.debuffs);

            let timeDiv = document.getElementById(this.timeId);
            if (this.bucket) {
                timeDiv.innerText = `Time: ${this.bucket.highestTime}ms`;
            } else {
                timeDiv.innerText = "Time: No bucket assigned";
            }

        }
    }


    removeDebuff(reason) {
        //Get the percentage out of the debuffs
        let percentage = this.debuffs[reason].percentage;
        //Remove the debuff from the dictionary
        delete this.debuffs[reason];
        //Decrease the time by percentage
        if (this.bucket) {
            this.bucket.highestTime = this.originalTime * (1 - (percentage / 100));
        }
        //Update the time
        let timeDiv = document.getElementById(this.timeId);
        if (this.bucket) {
            timeDiv.innerText = `Time: ${this.bucket.highestTime}ms`;
        } else {
            timeDiv.innerText = "Time: No bucket assigned";
        }
    }
}

// Add CSS for pulsating effect
const style = document.createElement('style');
style.innerHTML = `
    .pulsate {
        animation: pulsate 1s infinite;
    }

    @keyframes pulsate {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);