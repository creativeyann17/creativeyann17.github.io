import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import cx from 'classnames';
import { ROUTES } from '../constants';
import { renderExternalLinkByUrlAndLabel, renderExternalLinkByUrlAndIcon } from '../utils';

const Footer = ({ className }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cx('footer', className)}>
      <Container className="py-5">
        <Col>
          <Row className="mb-3">
            {renderExternalLinkByUrlAndLabel(ROUTES.EXTERNALS.GITHUB_TOS, 'Terms of use', 'ml-3')}
            {renderExternalLinkByUrlAndLabel(
              ROUTES.EXTERNALS.GITHUB_PRIVACY,
              'Privacy policy',
              'ml-3'
            )}
            {renderExternalLinkByUrlAndIcon(ROUTES.EXTERNALS.GITHUB, '/github128.png', 'ml-3')}
            {renderExternalLinkByUrlAndIcon(ROUTES.EXTERNALS.LINKEDIN, '/linkedin128.png', 'ml-3')}
            {renderExternalLinkByUrlAndIcon(ROUTES.EXTERNALS.TWITTER, '/twitter128.png', 'ml-3')}
          </Row>
          <Row>
            <p className="footer-copyright">© {currentYear} Yann MARCOU</p>
          </Row>
        </Col>
      </Container>
    </footer>
  );
};

export default Footer;
