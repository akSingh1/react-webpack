import ReactDOM from 'react-dom';
import AppContainer from './AppContainer';
import { registerServiceWorker } from "../sw-register";

//require("file-loader?name=../../result/index.html!../index.html");
//require("file-loader?name=../../result/server.js!../server.js");

registerServiceWorker();
ReactDOM.render(AppContainer, document.getElementById('container'));


