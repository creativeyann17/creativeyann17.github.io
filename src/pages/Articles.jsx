import React from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const Articles = (props) => {
  const { id } = useParams();
  return <Container className="page">{id}</Container>;
};

export default Articles;
