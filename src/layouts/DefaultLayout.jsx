import React, { Suspense } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { Alert, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import ScrollToTop from 'react-router-scroll-top';
import { getError } from '../services/ArticlesService/selectors';
import LoadingPage from '../pages/LoadingPage';
import { Header, Footer, BackToTop } from '../components';
import RouterAnalyticsLayout from './RouterAnalyticsLayout';
import { ROUTES } from '../constants';

const Home = React.lazy(() => import('../pages/Home'));
const Articles = React.lazy(() => import('../pages/Articles'));
const Article = React.lazy(() => import('../pages/Article'));
const Search = React.lazy(() => import('../pages/Search'));
const NotFound = React.lazy(() => import('../pages/NotFound'));

const DefaultLayout = ({ articlesFetchError }) => {
  const withParam = (url, param) => `${url}/:${param}`;

  return (
    <div id="main">
      <Router onUpdate={() => window.scrollTo(0, 0)}>
        <RouterAnalyticsLayout>
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
            <ScrollToTop>
              <Switch>
                <Route exact path={ROUTES.HOME}>
                  <Home />
                </Route>
                <Route path={ROUTES.ARTICLES}>
                  <Articles />
                </Route>
                <Route path={withParam(ROUTES.ARTICLE, 'id')}>
                  <ScrollToTop top={0} />
                  <Article />
                </Route>
                <Route path={withParam(ROUTES.SEARCH, 'filter')}>
                  <Search />
                </Route>
                <Route>
                  <NotFound />
                </Route>
              </Switch>
            </ScrollToTop>
          </Suspense>
          <BackToTop />
        </RouterAnalyticsLayout>
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
