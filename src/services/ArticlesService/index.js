import { put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import axios from 'axios';
import { articlesFetchSuccess, articlesFetchFailure } from './actions';
import { ARTICLES_JSON } from '../../constants';

export function* watchArticlesFetchRequest(action) {
  try {
    const articles = yield axios.get(ARTICLES_JSON).then((res) => res.data);
    yield put(articlesFetchSuccess(articles));
  } catch (e) {
    yield put(articlesFetchFailure(e.message));
  }
}

export default function* watchAsync() {
  yield takeLatest(actionTypes.ARTICLES_FETCH_REQUEST, watchArticlesFetchRequest);
}
