import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { initGA } from './utils/analytics';
import { GA_TRACKING_ID } from './constants';
import * as serviceWorker from './utils/serviceWorker';

import './style.scss';

initGA(GA_TRACKING_ID);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
