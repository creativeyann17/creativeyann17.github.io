import { State } from '../index';

export const isFetching = (state: State) => state.articlesServiceReducer.isFetching;
export const getArticles = (state: State) => state.articlesServiceReducer.articles;
