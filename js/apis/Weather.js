export class Weather {
    name = '';
    password = '';

    constructor() {}

    async getWeatherData(countryCode, zip) {
        const baseUrl = 'https://api.meteomatics.com';
        const time = 'now';
        const parameters = 't_2m:C,precip_1h:mm';
        const postalCode = 'postal_'+countryCode+zip;
        const format = 'json'
        const url = `${baseUrl}/${time}/${parameters}/${postalCode}/${format}`;

        try {
            const response = await fetch(url, {
                headers: {
                    'Authorization': 'Basic ' + btoa(`${this.name}:${this.password}`)
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching weather data:', error);
            throw error;
        }
    }
}