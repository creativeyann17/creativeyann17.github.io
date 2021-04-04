import React from 'react';
import { connect } from 'react-redux';
import { Badge } from 'react-bootstrap';
import { MdUpdate, MdTimer } from 'react-icons/md';
import { BiGitRepoForked } from 'react-icons/bi';
import { AiOutlineEye, AiFillLike, AiOutlineLike } from 'react-icons/ai';
import get from 'lodash/get';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { getViews, getLikes, getLiked } from '../services/ArticlesService/selectors';
import { articlesLikesIncRequest } from '../services/ArticlesService/actions';
import { renderExternalLinkByUrlAndLabel, isArticleNew } from '../utils';

const ArticleDetails = ({
  className,
  article,
  views,
  likes,
  liked,
  showViews,
  showLikes,
  margin,
  incLikes,
}) => {
  const view = showViews ? get(views, article.id, '...') : null;
  const like = showLikes ? get(likes, article.id, '...') : null;

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
      {showViews && (
        <div className={margin}>
          <AiOutlineEye />
          &nbsp;{view}
        </div>
      )}
      {showLikes && (
        <div className={margin}>
          {get(liked, article.id, false) ? (
            <AiFillLike />
          ) : (
            <AiOutlineLike onClick={(e) => incLikes(article.id)} role="button" />
          )}
          &nbsp;{like}
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
  showViews: PropTypes.bool,
  showLikes: PropTypes.bool,
};

ArticleDetails.defaultProps = {
  margin: 'mr-3 mb-2',
  showViews: false,
  showLikes: false,
};

const mapStateToProps = (state) => {
  return {
    views: getViews(state),
    likes: getLikes(state),
    liked: getLiked(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    incLikes: (article) => dispatch(articlesLikesIncRequest(article)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetails);
