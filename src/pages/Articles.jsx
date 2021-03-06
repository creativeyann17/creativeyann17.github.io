import React from 'react';
import { Container, Row } from 'react-bootstrap';
import map from 'lodash/map';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { getArticles } from '../services/ArticlesService/selectors';
import { renderArticleInsideColumn } from '../utils';

const Articles = ({ articles }) => {
  return (
    <Container className="page page-articles ">
      <Helmet>
        <title>Articles</title>
      </Helmet>
      <Row>{map(articles, (article) => renderArticleInsideColumn(article))}</Row>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    articles: getArticles(state),
  };
};

export default connect(mapStateToProps)(Articles);
