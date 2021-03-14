import React from 'react';
import { Container, Row } from 'react-bootstrap';
import map from 'lodash/map';
import { connect } from 'react-redux';
import { getArticles } from '../services/ArticlesService/selectors';
import { ArticleCard } from '../components';

const Articles = ({ articles }) => {
  const renderArticle = (article) => <ArticleCard key={article.id} article={article} />;

  return (
    <Container className="page articles">
      <Row>{map(articles, renderArticle)}</Row>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    articles: getArticles(state),
  };
};

export default connect(mapStateToProps)(Articles);
