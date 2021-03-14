import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import { Header, Footer, BackToTop } from '../components';

import { ROUTES } from '../constants';

const Home = React.lazy(() => import('../pages/Home'));
const Article = React.lazy(() => import('../pages/Article'));
const Search = React.lazy(() => import('../pages/Search'));

const DefaultLayout = () => {
  const withParam = (url, param) => `${url}/:${param}`;

  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path={ROUTES.HOME}>
            <Home />
          </Route>
          <Route path={withParam(ROUTES.ARTICLE, 'id')}>
            <Article />
          </Route>
          <Route path={withParam(ROUTES.SEARCH, 'filter')}>
            <Search />
          </Route>
        </Switch>
        <BackToTop />
      </Router>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
