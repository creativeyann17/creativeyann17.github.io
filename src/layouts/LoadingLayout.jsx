import React from 'react';
import { Container, Spinner, Row } from 'react-bootstrap';

const LoadingLayout = () => {
  return (
    <Container className="page">
      <Row>
        <Spinner animation="border" />
      </Row>
    </Container>
  );
};

export default LoadingLayout;
