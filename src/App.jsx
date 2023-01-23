import React, {Suspense} from 'react';
import { Provider } from 'react-redux';
import configureStore from './services';
import DefaultLayout from './layouts/DefaultLayout';
import { articlesFetchRequest } from './services/ArticlesService/actions';
import { newsFetchRequest } from './services/NewsService/actions';
import { websocketServiceOpen } from './services/WebSocketService/actions';
import { REDIRECT } from './constants';
import LoadingPage from './pages/LoadingPage';

const Redirect = React.lazy(() => import('./pages/Redirect'));

function App() {
  const store = configureStore();

  store.dispatch(newsFetchRequest());
  store.dispatch(articlesFetchRequest());
  store.dispatch(websocketServiceOpen());

  if (REDIRECT) {
    return (
      <Suspense fallback={<LoadingPage />}>
        <Redirect url={REDIRECT}/>
      </Suspense>
    );
  } else {
    return (
      <Provider store={store}>
        <DefaultLayout />
      </Provider>
    );
  }
}

export default App;
