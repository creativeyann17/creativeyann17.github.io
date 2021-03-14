import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { ROUTES } from '../constants';
import { externalLink } from '../utils/utils';

const Footer = (props) => {
  const externalIconLink = (path, icon) => (
    <a target="_blank" rel="noreferrer" href={path}>
      <img src={icon} alt={`external-links-to-${path}`} />
    </a>
  );

  const currentYear = new Date().getFullYear();

  return (
    <div className="footer">
      <Container>
        <Row>
          <Col sm={6}>
            <Row>
              <img alt="creativeyann17-logo" src="/logo.png" height="64" />
            </Row>
          </Col>
          <Col sm={6}>
            <Row className="right">
              {externalLink(ROUTES.EXTERNALS.GITHUB_TOS, 'Terms of use')}
              {externalLink(ROUTES.EXTERNALS.GITHUB_PRIVACY, 'Privacy policy')}
              {externalIconLink(ROUTES.EXTERNALS.GITHUB, '/github.png')}
              {externalIconLink(ROUTES.EXTERNALS.LINKEDIN, '/linkedin.png')}
            </Row>
            <Row className="right copyright">
              <span>© {currentYear} Yann MARCOU</span>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
