import { put, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import axios from 'axios';
import { newsFetchSuccess, newsFetchFailure } from './actions';
import orderBy from 'lodash/orderBy';
import { NEWS_JSON } from '../../constants';

export function* watchNewsFetchRequest(action) {
  try {
    const news = yield axios
      .get(`${NEWS_JSON}?timestamp=${new Date().getTime()}`) // timestamp to ignore server cache
      .then((res) => res.data);
    yield put(newsFetchSuccess(orderBy(news, ['date'], ['desc'])));
  } catch (e) {
    yield put(newsFetchFailure(e.message));
  }
}

export default function* watchAsync() {
  yield takeLatest(actionTypes.NEWS_FETCH_REQUEST, watchNewsFetchRequest);
}
