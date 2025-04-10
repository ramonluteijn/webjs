import { Weather } from "../apis/Weather.js";

export class WeatherController {
    constructor() {
        this.weather = new Weather();
        this.weatherData = null;
        this.temp = null;
        this.weatherCode = null;
    }

    async getWeatherData(countryCode, zip) {
        try {
            this.weatherData = await this.weather.getWeatherData(countryCode, zip);
            console.log("WeatherController: getWeatherData", this.weatherData);
            this.temp = this.weatherData.data[0].coordinates[0].dates[0].value // Temp
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