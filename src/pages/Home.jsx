import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { getArticles } from '../services/ArticlesService/selectors';
import { getNews } from '../services/NewsService/selectors';
import map from 'lodash/map';
import slice from 'lodash/slice';
import FadeIn from '../components/FadeIn';
import { ArticleCard, News } from '../components';
import { findFeaturedArticle, renderPagination } from '../utils';
import { NEWS_PAGINATION } from '../constants';

const Home = ({ news, articles }) => {
  const featuredArticle = findFeaturedArticle(articles);
  const [newsPage, setNewsPage] = useState(1);

  const newsPageStart = (newsPage - 1) * NEWS_PAGINATION;
  const newsPageEnd = (newsPage - 1) * NEWS_PAGINATION + NEWS_PAGINATION;

  return (
    <Container className="page page-home">
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Row>
        <Col lg={8}>
          <FadeIn>
            {map(slice(news, newsPageStart, newsPageEnd), (n, index) => (
              <News key={index} news={n} />
            ))}
            {renderPagination(news, NEWS_PAGINATION, newsPage, setNewsPage)}
          </FadeIn>
        </Col>
        <Col lg={4}>
          {featuredArticle && <ArticleCard article={featuredArticle} withFeatured />}
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    articles: getArticles(state),
    news: getNews(state),
  };
};

export default connect(mapStateToProps)(Home);
