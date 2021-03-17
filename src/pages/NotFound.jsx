import React from 'react';
import { Container, Alert } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const NotFound = ({ articles }) => {
  const location = useLocation();
  return (
    <Container className="page page-not-found ">
      <Alert variant="warning" className="mt-3">
        <b>Page not found:</b> {location.pathname}
      </Alert>
    </Container>
  );
};

export default NotFound;
