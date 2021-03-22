import React, { useState, useEffect } from 'react';
import { AiOutlineToTop } from 'react-icons/ai';
import { HashLink } from 'react-router-hash-link';
import cx from 'classnames';
import { BACK_TO_TOP_THRESHOLD } from '../constants';

const BackToTop = ({ className }) => {
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > BACK_TO_TOP_THRESHOLD && !isVisible) {
        setVisible(true);
      }
      if (currentScrollY < BACK_TO_TOP_THRESHOLD && isVisible) {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  // using CSS visibility instead of return null because it doesn't resize the page
  return (
    <div
      className={cx(className, 'back-to-top')}
      style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
      <HashLink to="#top" role="button" aria-label="Go back to top of the page">
        <AiOutlineToTop />
      </HashLink>
    </div>
  );
};

export default BackToTop;
