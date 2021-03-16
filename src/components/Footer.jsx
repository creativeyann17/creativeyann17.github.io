import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import cx from 'classnames';
import { ROUTES } from '../constants';
import { renderExternalLinkByUrlAndLabel, renderExternalLinkByUrlAndIcon } from '../utils';

const Footer = ({ className }) => {
  const currentYear = new Date().getFullYear();

  return (
    <div className={cx('footer', className)}>
      <Container className="py-5">
        <Col>
          <Row className="mb-3">
            {renderExternalLinkByUrlAndLabel(ROUTES.EXTERNALS.GITHUB_TOS, 'Terms of use')}
            {renderExternalLinkByUrlAndLabel(ROUTES.EXTERNALS.GITHUB_PRIVACY, 'Privacy policy')}
            {renderExternalLinkByUrlAndIcon(ROUTES.EXTERNALS.GITHUB, '/github128.png')}
            {renderExternalLinkByUrlAndIcon(ROUTES.EXTERNALS.LINKEDIN, '/linkedin128.png')}
          </Row>
          <Row>
            <span className="footer-copyright">© {currentYear} Yann MARCOU</span>
          </Row>
        </Col>
      </Container>
    </div>
  );
};

export default Footer;
