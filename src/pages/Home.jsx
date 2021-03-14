import React from 'react';
import { Container, Row, Jumbotron, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getArticles } from '../services/ArticlesService/selectors';
import { ArticleCard, Skills } from '../components';
import { ROUTES } from '../constants';
import { externalIconLink } from '../utils/utils';

const Home = ({ articles }) => {
  return (
    <Container className="page home">
      <Row>
        <Col lg={8}>
          <Jumbotron>
            <h1>Welcome</h1>
            <br />
            <p>
              This web-site acts as my blog / portfolio / showcase / poc ... somewhere ready to test
              an idea.
              <li>
                If you want to know more about the technicals you can click on the button below to
                be redirected to the GitHub repository.
              </li>
              <li>
                If you want to contact me please use the Linkedin link + private message. <br />
                <br />
                <b>Have a nice day :)</b>
              </li>
            </p>
            <p>
              {externalIconLink(ROUTES.EXTERNALS.GITHUB_PAGE, '/github128.png')}
              {externalIconLink(ROUTES.EXTERNALS.LINKEDIN, '/linkedin128.png')}
            </p>
          </Jumbotron>
        </Col>
        <Col lg={4}>
          {articles && articles[0] && <ArticleCard article={articles[0]} promo={true} />}
        </Col>
      </Row>
      <Row>
        <Skills />
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    articles: getArticles(state),
  };
};

export default connect(mapStateToProps)(Home);
