import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { preHeat } from './generate.js';
import App from "./App";
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'


const options = {
    timeout: 5000,
    position: 'bottom left',
    type: 'info',
    transition: 'scale'
}

ReactDOM.render(
    <React.StrictMode>
        <AlertProvider template={AlertTemplate}{...options}>
            <App />
        </AlertProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

preHeat();
