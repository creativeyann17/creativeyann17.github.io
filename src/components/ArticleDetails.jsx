import React from 'react';
import { Badge } from 'react-bootstrap';
import { MdUpdate, MdTimer } from 'react-icons/md';
import { BiGitRepoForked } from 'react-icons/bi';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { renderExternalLinkByUrlAndLabel, isArticleNew } from '../utils';

const ArticleDetails = ({ className, article, margin }) => {
  return (
    <div className={cx('article-details', className)}>
      <div className={margin}>
        <MdUpdate />
        &nbsp;{article.date}
      </div>
      <div className={margin}>
        <BiGitRepoForked />
        &nbsp;{renderExternalLinkByUrlAndLabel(article.repository, 'sources')}
      </div>
      <div className={margin}>
        <MdTimer />
        &nbsp;{`${article.duration} min`}
      </div>
      {isArticleNew(article) && (
        <div className={cx(margin)}>
          <Badge variant="success">new</Badge>
        </div>
      )}
    </div>
  );
};

ArticleDetails.propTypes = {
  margin: PropTypes.string,
};

ArticleDetails.defaultProps = {
  margin: 'mr-3 mb-2',
};

export default ArticleDetails;
