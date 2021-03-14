import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import find from 'lodash/find';
import { getArticles } from '../services/ArticlesService/selectors';
import Markdown from '../components/Markdown';
import ArticleDetails from '../components/ArticleDetails';
import SocialIcons from '../components/SocialIcons';
import { ARTICLES_FOLDER, THUMBAILS_FOLDER } from '../constants';

const Article = ({ articles }) => {
  const { id } = useParams();
  const article = find(articles, (article) => article.id.toString() === id); // number != string

  if (!article) return <div></div>;

  return (
    <Container className="page">
      <Row>
        <Col sm={12}>
          <h1>{article.description}</h1>
          <div className="space-between">
            <ArticleDetails article={article} />
            <SocialIcons article={article} />
          </div>
          <img
            className="title"
            alt=""
            src={`${THUMBAILS_FOLDER}/${article.thumbnail}`}
            width={'100%'}
          />
          {<Markdown source={`${ARTICLES_FOLDER}/${article.markdown}`} />}
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    articles: getArticles(state),
  };
};

export default connect(mapStateToProps)(Article);
