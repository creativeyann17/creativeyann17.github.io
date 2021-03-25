import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './services';
import DefaultLayout from './layouts/DefaultLayout';
import { articlesFetchRequest } from './services/ArticlesService/actions';
import { newsFetchRequest } from './services/NewsService/actions';
import { websocketServiceOpen } from './services/WebSocketService/actions';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { buildAPIRequestUrl } from './utils';

function App() {
  const store = configureStore();

  const client = new ApolloClient({
    uri: buildAPIRequestUrl('graphql'),
    cache: new InMemoryCache(),
  });

  store.dispatch(newsFetchRequest());
  store.dispatch(articlesFetchRequest());
  store.dispatch(websocketServiceOpen());

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <DefaultLayout />
      </Provider>
    </ApolloProvider>
  );
}

export default App;
