import { Header } from './view/Header.js';
import { Main } from './view/Main.js';


// document.addEventListener('DOMContentLoaded', function() {
//     addButton();
//     deleteButton();
// });
//
// function addButton() {
//     let button = document.createElement("button");
//     button.setAttribute("id", "addBucketButton");
//     button.innerHTML = "Add bucket";
//     button.onclick = function() {
//         addBucket();
//     }
//     document.body.appendChild(button);
// }
//
// function deleteButton() {
//     let button = document.createElement("button");
//     button.setAttribute("id", "deleteBucketButton");
//     button.innerHTML = "Delete bucket";
//     button.onclick = function() {
//         deleteBucket();
//     }
//     document.body.appendChild(button);
// }
//
//
// function addBucket() {
//     let div = document.getElementById("mainDiv");
//     let bucket = document.createElement("div");
//     bucket.setAttribute("class", "bucket");
//     bucket.style.backgroundColor = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";
//     bucket.style.width = "100px";
//     bucket.style.height = "100px";
//     div.appendChild(bucket);
// }
//
// function deleteBucket() {
//     let div = document.getElementById("mainDiv");
//     let bucket = document.getElementsByClassName("bucket");
//     for (let i = 0; i < bucket.length; i++) {
//         bucket[i].addEventListener("click", function() {
//             div.removeChild(bucket[i]);
//         });
//     }
// }

document.addEventListener('DOMContentLoaded', function() {
    renderDefaultLayout();
});

function renderDefaultLayout() {
    let body = document.body;
    body.style.margin = "0";
    body.style.padding = "0";
    body.style.color = "red";

    let header = new Header();
    let main = new Main();
}