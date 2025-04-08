import { Weather } from "../apis/Weather.js";

export class WeatherController {
    constructor() {
        this.weather = new Weather();
        this.weatherData = null;
    }

    async getWeatherData(countryCode, zip) {
        try {
            this.weatherData = await this.weather.getWeatherData(countryCode, zip);
            this.weatherData.data.forEach(weather => {
                    console.log(weather.coordinates[0].dates[0].value + " " + weather.parameter);
                })
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }
}