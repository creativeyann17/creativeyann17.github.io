import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Header, Footer, BackToTop } from '../components';

import { ROUTES } from '../constants';

const Home = React.lazy(() => import('../pages/Home'));
const Articles = React.lazy(() => import('../pages/Articles'));
const Search = React.lazy(() => import('../pages/Search'));

const DefaultLayout = (props) => {
  const withParam = (url, param) => `${url}/:${param}`;
  const withOptionalParam = (url, param) => `${url}/:${param}?`;

  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path={ROUTES.HOME}>
            <Home />
          </Route>
          <Route path={withOptionalParam(ROUTES.ARTICLES, 'id')}>
            <Articles />
          </Route>
          <Route path={withParam(ROUTES.SEARCH, 'filter')}>
            <Search />
          </Route>
        </Switch>
      </Router>
      <BackToTop />
      <Footer />
    </div>
  );
};

export default DefaultLayout;
