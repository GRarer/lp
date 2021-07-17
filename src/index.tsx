import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './ui/App';
import reportWebVitals from './reportWebVitals';
import { getItemFromUrlParam } from './service/url';
import { RecordLabel } from './service/model';
import { Label } from './ui/label/Label';
import {loadStoredSettings} from './service/persistence';
import {defaultSettings} from './service/customization';

// check whether current tab is a label opened from another tab
const itemFromUrl: RecordLabel | undefined = getItemFromUrlParam();

// load settings from local storage
const initialSettings = loadStoredSettings() ?? defaultSettings;

ReactDOM.render(
  <React.StrictMode>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    {
      itemFromUrl
        ? <Label item={itemFromUrl} /> // display label page instead of app if an item was specified in url params
        : <App defaultSettings={initialSettings}/>
    }
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
