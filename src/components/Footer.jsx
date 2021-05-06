import React from 'react';
import { Container, Row } from 'react-bootstrap';
import cx from 'classnames';
import { ROUTES } from '../constants';
import { renderExternalLinkByUrlAndLabel, renderExternalLinkByUrlAndIcon } from '../utils';

const Footer = ({ className }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cx('footer', className)}>
      <Container className="py-5">
        <Row noGutters>
          <div className="mb-3 px-3">
            {renderExternalLinkByUrlAndLabel(ROUTES.EXTERNALS.GITHUB_TOS, 'Terms of use', 'mr-3')}
            {renderExternalLinkByUrlAndLabel(ROUTES.EXTERNALS.GITHUB_PRIVACY, 'Privacy policy')}
          </div>
          <div className="mb-3">
            {renderExternalLinkByUrlAndIcon(ROUTES.EXTERNALS.GITHUB, '/github128.png', 'mr-3')}
            {renderExternalLinkByUrlAndIcon(ROUTES.EXTERNALS.LINKED_IN, '/linkedin128.png', 'mr-3')}
            {renderExternalLinkByUrlAndIcon(ROUTES.EXTERNALS.TWITTER, '/twitter128.png', 'mr-3')}
            {renderExternalLinkByUrlAndIcon(ROUTES.EXTERNALS.INSTAGRAM, '/instagram128.png')}
          </div>
        </Row>
        <Row noGutters>
          <p className="footer-copyright">© {currentYear} CreativeYann17</p>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
