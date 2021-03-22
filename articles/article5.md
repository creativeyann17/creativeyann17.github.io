# Introduction

The following article explains how to integrate a classic javascript **WebSocket** into **redux-saga** with a retryable feature. All the events **onopen, onmessage, onclose, onerror** will be converted into **actions** usable with our React app.

# Action types

First we define our **websocket** action types. What can we do with it ? We can **OPEN** it and as a result some events may occurred like:

- ON_OPEN = connection to the API is successful
- ON_MESSAGE = we receive a message from the API
- ON_CLOSE = we lost the connection with the API
- ON_ERROR = an error occurred

```js
const SERVICE_NAME = 'WEBSOCKET_SERVICE';

export const WEBSOCKET_SERVICE_OPEN = SERVICE_NAME + '_OPEN';
export const WEBSOCKET_SERVICE_ON_OPEN = SERVICE_NAME + '_ON_OPEN';
export const WEBSOCKET_SERVICE_ON_CLOSE = SERVICE_NAME + '_ON_CLOSE';
export const WEBSOCKET_SERVICE_ON_MESSAGE = SERVICE_NAME + '_ON_MESSAGE';
export const WEBSOCKET_SERVICE_ON_ERROR = SERVICE_NAME + '_ON_ERROR';
```

# Actions

We defined the actions with params for some of them:

- ON_OPEN = websocket object
- ON_MESSAGE = data payload (JSON)
- ON_ERROR = error message
- ON_CLOSE = websocket object

```js
import * as actionTypes from './actionTypes';

export const websocketServiceOpen = () => {
  return {
    type: actionTypes.WEBSOCKET_SERVICE_OPEN,
  };
};

export const websocketServiceOnOpen = (websocket) => {
  return {
    type: actionTypes.WEBSOCKET_SERVICE_ON_OPEN,
    websocket,
  };
};

export const websocketServiceOnMessage = (data) => {
  return {
    type: actionTypes.WEBSOCKET_SERVICE_ON_MESSAGE,
    data,
  };
};

export const websocketServiceOnError = (error) => {
  return {
    type: actionTypes.WEBSOCKET_SERVICE_ON_ERROR,
    error,
  };
};

export const websocketServiceOnClose = (websocket) => {
  return {
    type: actionTypes.WEBSOCKET_SERVICE_ON_CLOSE,
    websocket,
  };
};
```

# Reducer

The reducer **state** contains the current websocket object if we are connected, the last possible error and the count of attempts we try to connect.

```js
import * as actionTypes from './actionTypes';

export const initialState = {
  websocket: null,
  error: null,
  attempts: 0,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.WEBSOCKET_SERVICE_OPEN:
      return {
        ...state,
        error: null,
        attempts: state.attempts + 1,
      };
    case actionTypes.WEBSOCKET_SERVICE_ON_OPEN:
      return {
        ...state,
        websocket: action.websocket,
        attempts: 0,
      };
    case actionTypes.WEBSOCKET_SERVICE_ON_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case actionTypes.WEBSOCKET_SERVICE_ON_CLOSE:
      return {
        ...state,
        websocket: null,
      };
    default:
      return state;
  }
}

export default reducer;
```

**Note:** We don't store the **data** from **ON_MESSAGE**, the logic would be to take them in another service in charge to filter them (by _type_ for example).

# Selectors

Let's give our application access to the reducer **state**:

```js
export const getWebSocket = (state) => state.websocketServiceReducer.websocket;
export const getAttempts = (state) => state.websocketServiceReducer.attempts;
export const getError = (state) => state.websocketServiceReducer.error;
```

# Saga

```js
import { take, fork, put, select, takeLatest, delay } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import get from 'lodash/get';
import * as actions from './actions';
import * as actionTypes from './actionTypes';
import * as selectors from './selectors';
import { WEBSOCKET_RETRY, API_URL } from '../../constants';

const buildUrl = (path) => {
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  return new URL(path, protocol + API_URL);
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
  const existingWs = yield select(selectors.getWebSocket);
  const attempts = yield select(selectors.getAttempts);
  if (!existingWs && attempts < WEBSOCKET_RETRY.MAX_ATTEMPTS) {
    const url = buildUrl('/ws');
    const ws = new WebSocket(url);
    yield fork(watchOnOpen, ws);
    yield fork(watchOnMessage, ws);
    yield fork(watchOnError, ws);
    yield fork(watchOnClose, ws);
  }
}

export default function* watchAsync() {
  yield takeLatest(actionTypes.WEBSOCKET_SERVICE_OPEN, watchOpen);
  yield takeLatest(actionTypes.WEBSOCKET_SERVICE_ON_ERROR, watchClose);
  yield takeLatest(actionTypes.WEBSOCKET_SERVICE_ON_CLOSE, watchRetryOpen);
}
```

# Retryable feature

The logic of retry is based on the event **ON_ERROR** that occurred in two situations:

- failed to connect
- error after being connected

Normally **ON_ERROR** will be triggered as well but in case it 's not we force to close the websocket:

```js
yield takeLatest(actionTypes.WEBSOCKET_SERVICE_ON_ERROR, watchClose);
```

Now **ON_CLOSE** is emitted and we catch it and retry to connect

```js
yield takeLatest(actionTypes.WEBSOCKET_SERVICE_ON_CLOSE, watchRetryOpen);
```

To summarize here are the possible scenarios:

Scenario 1: connection success:

- OPEN
- ON_OPEN

Scenario 2: failed to connect

- OPEN
- ON_ERROR -> watchClose -> watchRetryOpen x MAX_ATTEMPTS

Scenario 3: connection success and failed after

- OPEN
- ON_OPEN (reset **attempts** in the reducer state)
- ... _later_
- ON_ERROR -> watchClose -> watchRetryOpen x MAX_ATTEMPTS

# Configuration

The following part give you an example how you can define the needed constants we used previously in the **saga** of course you are free to change them to match your needs:

## Constants

```js
export const API_URL = process.env.REACT_APP_API_URL;

export const WEBSOCKET_RETRY = {
  DELAY: 5000,
  MAX_ATTEMPTS: 10,
};
```

## .env / .env.local

You can define the API URL like the following in **.env** or **.env.local** file (you need to restart the application to be taken into account: _npm start_):

```js
REACT_APP_API_URL=//localhost:8080
```

# Conclusion

You can now **OPEN** the websocket at application startup by dispatching **websocketServiceOpen** action and forget about it because the retry feature will automatically try to re-connect:

```js
import { websocketServiceOpen } from './services/WebSocketService/actions';

function App() {
  const store = configureStore();

  store.dispatch(websocketServiceOpen());
```
