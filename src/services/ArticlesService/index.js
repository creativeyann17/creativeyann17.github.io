import { put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import axios from 'axios';
import { articlesFetchSuccess, articlesFetchFailure } from './actions';
import orderBy from 'lodash/orderBy';
import { ARTICLES_JSON } from '../../constants';

export function* watchArticlesFetchRequest(action) {
  try {
    const articles = yield axios
      .get(`${ARTICLES_JSON}?timestamp=${new Date().getTime()}`) // timestamp to ignore server cache
      .then((res) => res.data);
    yield put(articlesFetchSuccess(orderBy(articles, ['date'], ['desc'])));
  } catch (e) {
    yield put(articlesFetchFailure(e.message));
  }
}

export default function* watchAsync() {
  yield takeLatest(actionTypes.ARTICLES_FETCH_REQUEST, watchArticlesFetchRequest);
}
