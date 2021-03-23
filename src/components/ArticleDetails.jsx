import React from 'react';
import { connect } from 'react-redux';
import { Badge } from 'react-bootstrap';
import { MdUpdate, MdTimer } from 'react-icons/md';
import { BiGitRepoForked } from 'react-icons/bi';
import { AiOutlineEye } from 'react-icons/ai';
import get from 'lodash/get';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { getViews } from '../services/ArticlesService/selectors';
import { renderExternalLinkByUrlAndLabel, isArticleNew } from '../utils';

const ArticleDetails = ({ className, article, views, margin }) => {
  const view = get(views, article.id);

  return (
    <div className={cx('article-details', className)}>
      <div className={margin}>
        <MdUpdate />
        &nbsp;{article.date}
      </div>
      {article.repository && (
        <div className={margin}>
          <BiGitRepoForked />
          &nbsp;{renderExternalLinkByUrlAndLabel(article.repository, 'sources')}
        </div>
      )}
      <div className={margin}>
        <MdTimer />
        &nbsp;{`${article.duration} min`}
      </div>
      {view > 0 && (
        <div className={margin}>
          <AiOutlineEye />
          &nbsp;{view}
        </div>
      )}
      {isArticleNew(article) && (
        <div className={cx(margin)}>
          <Badge variant="success" className="article-details-badge-new">
            new
          </Badge>
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

const mapStateToProps = (state) => {
  return {
    views: getViews(state),
  };
};

export default connect(mapStateToProps)(ArticleDetails);
