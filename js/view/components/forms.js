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

    static createDropdown(options) {
        let dropdown = document.createElement("select");
        dropdown.classList.add("mt-2",'border', 'border-gray-400', 'bg-white', 'rounded-md', 'w-full', 'py-2' ,'px-3', 'text-gray-700','focus:outline-none','focus:ring-2', 'focus:ring-blue-500', 'focus:border-blue-500', 'hover:border-gray-500', 'appearance-none', 'pr-8');
        options.forEach((option) => {
            let opt = document.createElement("option");
            opt.value = option;
            opt.textContent = option;
            dropdown.appendChild(opt);
        });

        return dropdown;
    }
}