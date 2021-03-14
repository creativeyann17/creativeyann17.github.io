import React from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const Search = (props) => {
  const { id } = useParams();
  return <Container className="page">{id}</Container>;
};

export default Search;
