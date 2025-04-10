export class Forms {
    static createForm(id) {
        let form = document.createElement("form");
        form.setAttribute("id", id);
        form.className = "flex flex-col w-full";
        return form;
    }

    static createFormField(type, placeholder) {
        let input = document.createElement("input");
        input.setAttribute("type", type);
        input.setAttribute("placeholder", placeholder);
        input.className = "border border-gray-300 p-2 rounded mb-4";
        return input;
    }

    static createFormButton(label) {
        let submitButton = document.createElement("button");
        submitButton.innerHTML = label;
        submitButton.className = "bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700";
        return submitButton;
    }
}