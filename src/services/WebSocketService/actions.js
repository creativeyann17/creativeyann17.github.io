import * as actionTypes from './actionTypes';

export const websocketServiceOpen = () => {
  return {
    type: actionTypes.WEBSOCKET_SERVICE_OPEN,
  };
};

export const websocketServiceOnOpen = (websocket) => {
  return {
    type: actionTypes.WEBSOCKET_SERVICE_ON_OPEN,
    websocket,
  };
};

export const websocketServiceOnMessage = (data) => {
  return {
    type: actionTypes.WEBSOCKET_SERVICE_ON_MESSAGE,
    data,
  };
};

export const websocketServiceOnError = (error) => {
  return {
    type: actionTypes.WEBSOCKET_SERVICE_ON_ERROR,
    error,
  };
};

export const websocketServiceOnClose = (websocket) => {
  return {
    type: actionTypes.WEBSOCKET_SERVICE_ON_CLOSE,
    websocket,
  };
};
