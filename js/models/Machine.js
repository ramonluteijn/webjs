import { Forms } from "../view/components/forms.js";

export class Machine {
    constructor(speed, time) {
        this.speed = speed;
        this.time = time;
        this.machineId = `machine-${Date.now()}`;
        this.bucket = null;
        this.machineDiv = null;
        this.timeId = `${this.machineId}-time`;
        this.MachineStyling();
    }

    MachineStyling() {
        this.machineDiv = document.createElement("div");
        this.machineDiv.classList.add("machine",'w-full', "h-44", "bg-blue-500", "border" ,"border-red-500", "rounded", "p-2", "relative", "text-white", "flex", "flex-row", "justify-between");
        this.machineDiv.id = this.machineId;
        this.machineDiv.style.height = "125px";
        this.machineDiv.draggable = true;

        let textDiv = document.createElement("div");
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
                this.startPulsating();
                // Stop pulsating after bucket.highestTime milliseconds
                setTimeout(() => {
                    this.stopPulsating();
                    this.bucket = null;
                    document.getElementById(this.timeId).innerText = "Time: No time set";
                    this.mixIngredientsIntoColor();
                }, this.bucket.highestTime);
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

        this.bucket.ingredients.forEach(ingredients => {
            let rgbValues = ingredients.color.match(/\d+/g).map(Number);
            totalRed += rgbValues[0];
            totalGreen += rgbValues[1];
            totalBlue += rgbValues[2];
        });

        let totalColors = colors.length;
        let averageRed = Math.floor(totalRed / totalColors);
        let averageGreen = Math.floor(totalGreen / totalColors);
        let averageBlue = Math.floor(totalBlue / totalColors);

        let mixedColor = `rgb(${averageRed}, ${averageGreen}, ${averageBlue})`;
        //Add mixedcolor to testcontroller
    }

    startPulsating() {
        this.machineDiv.classList.add("pulsate");
    }

    stopPulsating() {
        this.machineDiv.classList.remove("pulsate");
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