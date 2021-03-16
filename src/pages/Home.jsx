import React from 'react';
import { Container, Row, Jumbotron, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getArticles } from '../services/ArticlesService/selectors';
import { ArticleCard, Skills } from '../components';
import { ROUTES } from '../constants';
import { renderExternalLinkByUrlAndIcon, findFeaturedArticle } from '../utils';

const Home = ({ articles }) => {
  const featuredArticle = findFeaturedArticle(articles);
  return (
    <Container className="page page-home">
      <Row>
        <Col lg={8}>
          <Jumbotron>
            <p>
              <b>Hello</b>, my name is Yann, French software developer. Until today I have worked on
              several personal/professional projects based on various kind of solutions: web,
              desktop and embedded. Differents technologies were used like JAVA,
              JavaScript/HTML/CSS, C#, C/C++. I'm currently working abroad at <u>Montreal</u>.
            </p>
            <p>
              This web-site acts as my blog / portfolio / showcase / poc ... or simply somewhere if
              I want to test an idea quickly.
            </p>
            <p>
              {renderExternalLinkByUrlAndIcon(
                ROUTES.EXTERNALS.GITHUB_PAGE,
                '/github128.png',
                'mr-3'
              )}
              The GitHub repository of this web-site and all my others personnal projects.
            </p>
            <p>
              {renderExternalLinkByUrlAndIcon(
                ROUTES.EXTERNALS.LINKEDIN,
                '/linkedin128.png',
                'mr-3'
              )}
              If you want to contact me, please use LinkedIn.
            </p>
            <p>
              {renderExternalLinkByUrlAndIcon(ROUTES.EXTERNALS.TWITTER, '/twitter128.png', 'mr-3')}
              Follow me on twitter and be notified first about new content.
            </p>
            <p>
              Summary list of my <b>skills</b> and <b>knowledge</b>:
            </p>
            <Skills className="my-3" />
            <p>
              <b>Have a nice day :&#41;</b>
            </p>
          </Jumbotron>
        </Col>
        <Col lg={4}>{featuredArticle && <ArticleCard article={featuredArticle} />}</Col>
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
