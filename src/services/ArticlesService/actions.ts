import * as actionTypes from './actionTypes';
import { ArticlesServiceActionTypes, ArticlesType, ArticleContent } from './types';

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
    error,
  };
};

export const articlesResetTableOfContents = (): ArticlesServiceActionTypes => {
  return {
    type: actionTypes.ARTICLES_RESET_TABLE_OF_CONTENTS,
  };
};

export const articlesPushArticleContent = (content: ArticleContent): ArticlesServiceActionTypes => {
  return {
    type: actionTypes.ARTICLES_PUSH_ARTICLE_CONTENT,
    content,
  };
};
