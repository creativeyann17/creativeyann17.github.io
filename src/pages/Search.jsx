import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import includes from 'lodash/includes';
import _filter from 'lodash/filter';
import map from 'lodash/map';
import { getArticles } from '../services/ArticlesService/selectors';
import ArticleCard from '../components/ArticleCard';

const Search = ({ articles, setArticlesFilter }) => {
  const { filter } = useParams();
  const articlesFiltered = _filter(articles, (article) => {
    return includes(article.tags, filter);
  });
  const renderArticle = (article) => <ArticleCard key={article.id} article={article} />;
  return (
    <Container className="page">
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
