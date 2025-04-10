import { Header } from './view/Header.js';
import { Main } from './view/Main.js';
import { MixhallController } from './controllers/MixhallController.js';
import { WeatherController } from './controllers/WeatherController.js';
import { BucketController } from './controllers/BucketController.js';

document.addEventListener('DOMContentLoaded', () => {
    setupApp();
});

function setupApp() {
    document.body.style.cssText = "margin: 0; padding: 0; color: black";

    const weatherController = new WeatherController();
    const mixhallController = new MixhallController();
    const bucketController = new BucketController();

    new Header(mixhallController);
    new Main(mixhallController, bucketController, weatherController);

    Header.AppState("Ingredients");
}