import React from 'react';
import { Container, Row, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import map from 'lodash/map';
import { Helmet } from 'react-helmet';
import { getArticles } from '../services/ArticlesService/selectors';
import { findArticlesByFilter, renderArticleInsideColumn } from '../utils';

const Search = ({ articles }) => {
  const { filter } = useParams();
  const articlesFiltered = findArticlesByFilter(articles, filter);
  return (
    <Container className="page page-search">
      <Helmet>
        <title>{filter}</title>
      </Helmet>
      {filter && (
        <Alert variant="light">
          <b>Actual search:</b> {filter} <b>result(s): </b> {articlesFiltered.length}
        </Alert>
      )}
      <Row>{map(articlesFiltered, (article) => renderArticleInsideColumn(article))}</Row>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    articles: getArticles(state),
  };
};

export default connect(mapStateToProps)(Search);
