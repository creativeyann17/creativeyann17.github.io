import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import configureStore from './services';
import LoadingLayout from './layouts/LoadingLayout';
import DefaultLayout from './layouts/DefaultLayout';
import { articlesFetchRequest } from './services/ArticlesService/actions';

function App() {
  const store = configureStore();

  store.dispatch(articlesFetchRequest());

  return (
    <Provider store={store}>
      <Suspense fallback={<LoadingLayout />}>
        <DefaultLayout />
      </Suspense>
    </Provider>
  );
}

export default App;
