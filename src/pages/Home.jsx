import React from 'react';
import { Container, Row, Jumbotron } from 'react-bootstrap';
import map from 'lodash/map';
import { connect } from 'react-redux';
import { getArticles } from '../services/ArticlesService/selectors';
import ArticleCard from '../components/ArticleCard';
import { ROUTES } from '../constants';
import { externalIconLink } from '../utils/utils';

const Home = ({ articles }) => {
  const renderArticle = (article) => <ArticleCard key={article.id} article={article} />;

  return (
    <Container className="page">
      <Jumbotron>
        <h1>Welcome</h1>
        <p>
          This web-site acts as my blog / portfolio / showcase ... somewhere ready to test an idea.
          <li>
            If you want to know more about the technicals you can click on the button below to be
            redirected to the GitHub repository.
          </li>
          <li>If you want to contact me please use the Linkedin link + private message.</li>
        </p>
        <p>
          {externalIconLink(ROUTES.EXTERNALS.GITHUB_PAGE, '/github128.png')}
          {externalIconLink(ROUTES.EXTERNALS.LINKEDIN, '/linkedin128.png')}
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
