import { Forms } from "../forms.js";

export class Weather {
    constructor(WeatherController) {
        let form = Forms.createForm("weatherForm");

        let postalCode = Forms.createFormField("number", "postcode numbers");
        form.appendChild(postalCode);

        let countryCode = Forms.createFormField("text", "Country code");
        form.appendChild(countryCode);

        postalCode.addEventListener("input", () => {
            if (countryCode.value) {
                WeatherController.getWeatherData(countryCode.value.toUpperCase(), postalCode.value);
            }
        });

        countryCode.addEventListener("input", () => {
            if (postalCode.value) {
                WeatherController.getWeatherData(countryCode.value.toUpperCase(), postalCode.value);
            }
        });

        document.getElementById("header").appendChild(form);
    }
}