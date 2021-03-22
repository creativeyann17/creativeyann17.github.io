import React from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import FadeIn from 'react-fade-in';
import { Skills } from '../components';
import { getArticles } from '../services/ArticlesService/selectors';

const About = () => {
  return (
    <Container className="page page-about">
      <Helmet>
        <title>About</title>
      </Helmet>
      <FadeIn>
        <Skills />
      </FadeIn>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    articles: getArticles(state),
  };
};

export default connect(mapStateToProps)(About);
