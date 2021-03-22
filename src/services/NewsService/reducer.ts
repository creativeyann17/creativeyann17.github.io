import * as actionTypes from './actionTypes';
import { Reducer } from './types';

const initialState: Reducer = {
  isFetching: false,
  news: [],
  error: null,
};

function reducer(state = initialState, action: any): Reducer {
  switch (action.type) {
    case actionTypes.NEWS_FETCH_REQUEST:
      return { ...state, isFetching: true, error: null };
    case actionTypes.NEWS_FETCH_SUCCESS:
      return { ...state, isFetching: false, error: null, news: action.news };
    case actionTypes.NEWS_FETCH_FAILURE:
      return { ...state, isFetching: false, error: action.error, news: [] };
    default:
      return state;
  }
}

export default reducer;
