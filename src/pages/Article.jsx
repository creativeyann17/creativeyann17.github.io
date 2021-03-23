import React, { useState, useEffect } from 'react';
import { Container, Spinner, Alert, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import find from 'lodash/find';
import { Helmet } from 'react-helmet';
import FadeIn from 'react-fade-in';
import replace from 'lodash/replace';
import { TableOfContents } from '../components';
import { articlesSetSelected } from '../services/ArticlesService/actions';
import { getArticles } from '../services/ArticlesService/selectors';
import { Markdown, ArticleDetails, SocialIcons } from '../components';
import { ARTICLES_FOLDER, THUMBNAILS_FOLDER, GLOBAL_REQUEST_TIMEOUT } from '../constants';

const Article = ({ articles, setSelectedArticle }) => {
  const { id } = useParams();
  const [state, setState] = useState({ timeout: false });

  const article = find(articles, (article) => article.id.toString() === id); // number != string

  useEffect(() => {
    let timeoutTimer = setTimeout(
      () => setState({ ...state, timeout: true }),
      GLOBAL_REQUEST_TIMEOUT * 1000
    );

    if (article && state.timeout === false) {
      setSelectedArticle(article.id);
    }

    return () => {
      clearTimeout(timeoutTimer);
    };
  });

  const thumbnailUrl = article ? `${THUMBNAILS_FOLDER}/${article.thumbnail}` : '';

  return (
    <Container className="page page-article">
      {!article ? (
        <div>
          {state.timeout ? (
            <Alert variant="warning">
              <b>Article not found:</b> {id}
            </Alert>
          ) : (
            <Alert variant="light">
              <b>Looking for article:</b> {id} <Spinner animation="border" size="sm" />
            </Alert>
          )}
        </div>
      ) : (
        <div>
          <Helmet>
            <title>{replace(article.id, new RegExp('-', 'g'), ' ')}</title>
            <meta name="image" property="og:image" content={thumbnailUrl} />
            <meta name="description" property="og:description" content={article.description} />
          </Helmet>
          <Row>
            <Col lg={3}>
              <FadeIn>
                <img
                  className="mb-3"
                  alt={article.thumbnail}
                  src={thumbnailUrl}
                  width={'100%'}
                  height={'auto'}
                />
                <div className="d-flex justify-content-between ">
                  <ArticleDetails article={article} />
                  <SocialIcons article={article} />
                </div>
              </FadeIn>
              <TableOfContents />
            </Col>
            <Col lg={9}>{<Markdown source={`${ARTICLES_FOLDER}/${article.markdown}`} />}</Col>
          </Row>
        </div>
      )}
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    articles: getArticles(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedArticle: (article) => dispatch(articlesSetSelected(article)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);
