import { State } from '../index';

export const isFetching = (state: State) => state.articlesServiceReducer.isFetching;
export const getError = (state: State) => state.articlesServiceReducer.error;
export const getArticles = (state: State) => state.articlesServiceReducer.articles;
export const getSelected = (state: State) => state.articlesServiceReducer.selected;
export const getTableOfContents = (state: State) => state.articlesServiceReducer.tableOfContents;
export const getViews = (state: State) => state.articlesServiceReducer.views;
