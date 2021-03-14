import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
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
    <Container className="back-to-top">
      <a href="#top">
        <AiOutlineToTop />
      </a>
    </Container>
  );
};

export default BackToTop;
