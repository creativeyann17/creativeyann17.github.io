import * as actionTypes from './actionTypes';

export const initialState = {
  websocket: null,
  error: null,
  attempts: 0,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.WEBSOCKET_SERVICE_OPEN:
      return {
        ...state,
        error: null,
        attempts: state.attempts + 1,
      };
    case actionTypes.WEBSOCKET_SERVICE_ON_OPEN:
      return {
        ...state,
        websocket: action.websocket,
        attempts: 0,
      };
    case actionTypes.WEBSOCKET_SERVICE_ON_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case actionTypes.WEBSOCKET_SERVICE_ON_CLOSE:
      return {
        ...state,
        websocket: null,
      };
    default:
      return state;
  }
}

export default reducer;
