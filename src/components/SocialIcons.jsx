// https://react-social-media-buttons.vercel.app/

import React from 'react';
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  RedditShareButton,
  RedditIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { getArticleUrl } from '../utils';

const SocialIcons = ({ className, article, size, margin }) => {
  const url = getArticleUrl(article);
  return (
    <div className={cx('social-icons', className)}>
      <FacebookShareButton url={url} className={margin}>
        <FacebookIcon size={size} round />
      </FacebookShareButton>
      <LinkedinShareButton url={url} className={margin}>
        <LinkedinIcon size={size} round />
      </LinkedinShareButton>
      <RedditShareButton url={url} className={margin}>
        <RedditIcon size={size} round />
      </RedditShareButton>
      <TwitterShareButton url={url} className={margin}>
        <TwitterIcon size={size} round />
      </TwitterShareButton>
    </div>
  );
};

SocialIcons.propTypes = {
  size: PropTypes.number,
  margin: PropTypes.string,
};

SocialIcons.defaultProps = {
  size: 32,
  margin: 'ml-3 mb-2',
};

export default SocialIcons;
