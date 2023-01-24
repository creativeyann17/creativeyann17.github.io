import * as actionTypes from './actionTypes';
import { Reducer } from './types';

const initialState: Reducer = {
  isReady: false,
  error: null,
};

function reducer(state = initialState, action: any): Reducer {
  switch (action.type) {
    case actionTypes.INIT_REQUEST:
      return { ...state, isReady: false, error: null };
    case actionTypes.INIT_SUCCESS:
      return { ...state, isReady: true };
    case actionTypes.INIT_FAILURE:
      return { ...state, isReady: false, error: action.error };
    default:
      return state;
  }
}

export default reducer;
