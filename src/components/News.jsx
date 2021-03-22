import React from 'react';
import { Alert } from 'react-bootstrap';
import cx from 'classnames';
import { MdUpdate } from 'react-icons/md';

const News = ({ className, news }) => {
  return (
    <Alert variant="light" className={cx(className, 'news')}>
      <h4>{news.title}</h4>
      <p className="news-date mb-2">
        <MdUpdate />
        &nbsp;{news.date}
      </p>
      {news.description}
    </Alert>
  );
};

export default News;
