import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import App from './App';
import { initGA } from './utils/analytics';
import * as serviceWorker from './utils/serviceWorker';

import './style.scss';

initGA();

ReactDOM.render(
  <React.Fragment>
    <Helmet>
      <title>Welcome</title>
      <meta name="image" property="og:image" content="/logo.jpg" />
      <meta
        name="description"
        property="og:description"
        content="Personal blog and portfolio about software and web development."
      />
    </Helmet>
    <App />
  </React.Fragment>,
  document.getElementById('root')
);

serviceWorker.unregister();
