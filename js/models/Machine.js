export class Machine {
    constructor(speed, time) {
        this.speed = speed;
        this.time = time;
        this.machineId = `machine-${Date.now()}`;
        this.bucket = [];

        this.MachineStyling();
    }

    MachineStyling() {
        let machineDiv = document.createElement("div");
        machineDiv.classList.add(`machine`);
        machineDiv.style.width = "125px";
        machineDiv.style.height = "125px";
        machineDiv.style.backgroundColor = "blue";
        machineDiv.style.border = "1px solid red";
        machineDiv.draggable = true;
        machineDiv.innerHTML = `
            <p style="margin: 0;">Machine</p>
            <p id="${this.machineId}-bucketCount" style="margin: 0;">Buckets: 0</p>
            <p>Speed: ${this.speed}</p>
            <p>Time: ${this.time} ms</p>
        `;

        machineDiv.addEventListener("dragover", (event) => {
            event.preventDefault();
        });

        machineDiv.addEventListener("drop", (event) => {
            event.preventDefault();
            let data = JSON.parse(event.dataTransfer.getData("text/plain"));
            if (this.bucket.length === 0 && this.bucket[0].ingredients.length !== 0) {
                this.bucket.push(data);
                this.addBucketToMachine(data);
                this.updateBucketCount();
                document.getElementById(data.id).remove();
            } else {
                alert("Bucket already exists");
            }
        });

        document.getElementById("machinesColumn").appendChild(machineDiv);
    }

    addBucketToMachine(bucket) {
        let bucketDiv = document.createElement("div");
        bucketDiv.style.width = "125px";
        bucketDiv.style.height = "125px";
        bucketDiv.style.backgroundColor = bucket.color;
        bucketDiv.style.border = "1px solid red";
        bucketDiv.innerHTML = `
            <p>Speed: ${bucket.speed}</p>
            <p>Time: ${bucket.time} ms</p>
            <p>Structure: ${bucket.structure}</p>
        `;
        document.getElementById("main").appendChild(bucketDiv);
    }

    updateBucketCount() {
        let bucketCount = document.getElementById(`${this.machineId}-bucketCount`);
        bucketCount.innerHTML = `Buckets: ${this.bucket.length}`;
    }
}