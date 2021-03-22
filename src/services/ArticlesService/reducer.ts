import * as actionTypes from './actionTypes';
import { Reducer } from './types';

const initialState: Reducer = {
  isFetching: false,
  articles: [],
  tableOfContents: [],
  error: null,
};

function reducer(state = initialState, action: any): Reducer {
  switch (action.type) {
    case actionTypes.ARTICLES_FETCH_REQUEST:
      return { ...state, isFetching: true, error: null, tableOfContents: [] };
    case actionTypes.ARTICLES_FETCH_SUCCESS:
      return { ...state, isFetching: false, error: null, articles: action.articles };
    case actionTypes.ARTICLES_FETCH_FAILURE:
      return { ...state, isFetching: false, error: action.error, articles: [] };
    case actionTypes.ARTICLES_RESET_TABLE_OF_CONTENTS:
      return { ...state, tableOfContents: [] };
    case actionTypes.ARTICLES_PUSH_ARTICLE_CONTENT:
      return { ...state, tableOfContents: [...state.tableOfContents, action.content] };
    default:
      return state;
  }
}

export default reducer;
