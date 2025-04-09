export class Forms {
    static createForm(id) {
        let form = document.createElement("form");
        form.setAttribute("id", id);
        form.style.display = "flex";
        form.style.flexDirection = "column";
        form.style.width = "100%";
        return form;
    }

    static createFormField(type, placeholder) {
        let input = document.createElement("input");
        input.setAttribute("type", type);
        input.setAttribute("placeholder", placeholder);
        return input;
    }

    static createFormButton(label) {
        let submitButton = document.createElement("button");
        submitButton.innerHTML = label;
        return submitButton;
    }
}