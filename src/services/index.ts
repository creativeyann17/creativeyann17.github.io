import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
// reducers
import articlesServiceReducer from './ArticlesService/reducer';
// reducers types
import { Reducer as articlesServiceReducerType } from './ArticlesService/types';
// saga
import articlesServiceSaga from './ArticlesService';
import { DEV } from '../constants';

export interface State {
  articlesServiceReducer: articlesServiceReducerType;
}

export default function configureStore() {
  const rootReducer = combineReducers({
    articlesServiceReducer,
  });
  function* rootSaga() {
    yield all([articlesServiceSaga()]);
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
