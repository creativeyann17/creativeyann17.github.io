import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import App from './App';
import { initGA } from './utils/analytics';
import { GA_TRACKING_ID } from './constants';
import * as serviceWorker from './utils/serviceWorker';

import './style.scss';

initGA(GA_TRACKING_ID);

ReactDOM.render(
  <React.Fragment>
    <Helmet>
      <title>(C) reativeYann17</title>
      <meta name="image" property="og:image" content="/logo.jpg" />
      <meta
        name="description"
        property="og:description"
        content="Personal blog and portfolio about software and web development with Spring-boot / Micronaut / React.js and more ..."
      />
    </Helmet>
    <App />
  </React.Fragment>,
  document.getElementById('root')
);

serviceWorker.unregister();
