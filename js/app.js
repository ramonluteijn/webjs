import { Header } from './view/Header.js';
import { Main } from './view/Main.js';
import { MixhallController } from './controllers/MixhallController.js';

document.addEventListener('DOMContentLoaded', function() {
    renderDefaultLayout();
});

function renderDefaultLayout() {
    let body = document.body;
    body.style.margin = "0";
    body.style.padding = "0";
    body.style.color = "red";

    let mixhallController = new MixhallController();

    let header = new Header(mixhallController);
    let main = new Main(mixhallController);
}