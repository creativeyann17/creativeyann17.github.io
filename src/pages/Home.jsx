import React from 'react';
import { Container } from 'react-bootstrap';
import map from 'lodash/map';
import { connect } from 'react-redux';
import { getArticles } from '../services/ArticlesService/selectors';
import ArticleCard from '../components/ArticleCard';

const Home = ({ articles }) => {
  const renderArticle = (article) => <ArticleCard key={article.id} article={article} />;
  return <Container className="page">{map(articles, renderArticle)}</Container>;
};

const mapStateToProps = (state) => {
  return {
    articles: getArticles(state),
  };
};

export default connect(mapStateToProps)(Home);
