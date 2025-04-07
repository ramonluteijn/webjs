
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
        machineDiv.classList.add("machine");
        machineDiv.id = this.machineId;
        machineDiv.style.width = "125px";
        machineDiv.style.height = "125px";
        machineDiv.style.backgroundColor = "blue";
        machineDiv.style.border = "1px solid red";
        machineDiv.style.position = "relative";
        machineDiv.draggable = true;
        machineDiv.innerHTML = `
            <p style="margin: 0;">Machine</p>
            <p id="${this.machineId}-bucketCount" style="margin: 0;">${this.bucket.length}</p>
            <p>Speed: ${this.speed}</p>
            <p>Time: ${this.time} ms</p>
        `;

        machineDiv.addEventListener("dragover", (event) => {
            event.preventDefault();
        });

        machineDiv.addEventListener("drop", async (event) => {
            event.preventDefault();
            let data = JSON.parse(event.dataTransfer.getData("text/plain"));
            if (this.bucket.length === 0) {
                this.bucket.push(data);
                await this.addBucketToMachine(data);
                console.log(data.id);
                document.getElementById(data.id).remove();

            } else {
                alert("Bucket already exists");
            }
        });

        document.getElementById("machinesColumn").appendChild(machineDiv);
    }

    async addBucketToMachine(bucket) {
        let bucketDiv = document.createElement("div");
        bucketDiv.style.width = "125px";
        bucketDiv.style.height = "125px";
        bucketDiv.style.backgroundColor = bucket.color;
        bucketDiv.style.border = "1px solid red";
        bucketDiv.innerHTML = `
            <p>Speed: ${bucket.speed}</p>
            <p>Time: ${bucket.highestTime} ms</p>
            <p>Structure: ${bucket.structure}</p>
        `;
        document.getElementById(this.machineId).appendChild(bucketDiv);
        await MixCoroutine(bucket.highestTime, bucketDiv);
        this.updateBucketCount();
    }

    updateBucketCount() {
        let bucketCount = document.getElementById(`${this.machineId}-bucketCount`);
        bucketCount.innerHTML = `Buckets: ${this.bucket.length}`;
    }

}

async function MixCoroutine(waitTime, bucketDiv) {
    // Start playing animation
    let isWaiting = true;
    let currWaitTime = waitTime;
    let direction = 1; // 1 for right, -1 for left
    bucketDiv.style.border = '1px solid red';
    bucketDiv.style.position = 'absolute';
    bucketDiv.style.top = '0';
    bucketDiv.style.left = '0';

    let waitAnimationSpeed = 10;
    bucketDiv.style.transition = currWaitTime + 's';

    while (isWaiting) {
        console.log(`Waiting ${waitTime} ms`);
        currWaitTime -= waitAnimationSpeed; // Decrement by 100ms or any suitable value
        await new Promise(resolve => setTimeout(resolve, waitAnimationSpeed)); // Wait for 100ms

        // Move bucketDiv left and right
        if (direction === 1) {
            bucketDiv.style.transition = currWaitTime + 's';
            bucketDiv.style.left = '100px';
            direction = -1;
        } else {
            bucketDiv.style.transition = currWaitTime + 's';
            bucketDiv.style.left = '0px';
            direction = 1;
        }

        if (currWaitTime <= 0) {
            isWaiting = false;
        }
    }

    bucketDiv.style.left = '100px';

    if (currWaitTime <= 0) {
        bucketDiv.style.border = '1px solid green';
    }

    // Stop playing animation
    // Add to Finished ingredients list
}