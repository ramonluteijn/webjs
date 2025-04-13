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

        let formButton = Forms.createFormButton("Submit");
        formButton.addEventListener("click", (event) => {
            event.preventDefault();
            this.UpdateWeatherInfo(countryCode.value.toUpperCase(), postalCode.value, WeatherController);
        })
        form.appendChild(formButton);

        form.className += " p-4 bg-white shadow-md rounded h-auto";
        document.getElementById("weatherInfo").appendChild(form);
    }

    createWeatherColumn() {
        Column.createColumn("weatherColumn", "Weather").innerHTML="";
        this.addWeatherInfo();
        document.getElementById("weatherColumn").appendChild(Column.createColumn("debuffColumn", "Debuffs"));
        document.getElementById("debuffColumn").classList.remove("p-4", "border", "border-gray-300", "rounded")
        document.getElementById("debuffColumn").classList.add("mt-4", "p-2");
    }

    addWeatherInfo() {
        const weatherInfo = document.createElement("div");
        weatherInfo.setAttribute("id", "weatherInfo");
        weatherInfo.className = "mt-2 text-gray-700";
        weatherInfo.innerHTML = `
            <h2 class="text-lg font-bold">Weather</h2>
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
                    document.getElementById("currentTemperature").innerText = `Current Temperature: ${weatherData.temp}°C`;
                    document.getElementById("currentCondition").innerText = `Condition: ${weatherData.weatherState}`;
                }
                WeatherController.UpdateAllMachines(weatherData);
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
            });
    }
}