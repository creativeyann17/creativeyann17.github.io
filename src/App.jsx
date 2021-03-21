import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './services';
import DefaultLayout from './layouts/DefaultLayout';
import { articlesFetchRequest } from './services/ArticlesService/actions';

function App() {
  const store = configureStore();

  store.dispatch(articlesFetchRequest());

  return (
    <Provider store={store}>
      <DefaultLayout />
    </Provider>
  );
}

export default App;
