import * as actionTypes from './actionTypes';
import { Reducer } from './types';

const initialState: Reducer = {
  isFetching: false,
  isViewsFetching: false,
  isLikesFetching: false,
  articles: [],
  selected: null,
  views: {},
  likes: {},
  liked: {},
  tableOfContents: [],
  error: null,
  viewsError: null,
  likesError: null,
};

function reducer(state = initialState, action: any): Reducer {
  switch (action.type) {
    case actionTypes.ARTICLES_FETCH_REQUEST:
      return { ...state, isFetching: true, error: null, tableOfContents: [] };
    case actionTypes.ARTICLES_FETCH_SUCCESS:
      return { ...state, isFetching: false, error: null, articles: action.articles };
    case actionTypes.ARTICLES_FETCH_FAILURE:
      return { ...state, isFetching: false, error: action.error, articles: [] };

    case actionTypes.ARTICLES_SET_SELECTED:
      return { ...state, selected: action.id };

    case actionTypes.ARTICLES_VIEWS_FETCH_REQUEST:
      return { ...state, isViewsFetching: true, viewsError: null };
    case actionTypes.ARTICLES_VIEWS_FETCH_SUCCESS:
      return {
        ...state,
        isViewsFetching: false,
        viewsError: null,
        views: { ...state.views, [action.id]: action.count },
      };
    case actionTypes.ARTICLES_VIEWS_FETCH_FAILURE:
      return { ...state, isViewsFetching: false, viewsError: action.error };

    case actionTypes.ARTICLES_RESET_TABLE_OF_CONTENTS:
      return { ...state, tableOfContents: [] };
    case actionTypes.ARTICLES_PUSH_ARTICLE_CONTENT:
      return { ...state, tableOfContents: [...state.tableOfContents, action.content] };

    case actionTypes.ARTICLES_LIKES_INC_REQUEST:
    case actionTypes.ARTICLES_LIKES_FETCH_REQUEST:
      return { ...state, isLikesFetching: true, likesError: null };
    case actionTypes.ARTICLES_LIKES_FETCH_SUCCESS:
      return {
        ...state,
        isLikesFetching: false,
        likesError: null,
        likes: { ...state.views, [action.id]: action.count },
        liked: { ...state.views, [action.id]: action.liked },
      };
    case actionTypes.ARTICLES_LIKES_FETCH_FAILURE:
      return { ...state, isLikesFetching: false, likesError: action.error };

    default:
      return state;
  }
}

export default reducer;
