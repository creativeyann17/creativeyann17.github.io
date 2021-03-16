import React from 'react';
import { Container, Spinner } from 'react-bootstrap';

const LoadingPage = () => {
  return (
    <Container className="page page-loading d-flex">
      <Spinner animation="border" className="mx-auto mb-3" />
    </Container>
  );
};

export default LoadingPage;
