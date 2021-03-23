import { put, select, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as actionTypes from './actionTypes';
import ls from 'local-storage';
import { WEBSOCKET_SERVICE_ON_MESSAGE } from '../WebSocketService/actionTypes';
import * as selectors from './selectors';
import axios from 'axios';
import {
  articlesFetchSuccess,
  articlesFetchFailure,
  articlesViewsFetchSuccess,
  articlesViewsFetchFailure,
} from './actions';
import orderBy from 'lodash/orderBy';
import { ARTICLES_JSON } from '../../constants';
import { debug, buildAPIRequestUrl } from '../../utils';

export function* watchArticlesFetchRequest() {
  try {
    const articles = yield axios
      .get(`${ARTICLES_JSON}?timestamp=${new Date().getTime()}`) // timestamp to ignore server cache
      .then((res) => res.data);
    yield put(articlesFetchSuccess(orderBy(articles, ['date'], ['desc'])));
  } catch (e) {
    yield put(articlesFetchFailure(e.message));
  }
}

export function* watchArticlesSetSelected() {
  const id = yield select(selectors.getSelected);
  yield put(actions.articlesViewsFetchRequest(id));
}

export function* watchArticlesViewsFetchRequest(action) {
  const alreadyVisitThisArticle = ls.get(action.id);
  try {
    const path = buildAPIRequestUrl('/views/' + action.id);
    let views;
    if (alreadyVisitThisArticle) {
      debug('Article already visited');
      views = yield axios.get(path).then((res) => res.data);
    } else {
      debug('Article never visited');
      views = yield axios.post(path).then((res) => res.data);
    }
    yield put(articlesViewsFetchSuccess(views.article, views.count));
    ls.set(action.id, true);
  } catch (e) {
    yield put(articlesViewsFetchFailure(e.message));
  }
}

export function* watchWebSocketOnMessage({ data }) {
  if (data.type === 'ARTICLE_VIEWS') {
    yield put(articlesViewsFetchSuccess(data.article, data.count));
  }
}

export default function* watchAsync() {
  yield takeLatest(actionTypes.ARTICLES_FETCH_REQUEST, watchArticlesFetchRequest);
  yield takeLatest(actionTypes.ARTICLES_SET_SELECTED, watchArticlesSetSelected);
  yield takeLatest(actionTypes.ARTICLES_VIEWS_FETCH_REQUEST, watchArticlesViewsFetchRequest);
  yield takeLatest(WEBSOCKET_SERVICE_ON_MESSAGE, watchWebSocketOnMessage);
}
