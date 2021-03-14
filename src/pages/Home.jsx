import React from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import map from 'lodash/map';
import { getArticles } from '../services/ArticlesService/selectors';
import ArticleCard from '../components/ArticleCard';

const Home = ({ articles }) => {
  const renderArticle = (article) => <ArticleCard article={article} />;
  return <Container className="page">{map(articles, renderArticle)}</Container>;
};

const mapStateToProps = (state) => {
  return {
    articles: getArticles(state),
  };
};

export default connect(mapStateToProps)(Home);
