import React from 'react';
import { default as ReactRouterGa } from 'react-router-ga';
import { useLocation } from 'react-router-dom';
import { debug } from '../utils';
import { PROD, GA_TRACKING_ID } from '../constants';

const Analytics = ({ children }) => {
  const location = useLocation();
  if (PROD) {
    if (GA_TRACKING_ID) {
      return <ReactRouterGa id={GA_TRACKING_ID}>{children}</ReactRouterGa>;
    } else {
      console.error('Missing GA_TRACKING_ID env. variable');
    }
  } else {
    debug(`GA_TRACKING_ID: ${GA_TRACKING_ID}`);
    debug(`Analytics current path: ${location.pathname}`);
    return <div>{children}</div>;
  }
};

export default Analytics;
