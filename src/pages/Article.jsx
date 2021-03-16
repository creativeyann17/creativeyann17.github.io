import React, { useState, useEffect } from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import find from 'lodash/find';
import { getArticles } from '../services/ArticlesService/selectors';
import Markdown from '../components/Markdown';
import ArticleDetails from '../components/ArticleDetails';
import SocialIcons from '../components/SocialIcons';
import { ARTICLES_FOLDER, THUMBAILS_FOLDER, GLOBAL_REQUEST_TIMEOUT } from '../constants';

const Article = ({ articles }) => {
  const { id } = useParams();
  const [state, setstate] = useState({ timeout: false });

  const article = find(articles, (article) => article.id.toString() === id); // number != string

  useEffect(() => {
    let timeoutTimer = setTimeout(
      () => setstate({ ...state, timeout: true }),
      GLOBAL_REQUEST_TIMEOUT * 1000
    );
    return () => {
      clearTimeout(timeoutTimer);
    };
  });

  return (
    <Container className="page page-article">
      {!article ? (
        <div>
          {state.timeout ? (
            <Alert variant="danger">
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
          <img
            className="mb-3"
            alt={article.thumbnail}
            src={`${THUMBAILS_FOLDER}/${article.thumbnail}`}
            width={'100%'}
            height={'auto'}
          />
          <div className="d-flex justify-content-between ">
            <ArticleDetails article={article} />
            <SocialIcons article={article} />
          </div>
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
