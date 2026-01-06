import React, { Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Alert, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import ScrollToTop from '../components/ScrollToTop';
import { getError } from '../services/ArticlesService/selectors';
import LoadingPage from '../pages/LoadingPage';
import { Header, Footer, BackToTop } from '../components';
import RouterAnalyticsLayout from './RouterAnalyticsLayout';
import { ROUTES } from '../constants';

const Home = React.lazy(() => import('../pages/Home'));
const Articles = React.lazy(() => import('../pages/Articles'));
const Article = React.lazy(() => import('../pages/Article'));
const Search = React.lazy(() => import('../pages/Search'));
const About = React.lazy(() => import('../pages/About'));
const NotFound = React.lazy(() => import('../pages/NotFound'));

const DefaultLayout = ({ articlesFetchError }) => {
  const withParam = (url, param) => `${url}/:${param}`;

  return (
    <Router>
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
            <Routes>
              <Route path={ROUTES.HOME} element={<Home />} />
              <Route path={ROUTES.ARTICLES} element={<Articles />} />
              <Route path={withParam(ROUTES.ARTICLE, 'id')} element={<Article />} />
              <Route path={withParam(ROUTES.SEARCH, 'filter')} element={<Search />} />
              <Route path={ROUTES.ABOUT} element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ScrollToTop>
        </Suspense>
        <BackToTop />
        <Footer />
      </RouterAnalyticsLayout>
    </Router>
  );
};

const mapStateToProps = (state) => {
  return {
    articlesFetchError: getError(state),
  };
};

export default connect(mapStateToProps)(DefaultLayout);
