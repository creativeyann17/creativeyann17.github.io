import * as actionTypes from './actionTypes';

interface NewsFetchRequestAction {
  type: typeof actionTypes.NEWS_FETCH_REQUEST;
}

interface NewsFetchSuccessAction {
  type: typeof actionTypes.NEWS_FETCH_SUCCESS;
  news: NewsType;
}

interface NewsFetchFailureAction {
  type: typeof actionTypes.NEWS_FETCH_FAILURE;
  error: null | any;
}

export interface NewsType extends Array<NewType> {}

export interface NewType {}

export interface Reducer {
  isFetching: boolean;
  news: null | NewsType;
  error: null | any;
}

export type NewsServiceActionTypes =
  | NewsFetchRequestAction
  | NewsFetchSuccessAction
  | NewsFetchFailureAction;
