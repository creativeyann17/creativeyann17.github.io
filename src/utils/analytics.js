import ReactGA from 'react-ga';
import { PROD, GA_TRACKING_ID } from '../constants';
import { debug } from './index';

export const initGA = () => {
  if (!GA_TRACKING_ID) return;
  debug(`GA_TRACKING_ID: ${GA_TRACKING_ID}`);
  if (PROD) {
    ReactGA.initialize(GA_TRACKING_ID);
  }
};

export const pageView = (pathname) => {
  if (!GA_TRACKING_ID) return;
  debug(`Analytics - pageView: ${pathname}`);
  if (PROD) {
    ReactGA.pageview(pathname);
  }
};

export const event = (category, action, label) => {
  if (!GA_TRACKING_ID) return;
  debug(`Analytics - event: {category: ${category}, action: ${action}, label: ${label}}`);
  if (PROD) {
    ReactGA.event({
      category,
      action,
      label,
    });
  }
};
