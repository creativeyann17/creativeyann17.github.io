import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
// reducers
import articlesServiceReducer from './ArticlesService/reducer';
import newsServiceReducer from './NewsService/reducer';
import websocketServiceReducer from './WebSocketService/reducer';
// reducers types
import { Reducer as ArticlesServiceReducerType } from './ArticlesService/types';
import { Reducer as NewsServiceReducerType } from './NewsService/types';
// saga
import articlesServiceSaga from './ArticlesService';
import newsServiceSaga from './NewsService';
import websocketServiceSaga from './WebSocketService';

import { DEV } from '../constants';

export interface State {
  articlesServiceReducer: ArticlesServiceReducerType;
  newsServiceReducer: NewsServiceReducerType;
}

export default function configureStore() {
  const rootReducer = combineReducers({
    articlesServiceReducer,
    newsServiceReducer,
    websocketServiceReducer,
  });
  function* rootSaga() {
    yield all([articlesServiceSaga(), newsServiceSaga(), websocketServiceSaga()]);
  }

  const sagaMiddleware = createSagaMiddleware();
  let middlewares = [sagaMiddleware];
  let composeEnhancer = compose;

  if (DEV) {
    const logger = createLogger();
    middlewares = [...middlewares, logger as any];
    composeEnhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  }

  const store = createStore(rootReducer, composeEnhancer(applyMiddleware(...middlewares)));
  sagaMiddleware.run(rootSaga);
  return store;
}
