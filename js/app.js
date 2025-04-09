import { Header } from './view/Header.js';
import { Main } from './view/Main.js';
import { MixhallController } from './controllers/MixhallController.js';
import { WeatherController } from './controllers/WeatherController.js';
import { BucketController } from './controllers/BucketController.js';
document.addEventListener('DOMContentLoaded', function() {
    renderDefaultLayout();
});

function renderDefaultLayout() {
    let body = document.body;
    body.style.margin = "0";
    body.style.padding = "0";
    body.style.color = "red";

    let weatherController = new WeatherController();
    let mixhallController = new MixhallController();
    let bucketController = new BucketController();
    let header = new Header(mixhallController, weatherController);
    let main = new Main(mixhallController, bucketController);
}