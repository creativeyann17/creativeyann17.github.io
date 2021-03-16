import React from 'react';
import { Badge } from 'react-bootstrap';
import { MdUpdate, MdTimer } from 'react-icons/md';
import { BiGitRepoForked } from 'react-icons/bi';
import cx from 'classnames';
import { renderExternalLinkByUrlAndLabel, isArticleNew } from '../utils';

const ArticleDetails = ({ className, article }) => {
  return (
    <div className={cx('article-details', className, 'mb-3')}>
      <div className="article-details-attribute mr-2">
        <MdUpdate />
        &nbsp;{article.date}
      </div>
      <div className="article-details-attribute mr-2">
        <BiGitRepoForked />
        &nbsp;{renderExternalLinkByUrlAndLabel(article.repository, 'sources')}
      </div>
      <div className="article-details-attribute mr-2">
        <MdTimer />
        &nbsp;{`${article.duration} min`}
      </div>
      {isArticleNew(article) && (
        <div className="article-details-attribute">
          &nbsp;<Badge variant="success">new</Badge>
        </div>
      )}
    </div>
  );
};

export default ArticleDetails;
