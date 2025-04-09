export class Column {
    static createColumn(id, title) {
        let column = document.createElement("div");
        column.setAttribute("id", id);
        column.style.flex = "1";
        column.style.padding = "10px";
        column.style.border = "1px solid black";
        column.innerHTML = `<h2>${title}</h2>`;
        document.getElementById("main").appendChild(column);
    }
}