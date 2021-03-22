import { take, fork, put, select, takeLatest, delay } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import get from 'lodash/get';
import * as actions from './actions';
import * as actionTypes from './actionTypes';
import * as selectors from './selectors';
import { WEBSOCKET_RETRY, API_URL } from '../../constants';
import { debug } from '../../utils';

const buildUrl = (path) => {
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  return new URL(path, protocol + '//' + API_URL);
};

const isOpen = (socket) => {
  return get(socket, 'readyState', WebSocket.CLOSED) !== WebSocket.CLOSED;
};

function* watchOnOpen(socket) {
  const chan = eventChannel((emitter) => {
    socket.onopen = (event) => emitter(event);
    return () => {};
  });
  while (isOpen(socket)) {
    const event = yield take(chan);
    yield put(actions.websocketServiceOnOpen(event.target));
  }
}

function* watchOnMessage(socket) {
  const chan = eventChannel((emitter) => {
    socket.onmessage = (event) => emitter(event);
    return () => {};
  });
  while (isOpen(socket)) {
    const event = yield take(chan);
    debug('WebSocket data: ' + event.data);
    const data = JSON.parse(event.data);
    yield put(actions.websocketServiceOnMessage(data));
  }
}

function* watchOnError(socket) {
  const chan = eventChannel((emitter) => {
    socket.onerror = (event) => emitter(event);
    return () => {};
  });
  while (isOpen(socket)) {
    const event = yield take(chan);
    yield put(actions.websocketServiceOnError(event.code));
  }
}

function* watchOnClose(socket) {
  const chan = eventChannel((emitter) => {
    socket.onclose = (event) => emitter(event);
    return () => {};
  });
  while (isOpen(socket)) {
    const event = yield take(chan);
    yield put(actions.websocketServiceOnClose(event.target));
  }
}

export function* watchClose() {
  const existingWs = yield select(selectors.getWebSocket);
  if (existingWs && isOpen(existingWs)) {
    existingWs.close();
  }
}

export function* watchRetryOpen() {
  yield delay(WEBSOCKET_RETRY.DELAY);
  yield put(actions.websocketServiceOpen());
}

export function* watchOpen() {
  if (API_URL) {
    const existingWs = yield select(selectors.getWebSocket);
    const attempts = yield select(selectors.getAttempts);
    if (!existingWs && attempts < WEBSOCKET_RETRY.MAX_ATTEMPTS) {
      const url = buildUrl('/ws');
      debug(`WebSocket (attempts: ${attempts}): ${url}`);
      const ws = new WebSocket(url);
      yield fork(watchOnOpen, ws);
      yield fork(watchOnMessage, ws);
      yield fork(watchOnError, ws);
      yield fork(watchOnClose, ws);
    }
  } else {
    console.warn('WebSocket is disabled');
  }
}

export default function* watchAsync() {
  yield takeLatest(actionTypes.WEBSOCKET_SERVICE_OPEN, watchOpen);
  yield takeLatest(actionTypes.WEBSOCKET_SERVICE_ON_ERROR, watchClose);
  yield takeLatest(actionTypes.WEBSOCKET_SERVICE_ON_CLOSE, watchRetryOpen);
}
