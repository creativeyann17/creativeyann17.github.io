import React from 'react';
import { Container, Row, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import includes from 'lodash/includes';
import _filter from 'lodash/filter';
import map from 'lodash/map';
import { Col } from 'react-bootstrap';
import { getArticles } from '../services/ArticlesService/selectors';
import ArticleCard from '../components/ArticleCard';

const Search = ({ articles }) => {
  const { filter } = useParams();
  const articlesFiltered = _filter(articles, (article) => {
    return includes(article.tags, filter);
  });
  const renderArticle = (article) => (
    <Col md={4} lg={3} key={article.id}>
      <ArticleCard key={article.id} article={article} />
    </Col>
  );
  return (
    <Container className="page page-search">
      {filter && (
        <Alert variant="secondary">
          <b>Actual search:</b> {filter} <b>result(s): </b> {articlesFiltered.length}
        </Alert>
      )}
      <Row>{map(articlesFiltered, renderArticle)}</Row>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    articles: getArticles(state),
  };
};

export default connect(mapStateToProps)(Search);
