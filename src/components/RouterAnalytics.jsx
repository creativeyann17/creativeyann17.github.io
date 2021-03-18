import React from 'react';
import { useLocation } from 'react-router-dom';
import { pageView } from '../utils/analytics';

const RouterAnalytics = ({ children }) => {
  const location = useLocation();
  pageView(location.pathname);
  return <div>{children}</div>;
};

export default RouterAnalytics;
