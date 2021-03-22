import React from 'react';
import { Container, Alert } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const NotFound = ({ articles }) => {
  const location = useLocation();
  return (
    <Container className="page page-not-found ">
      <Helmet>
        <title>404</title>
      </Helmet>
      <Alert variant="warning" className="mt-3">
        <b>Page not found:</b> {location.pathname}
      </Alert>
    </Container>
  );
};

export default NotFound;
