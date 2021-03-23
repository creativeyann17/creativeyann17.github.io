import * as actionTypes from './actionTypes';

interface ArticlesFetchRequestAction {
  type: typeof actionTypes.ARTICLES_FETCH_REQUEST;
}

interface ArticlesFetchSuccessAction {
  type: typeof actionTypes.ARTICLES_FETCH_SUCCESS;
  articles: ArticlesType;
}

interface ArticlesViewsFetchFailureAction {
  type: typeof actionTypes.ARTICLES_VIEWS_FETCH_FAILURE;
  error: null | any;
}

interface ArticlesSetSelectedAction {
  type: typeof actionTypes.ARTICLES_SET_SELECTED;
  article: string;
}

interface ArticlesViewsFetchRequestAction {
  type: typeof actionTypes.ARTICLES_VIEWS_FETCH_REQUEST;
  id: string;
}

interface ArticlesViewsFetchSuccessAction {
  type: typeof actionTypes.ARTICLES_VIEWS_FETCH_SUCCESS;
  id: string;
  count: number;
}

interface ArticlesFetchFailureAction {
  type: typeof actionTypes.ARTICLES_FETCH_FAILURE;
  error: null | any;
}

interface ArticlesResetTableOfContentsAction {
  type: typeof actionTypes.ARTICLES_RESET_TABLE_OF_CONTENTS;
}

interface ArticlesPushArticleContentsAction {
  type: typeof actionTypes.ARTICLES_PUSH_ARTICLE_CONTENT;
  content: ArticleContent;
}

export interface ArticlesType extends Array<ArticleType> {}

export interface ArticleType {}

export interface TableOfContents extends Array<ArticleContent> {}

export interface ArticleContent {
  level: number;
  title: string;
  tag: string;
}

export interface Reducer {
  isFetching: boolean;
  isViewsFetching: boolean;
  articles: null | ArticlesType;
  selected: null | string;
  views: null | any;
  tableOfContents: any | TableOfContents;
  error: null | any;
  viewsError: null | any;
}

export type ArticlesServiceActionTypes =
  | ArticlesFetchRequestAction
  | ArticlesFetchSuccessAction
  | ArticlesFetchFailureAction
  | ArticlesSetSelectedAction
  | ArticlesViewsFetchRequestAction
  | ArticlesViewsFetchSuccessAction
  | ArticlesViewsFetchFailureAction
  | ArticlesResetTableOfContentsAction
  | ArticlesPushArticleContentsAction;
