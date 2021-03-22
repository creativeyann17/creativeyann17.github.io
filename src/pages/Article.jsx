import React, { useState, useEffect } from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import find from 'lodash/find';
import { Helmet } from 'react-helmet';
import replace from 'lodash/replace';
import { TableOfContents } from '../components';
import { getArticles } from '../services/ArticlesService/selectors';
import { Markdown, ArticleDetails, SocialIcons } from '../components';
import { ARTICLES_FOLDER, THUMBNAILS_FOLDER, GLOBAL_REQUEST_TIMEOUT } from '../constants';

const Article = ({ articles }) => {
  const { id } = useParams();
  const [state, setState] = useState({ timeout: false });

  const article = find(articles, (article) => article.id.toString() === id); // number != string

  useEffect(() => {
    let timeoutTimer = setTimeout(
      () => setState({ ...state, timeout: true }),
      GLOBAL_REQUEST_TIMEOUT * 1000
    );
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
            <Alert variant="secondary">
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
          <TableOfContents />
          {<Markdown source={`${ARTICLES_FOLDER}/${article.markdown}`} />}
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

export default connect(mapStateToProps)(Article);
