import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
// reducers
import articlesServiceReducer from './ArticlesService/reducer';
import newsServiceReducer from './NewsService/reducer';
import websocketServiceReducer from './WebSocketService/reducer';
import awsServiceReducer from './AWSService/reducer';
// reducers types
import { Reducer as ArticlesServiceReducerType } from './ArticlesService/types';
import { Reducer as NewsServiceReducerType } from './NewsService/types';
import { Reducer as AWSServiceReducerType } from './AWSService/types';
// saga
import articlesServiceSaga from './ArticlesService';
import newsServiceSaga from './NewsService';
import websocketServiceSaga from './WebSocketService';
import awsServiceSage from './AWSService';

import { DEV } from '../constants';

export interface State {
  articlesServiceReducer: ArticlesServiceReducerType;
  newsServiceReducer: NewsServiceReducerType;
  awsServiceReducer: AWSServiceReducerType;
}

export default function configureStore() {
  const rootReducer = combineReducers({
    articlesServiceReducer,
    newsServiceReducer,
    websocketServiceReducer,
    awsServiceReducer,
  });
  function* rootSaga() {
    yield all([articlesServiceSaga(), newsServiceSaga(), websocketServiceSaga(), awsServiceSage()]);
  }

  const sagaMiddleware = createSagaMiddleware();
  let middlewares = [sagaMiddleware];
  let composeEnhancer = compose;

  if (DEV) {
    const { logger } = require('redux-logger');
    middlewares = [...middlewares, logger];
    composeEnhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  }

  const store = createStore(rootReducer, composeEnhancer(applyMiddleware(...middlewares)));
  sagaMiddleware.run(rootSaga);
  return store;
}
