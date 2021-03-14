import * as actionTypes from './actionTypes';
import { ArticlesServiceActionTypes, ArticlesType } from './types';

export const articlesFetchRequest = (): ArticlesServiceActionTypes => {
  return {
    type: actionTypes.ARTICLES_FETCH_REQUEST,
  };
};

export const articlesFetchSuccess = (articles: ArticlesType): ArticlesServiceActionTypes => {
  return {
    type: actionTypes.ARTICLES_FETCH_SUCCESS,
    articles,
  };
};

export const articlesFetchFailure = (error: any): ArticlesServiceActionTypes => {
  return {
    type: actionTypes.ARTICLES_FETCH_FAILURE,
    error: error,
  };
};
