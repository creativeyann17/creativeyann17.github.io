import ReactGA from 'react-ga';
import { PROD } from '../constants';
import { debug } from './index';

export const initGA = (trackingID) => {
  debug(`GA_TRACKING_ID: ${trackingID}`);
  if (PROD) {
    ReactGA.initialize(trackingID);
  }
};

export const pageView = (pathname) => {
  debug(`Analytics - pageView: ${pathname}`);
  if (PROD) {
    ReactGA.pageview(pathname);
  }
};

export const event = (category, action, label) => {
  debug(`Analytics - event: {category: ${category}, action: ${action}, label: ${label}}`);
  if (PROD) {
    ReactGA.event({
      category,
      action,
      label,
    });
  }
};
