import * as actionTypes from './actionTypes';

interface ArticlesFetchRequestAction {
  type: typeof actionTypes.ARTICLES_FETCH_REQUEST;
}

interface ArticlesFetchSuccessAction {
  type: typeof actionTypes.ARTICLES_FETCH_SUCCESS;
  articles: ArticlesType;
}

interface ArticlesFetchFailureAction {
  type: typeof actionTypes.ARTICLES_FETCH_FAILURE;
  error: null | any;
}

export interface ArticlesType extends Array<ArticleType> {}

export interface ArticleType {}

export interface Reducer {
  isFetching: boolean;
  articles: null | ArticlesType;
  error: null | any;
}

export type ArticlesServiceActionTypes =
  | ArticlesFetchRequestAction
  | ArticlesFetchSuccessAction
  | ArticlesFetchFailureAction;
