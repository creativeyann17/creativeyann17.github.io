import React from 'react';
import { Alert } from 'react-bootstrap';
import cx from 'classnames';
import { MdUpdate } from 'react-icons/md';

const News = ({ className, news }) => {
  return (
    <Alert variant="light" className={cx(className, 'news')}>
      <h5>{news.title}</h5>
      <p className="news-date mb-2">
        <MdUpdate />
        &nbsp;{news.date}
      </p>
      {news.description}
    </Alert>
  );
};

export default News;
