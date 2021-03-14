import * as actionTypes from './actionTypes';
import { Reducer } from './types';

const initialState: Reducer = {
  isFetching: false,
  articles: [],
  error: null,
};

function reducer(state = initialState, action: any): Reducer {
  switch (action.type) {
    case actionTypes.ARTICLES_FETCH_REQUEST:
      return { ...state, isFetching: true, error: null };
    case actionTypes.ARTICLES_FETCH_SUCCESS:
      return { ...state, isFetching: false, error: null, articles: action.articles };
    case actionTypes.ARTICLES_FETCH_FAILURE:
      return { ...state, isFetching: false, error: action.error, articles: [] };
    default:
      return state;
  }
}

export default reducer;
