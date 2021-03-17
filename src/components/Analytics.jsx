import React from 'react';
import { default as ReactRouterGa } from 'react-router-ga';
import { useLocation } from 'react-router-dom';
import { debug } from '../utils';
import { PROD, GA_TRACKING_ID } from '../constants';

const Analytics = ({ children }) => {
  const renderDefault = () => <div>{children}</div>;

  const location = useLocation();
  if (PROD) {
    if (GA_TRACKING_ID) {
      return <ReactRouterGa id={GA_TRACKING_ID}>{children}</ReactRouterGa>;
    } else {
      console.error('Analytics is disabled'); // don't want to give more details
      return renderDefault();
    }
  } else {
    debug(`GA_TRACKING_ID: ${GA_TRACKING_ID}`);
    debug(`Analytics current path: ${location.pathname}`);
    return renderDefault();
  }
};

export default Analytics;
