// https://react-social-media-buttons.vercel.app/

import React from 'react';
import SocialMediaButtons from 'react-social-media-buttons';
import cx from 'classnames';
import { getArticleUrl } from '../utils';

const SocialIcons = ({ className, article }) => {
  const url = getArticleUrl(article);
  return (
    <SocialMediaButtons
      className={cx('social-icons', className)}
      links={[
        'https://www.facebook.com/sharer.php?u=' + url,
        'https://twitter.com/home', // TODO
        'https://www.instagram.com/instagram/', // TODO
        'https://www.linkedin.com/shareArticle?mini=true&url=' + url,
      ]}
      buttonStyle={{
        width: '25px',
        height: '25px',
        margin: '0px 10px',
        backgroundColor: '#4682b4',
        borderRadius: '50%',
      }}
      iconStyle={{ color: '#ffffff' }}
      openNewTab={true}
    />
  );
};

export default SocialIcons;
