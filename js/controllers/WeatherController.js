import { Weather } from "../apis/Weather.js";

export class WeatherController {
    static WeatherControllerInstance = null;

    constructor(mixhallController) {
        this.weather = new Weather();
        this.mixhallController = mixhallController;
        this.resetWeatherFlags();
        WeatherController.WeatherControllerInstance = this;
    }

    resetWeatherFlags() {
        this.isRainingOrSnowing = false;
        this.isBelow10Celsius = false;
        this.isAbove35Celsius = false;
    }

    UpdateAllMachines(weatherData) {
        const reasons = {
            snowRain: { reason: "It is raining/Snowing", percentage: 10 },
            below10C: { reason: "It is below 10 celsius", percentage: 15 }
        };

        if (weatherData) {
            this.handleWeatherState(weatherData, reasons);
            this.handleTemperature(weatherData, reasons);
        } else {
            this.resetWeatherFlags();
            this.restoreMachineState(reasons);
        }
    }

    handleWeatherState(weatherData, reasons) {
        if (["Rainy", "Snowy"].includes(weatherData.weatherState)) {
            if (!this.isRainingOrSnowing) {
                this.isRainingOrSnowing = true;
                this.addReasonToScreen(reasons.snowRain);
                this.mixhallController.lowerSpeedByPercentage(reasons.snowRain);
            }
        } else if (this.isRainingOrSnowing) {
            this.isRainingOrSnowing = false;
            this.removeReasonFromScreen(reasons.snowRain);
            this.mixhallController.increaseSpeedByPercentage(reasons.snowRain.reason);
        }
    }

    handleTemperature(weatherData, reasons) {
        if (weatherData.temp < 10) {
            if (!this.isBelow10Celsius) {
                this.isBelow10Celsius = true;
                this.addReasonToScreen(reasons.below10C);
                this.mixhallController.lowerSpeedByPercentage(reasons.below10C);
            }
        } else if (this.isBelow10Celsius) {
            this.isBelow10Celsius = false;
            this.removeReasonFromScreen(reasons.below10C);
            this.mixhallController.increaseSpeedByPercentage(reasons.below10C.reason);
        }

        if (weatherData.temp > 35) {
            this.isAbove35Celsius = true;
            this.mixhallController.allowOnlyOneMachineRunning();
        } else if (this.isAbove35Celsius) {
            this.isAbove35Celsius = false;
            this.mixhallController.allowOnlyOneMachineRunning();
        }
    }

    restoreMachineState(reasons) {
        this.removeReasonFromScreen(reasons.snowRain);
        this.removeReasonFromScreen(reasons.below10C);
        this.mixhallController.increaseSpeedByPercentage(reasons.snowRain.reason);
        this.mixhallController.increaseSpeedByPercentage(reasons.below10C.reason);
    }

    addReasonToScreen(reason) {
        if (document.getElementById(reason.reason + reason.percentage)) return;

        const debuff = document.createElement("div");
        debuff.id = reason.reason + reason.percentage;

        debuff.appendChild(this.createDiv(reason.reason));
        debuff.appendChild(this.createDiv(`${reason.percentage}%`));

        document.getElementById("debuffColumn").appendChild(debuff);
    }

    createDiv(content) {
        const div = document.createElement("div");
        div.innerHTML = content;
        div.className = "bg-green-500 text-white font-bold py-2 px-4 rounded m-2";
        return div;
    }

    removeReasonFromScreen(reason) {
        const debuff = document.getElementById(reason.reason + reason.percentage);
        if (debuff) debuff.remove();
    }

    async getWeatherData(countryCode, zip) {
        try {
            const data = await this.weather.getWeatherData(countryCode, zip);
            const temp = data.data[0].coordinates[0].dates[0].value;
            const weatherCode = data.data[1].coordinates[0].dates[0].value;

            return {
                temp,
                weatherState: this.getWeatherState(weatherCode)
            };
        } catch {
            return null;
        }
    }

    getWeatherState(code) {
        if (code > 20) {
            return code === 21 ? "Rainy" : code === 22 ? "Snowy" : "Bad Weather";
        }
        return "Normal Weather";
    }
}