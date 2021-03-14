import React, { useState, useEffect } from 'react';
import { AiOutlineToTop } from 'react-icons/ai';

const BackToTop = (props) => {
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100 && !isVisible) {
        setVisible(true);
      }
      if (currentScrollY < 100 && isVisible) {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="back-to-top">
      <a href="#top">
        <AiOutlineToTop />
      </a>
    </div>
  );
};

export default BackToTop;
