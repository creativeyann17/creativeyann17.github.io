import { State } from '../index';

export const isFetching = (state: State) => state.newsServiceReducer.isFetching;
export const getError = (state: State) => state.newsServiceReducer.error;
export const getNews = (state: State) => state.newsServiceReducer.news;
