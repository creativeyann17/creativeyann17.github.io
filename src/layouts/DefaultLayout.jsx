import React, { Suspense } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { Alert, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getError } from '../services/ArticlesService/selectors';
import LoadingPage from '../pages/LoadingPage';
import { Header, Footer, BackToTop } from '../components';
import { ROUTES } from '../constants';

const Home = React.lazy(() => import('../pages/Home'));
const Articles = React.lazy(() => import('../pages/Articles'));
const Article = React.lazy(() => import('../pages/Article'));
const Search = React.lazy(() => import('../pages/Search'));

const DefaultLayout = ({ articlesFetchError }) => {
  const withParam = (url, param) => `${url}/:${param}`;

  return (
    <div>
      <Router>
        <Header />
        {articlesFetchError && (
          <div>
            <Container>
              <Alert variant="danger" className="mt-3">
                <b>Failed to get articles list:</b> {articlesFetchError}
              </Alert>
            </Container>
          </div>
        )}
        <Suspense fallback={<LoadingPage />}>
          <Switch>
            <Route exact path={ROUTES.HOME}>
              <Home />
            </Route>
            <Route path={ROUTES.ARTICLES}>
              <Articles />
            </Route>
            <Route path={withParam(ROUTES.ARTICLE, 'id')}>
              <Article />
            </Route>
            <Route path={withParam(ROUTES.SEARCH, 'filter')}>
              <Search />
            </Route>
          </Switch>
        </Suspense>
        <BackToTop />
      </Router>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    articlesFetchError: getError(state),
  };
};

export default connect(mapStateToProps)(DefaultLayout);
