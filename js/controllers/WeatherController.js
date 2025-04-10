import { Weather } from "../apis/Weather.js";

export class WeatherController {
    static WeatherControllerInstance = null;
    constructor(mixhallController) {
        this.weather = new Weather();
        this.weatherData = null;
        this.temp = null;
        this.weatherCode = null;
        WeatherController.WeatherControllerInstance = this;
        this.isRainingOrSnowing = false;
        this.isBelow10Celsius = false;
        this.isAbove35Celsius = false;
        this.mixhallController = mixhallController;
    }

    UpdateAllMachines(weatherData){
        let reasonPercentageSnowRain = { reason: "It is raining/Snowing", percentage: 10 };
        let reasonPercentageBelow10Celsius = { reason: "It is below 10 celsius", percentage: 15 };
        if (weatherData.weatherState == "Rainy" || weatherData.weatherState == "Snowy") {
            this.isRainingOrSnowing = true;
            this.mixhallController.lowerSpeedByPercentage(reasonPercentageSnowRain)
        } else if (this.isRainingOrSnowing){
            this.isRainingOrSnowing = false;
            this.mixhallController.increaseSpeedByPercentage(reasonPercentageSnowRain.reason);

        }
        if (weatherData.temp < 10) {
            this.isBelow10Celsius = true;
            this.mixhallController.lowerSpeedByPercentage(reasonPercentageBelow10Celsius)
        } else if (this.isBelow10Celsius){
            //Revert effects on all machines
            this.isBelow10Celsius = false;
            this.mixhallController.increaseSpeedByPercentage(reasonPercentageBelow10Celsius.reason);
        }

        if (weatherData.temp > 35) {
            this.isAbove35Celsius = true;
            this.mixhallController.allowOnlyOneMachineRunning();
        } else if (this.isAbove35Celsius){
            this.mixhallController.allowOnlyOneMachineRunning();
        }
    }


    async getWeatherData(countryCode, zip) {
        try {
            this.weatherData = await this.weather.getWeatherData(countryCode, zip);
            this.temp = this.weatherData.data[0].coordinates[0].dates[0].value
            this.weatherCode = this.weatherData.data[1].coordinates[0].dates[0].value
            let weatherState = null;
            if (this.weatherCode > 20) {
                if(this.weatherCode == 21){
                    weatherState = "Rainy";
                } else if (this.weatherCode == 22){
                    weatherState = "Snowy";
                }else{
                    weatherState = "Bad Weather";
                }
            } else{
                weatherState = "Normal Weather";
            }

            return {
                temp: this.temp,
                weatherState: weatherState
            };
        } catch (error) {
        }
    }
}