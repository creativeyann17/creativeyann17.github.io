import { put, select, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as actionTypes from './actionTypes';
import ls from 'local-storage';
import { WEBSOCKET_SERVICE_ON_MESSAGE } from '../WebSocketService/actionTypes';
import * as selectors from './selectors';
import axios from 'axios';
import orderBy from 'lodash/orderBy';
import get from 'lodash/get';
import { ARTICLES_JSON, useGraphQL } from '../../constants';
import { debug, buildAPIRequestUrl } from '../../utils';
import {
  getLikeArticleQuery,
  postLikeArticleQuery,
  getViewArticleQuery,
  postViewArticleQuery,
} from './graphql';
import graphQLClient from '../../utils/graphql';

export function* watchArticlesFetchRequest() {
  try {
    const articles = yield axios
      .get(`${ARTICLES_JSON}?timestamp=${new Date().getTime()}`) // timestamp to ignore server cache
      .then((res) => res.data);
    yield put(actions.articlesFetchSuccess(orderBy(articles, ['date'], ['desc'])));
  } catch (e) {
    yield put(actions.articlesFetchFailure(e.message));
  }
}

export function* watchArticlesSetSelected() {
  const id = yield select(selectors.getSelected);
  yield put(actions.articlesViewsFetchRequest(id));
  yield put(actions.articlesLikesFetchRequest(id));
}

export function* watchArticlesViewsFetchRequest(action) {
  const localStorageArticle = ls.get(action.id);
  const alreadyVisitThisArticle = get(localStorageArticle, 'viewed', false);
  try {
    const path = buildAPIRequestUrl('/views/' + action.id);
    let views;
    if (alreadyVisitThisArticle) {
      debug('Article already visited');
      if (useGraphQL) {
        views = yield graphQLClient
          .request(getViewArticleQuery, { article: action.id })
          .then((data) => data.getViewArticle);
      } else {
        views = yield axios.get(path).then((res) => res.data);
      }
    } else {
      debug('Article never visited');

      if (useGraphQL) {
        views = yield graphQLClient
          .request(postViewArticleQuery, { article: action.id })
          .then((data) => data.postViewArticle);
      } else {
        views = yield axios.post(path).then((res) => res.data);
      }
    }
    ls.set(action.id, { ...localStorageArticle, viewed: true });
    yield put(actions.articlesViewsFetchSuccess(views.article, views.count));
  } catch (e) {
    yield put(actions.articlesViewsFetchFailure(e.message));
  }
}

export function* watchArticlesLikesFetchRequest(action) {
  try {
    const path = buildAPIRequestUrl('/likes/' + action.id);
    let likes;
    if (useGraphQL) {
      likes = yield graphQLClient
        .request(getLikeArticleQuery, { article: action.id })
        .then((data) => data.getLikeArticle);
    } else {
      likes = yield axios.get(path).then((res) => res.data);
    }
    yield put(actions.articlesLikesFetchSuccess(likes.article, likes.count, isLiked(action.id)));
  } catch (e) {
    yield put(actions.articlesLikesFetchFailure(e.message));
  }
}

export function* watchArticlesLikesIncRequest(action) {
  try {
    const path = buildAPIRequestUrl('/likes/' + action.id);
    let likes;
    if (useGraphQL) {
      likes = yield graphQLClient
        .request(postLikeArticleQuery, { article: action.id })
        .then((data) => data.postLikeArticle);
    } else {
      likes = yield axios.post(path).then((res) => res.data);
    }
    const localStorageArticle = ls.get(action.id);
    ls.set(action.id, { ...localStorageArticle, liked: true });
    yield put(actions.articlesLikesFetchSuccess(likes.article, likes.count, isLiked(action.id)));
  } catch (e) {
    yield put(actions.articlesLikesFetchFailure(e.message));
  }
}

export function* watchWebSocketOnMessage({ data }) {
  if (data.type === 'ARTICLE_VIEWS') {
    yield put(actions.articlesViewsFetchSuccess(data.article, data.count));
  } else if (data.type === 'ARTICLE_LIKES') {
    yield put(actions.articlesLikesFetchSuccess(data.article, data.count, isLiked(data.article)));
  }
}

const isLiked = (id) => {
  const localStorageArticle = ls.get(id);
  return get(localStorageArticle, 'liked', false);
};

export default function* watchAsync() {
  yield takeLatest(actionTypes.ARTICLES_FETCH_REQUEST, watchArticlesFetchRequest);
  yield takeLatest(actionTypes.ARTICLES_SET_SELECTED, watchArticlesSetSelected);
  yield takeLatest(actionTypes.ARTICLES_VIEWS_FETCH_REQUEST, watchArticlesViewsFetchRequest);
  yield takeLatest(actionTypes.ARTICLES_LIKES_FETCH_REQUEST, watchArticlesLikesFetchRequest);
  yield takeLatest(actionTypes.ARTICLES_LIKES_INC_REQUEST, watchArticlesLikesIncRequest);
  yield takeLatest(WEBSOCKET_SERVICE_ON_MESSAGE, watchWebSocketOnMessage);
}
