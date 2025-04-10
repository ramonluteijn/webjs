export class Column {
    static createColumn(id, title) {
        let column = document.createElement("div");
        column.setAttribute("id", id);
        column.className = "flex flex-col w-1/4 p-4 border border-gray-300 rounded";
        column.innerHTML = `<h2 class="text-lg font-bold">${title}</h2>`;
        document.getElementById("main").appendChild(column);
    }
}