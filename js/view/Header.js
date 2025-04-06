export class Header {
    constructor() {
        let header = document.createElement("header");
        header.setAttribute("id", "header");
        header.style.position = "relative";
        header.style.top = "0";
        header.style.left = "0";
        header.style.width = "100%";
        header.style.height = "50px";
        header.style.backgroundColor = "lightblue";
        header.innerHTML = "<h1>Future Color</h1>";
        header.style.textAlign = "center";
        let h1 = header.getElementsByTagName("h1")[0]
        h1.style.margin = "0";
        document.body.appendChild(header);
    }
}