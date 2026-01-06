import React from 'react';
import { Alert } from 'react-bootstrap';
import cx from 'classnames';
import { MdUpdate } from 'react-icons/md';
import { RiArticleLine } from 'react-icons/ri';

import { renderInternalLinkToArticleId } from '../utils';

const News = ({ className, news }) => {
  return (
    <Alert variant="light" className={cx(className, 'news')}>
      <h5>{news.title}</h5>
      <div className="news-date mb-2">
        <span className="me-3">
          <MdUpdate />
          &nbsp;{news.date}
        </span>
        {news.article && (
          <span>
            <RiArticleLine /> &nbsp;
            {renderInternalLinkToArticleId(news.article)}
          </span>
        )}
      </div>
      {news.description}
    </Alert>
  );
};

export default News;
