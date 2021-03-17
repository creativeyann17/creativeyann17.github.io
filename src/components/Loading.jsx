import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = () => {
  return (
    <div className="d-flex w-100 justify-content-center mb-3">
      <Spinner animation="border" />
    </div>
  );
};

export default Loading;
