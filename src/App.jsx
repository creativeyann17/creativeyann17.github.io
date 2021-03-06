import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './services';
import DefaultLayout from './layouts/DefaultLayout';
import { articlesFetchRequest } from './services/ArticlesService/actions';
import { newsFetchRequest } from './services/NewsService/actions';
import { websocketServiceOpen } from './services/WebSocketService/actions';

function App() {
  const store = configureStore();

  store.dispatch(newsFetchRequest());
  store.dispatch(articlesFetchRequest());
  store.dispatch(websocketServiceOpen());

  return (
    <Provider store={store}>
      <DefaultLayout />
    </Provider>
  );
}

export default App;
