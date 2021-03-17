import React from 'react';
import { default as ReactRouterGa } from 'react-router-ga';
import { useLocation } from 'react-router-dom';
import { debug } from '../utils';
import { PROD, GA_TRACKING_ID } from '../constants';

const Analytics = ({ children }) => {
  const location = useLocation();
  if (PROD) {
    return <ReactRouterGa id={GA_TRACKING_ID}>{children}</ReactRouterGa>;
  } else {
    debug(`Analytics current path: ${location.pathname}`);
    return <div>{children}</div>;
  }
};

export default Analytics;
