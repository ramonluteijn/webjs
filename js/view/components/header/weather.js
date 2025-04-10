import { Forms } from "../forms.js";
import { Column } from '../column.js';

export class Weather {
    constructor(WeatherController) {
        this.weatherController = WeatherController;
        this.createWeatherColumn();

        let form = Forms.createForm("weatherForm");

        let postalCode = Forms.createFormField("number", "Postcode");
        form.appendChild(postalCode);

        let countryCode = Forms.createFormField("text", "Country Code");
        form.appendChild(countryCode);

        postalCode.addEventListener("input", () => {
            if (countryCode.value) {
                this.UpdateWeatherInfo(countryCode.value.toUpperCase(), postalCode.value, WeatherController);
            }
        });

        countryCode.addEventListener("input", () => {
            if (postalCode.value) {
                this.UpdateWeatherInfo(countryCode.value.toUpperCase(), postalCode.value, WeatherController);
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
            <p id="currentTemperature">Current Temperature: Nothing Retrieved</p>
            <p id="currentCondition">Condition: Nothing Retrieved</p>
        `;
        document.getElementById("weatherColumn").appendChild(weatherInfo);
    }

    UpdateWeatherInfo(countryCode, postalCode, WeatherController) {
        // Await the asynchronous call to getWeatherData
        WeatherController.getWeatherData(countryCode, postalCode)
            .then(weatherData => {
                // Use the returned weatherData to update the UI
                if (weatherData) {
                    // Update the weather information displayed
                    document.getElementById("currentTemperature").innerText = `Current Temperature: ${weatherData.temp}°C`;
                    document.getElementById("currentCondition").innerText = `Condition: ${weatherData.weatherState}`;
                }
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
            });
    }
}