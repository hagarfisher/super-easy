import { Auth0Provider } from "@auth0/auth0-react";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
    <Auth0Provider
        domain="dev-5zxzugi9.us.auth0.com"
        clientId="8oRImY7DMfG2LpRHSdFRHNz215VGgi7g"
        redirectUri={window.location.origin}
    >
        <App />
    </Auth0Provider>
    , document.getElementById('root'));