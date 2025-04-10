import { Forms } from "../forms.js";
import { Column } from '../column.js';

export class Weather {
    constructor(WeatherController) {
        this.weatherController = WeatherController;
        this.createWeatherColumn();

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

        form.className += " p-4 bg-white shadow-md rounded h-24";
        document.getElementById("weatherColumn").appendChild(form);
    }

    createWeatherColumn() {
        Column.createColumn("weatherColumn", "Weather");
        this.addWeatherInfo();
    }

    addWeatherInfo() {
        const weatherInfo = document.createElement("div");
        weatherInfo.className = "mt-2 text-gray-700";
        weatherInfo.innerHTML = `
            <p>Current Temperature: 20°C</p>
            <p>Condition: Sunny</p>
        `;
        document.getElementById("weatherColumn").appendChild(weatherInfo);
    }
}