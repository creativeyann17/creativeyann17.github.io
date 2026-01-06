import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import cx from 'classnames';
import { ROUTES } from '../constants';
import { renderExternalLinkByUrlAndLabel, renderExternalLinkByUrlAndIcon } from '../utils';

const Footer = ({ className }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cx('footer', className)}>
      <Container className="py-5">
        <Row className="g-0 justify-content-end align-items-center">
          <Col xs="auto" className="mb-3 px-3">
            {renderExternalLinkByUrlAndLabel(ROUTES.EXTERNALS.GITHUB_TOS, 'Terms of use', 'me-3')}
            {renderExternalLinkByUrlAndLabel(ROUTES.EXTERNALS.GITHUB_PRIVACY, 'Privacy policy')}
          </Col>
          <Col xs="auto" className="mb-3">
            {renderExternalLinkByUrlAndIcon(ROUTES.EXTERNALS.GITHUB, '/github128.png', 'me-3')}
            {renderExternalLinkByUrlAndIcon(ROUTES.EXTERNALS.LINKED_IN, '/linkedin128.png', 'me-3')}
            {renderExternalLinkByUrlAndIcon(ROUTES.EXTERNALS.TWITTER, '/twitter128.png', 'me-3')}
            {renderExternalLinkByUrlAndIcon(ROUTES.EXTERNALS.INSTAGRAM, '/instagram128.png')}
          </Col>
        </Row>
        <Row className="g-0 justify-content-end align-items-center">
          <Col xs="auto">
            <p className="footer-copyright">© {currentYear} CreativeYann17</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
