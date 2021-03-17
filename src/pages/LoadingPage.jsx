import React from 'react';
import { Container } from 'react-bootstrap';
import { Loading } from '../components';

const LoadingPage = () => {
  return (
    <Container className="page page-loading d-flex">
      <Loading />
    </Container>
  );
};

export default LoadingPage;
