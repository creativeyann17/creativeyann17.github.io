import { State } from '../index';

export const isFetching = (state: State) => state.articlesServiceReducer.isFetching;
export const getError = (state: State) => state.articlesServiceReducer.error;
export const getArticles = (state: State) => state.articlesServiceReducer.articles;
