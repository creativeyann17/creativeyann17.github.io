import React from 'react';
import { Container, Row, Jumbotron, Button } from 'react-bootstrap';
import map from 'lodash/map';
import { connect } from 'react-redux';
import { getArticles } from '../services/ArticlesService/selectors';
import ArticleCard from '../components/ArticleCard';
import { ROUTES } from '../constants';

const Home = ({ articles }) => {
  const renderArticle = (article) => <ArticleCard key={article.id} article={article} />;

  const openExternalLink = (link) => {
    window.open(link, '_blank');
  };

  return (
    <Container className="page">
      <Jumbotron>
        <h1>Welcome</h1>
        <p>This web-site is a showcase of technlogies.</p>
        <p>
          <Button variant="primary" onClick={() => openExternalLink(ROUTES.EXTERNALS.GITHUB_PAGE)}>
            Learn more
          </Button>
        </p>
      </Jumbotron>
      <Row>{map(articles, renderArticle)}</Row>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    articles: getArticles(state),
  };
};

export default connect(mapStateToProps)(Home);
