import * as actionTypes from './actionTypes';
import { NewsServiceActionTypes, NewsType } from './types';

export const newsFetchRequest = (): NewsServiceActionTypes => {
  return {
    type: actionTypes.NEWS_FETCH_REQUEST,
  };
};

export const newsFetchSuccess = (news: NewsType): NewsServiceActionTypes => {
  return {
    type: actionTypes.NEWS_FETCH_SUCCESS,
    news,
  };
};

export const newsFetchFailure = (error: any): NewsServiceActionTypes => {
  return {
    type: actionTypes.NEWS_FETCH_FAILURE,
    error,
  };
};
