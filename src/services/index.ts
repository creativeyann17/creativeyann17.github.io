import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
// reducers
import articlesServiceReducer from './ArticlesService/reducer';
import newsServiceReducer from './NewsService/reducer';
// reducers types
import { Reducer as ArticlesServiceReducerType } from './ArticlesService/types';
import { Reducer as NewsServiceReducerType } from './NewsService/types';
// saga
import articlesServiceSaga from './ArticlesService';
import newsServiceSaga from './NewsService';
import { DEV } from '../constants';

export interface State {
  articlesServiceReducer: ArticlesServiceReducerType;
  newsServiceReducer: NewsServiceReducerType;
}

export default function configureStore() {
  const rootReducer = combineReducers({
    articlesServiceReducer,
    newsServiceReducer,
  });
  function* rootSaga() {
    yield all([articlesServiceSaga(), newsServiceSaga()]);
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
