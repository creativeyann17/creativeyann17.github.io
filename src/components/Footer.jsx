import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { ROUTES } from '../constants';
import { externalLink, externalIconLink } from '../utils/utils';

const Footer = (props) => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer">
      <Container>
        <Row>
          <Col sm={12}>
            <Row className="right">
              {externalLink(ROUTES.EXTERNALS.GITHUB_TOS, 'Terms of use')}
              {externalLink(ROUTES.EXTERNALS.GITHUB_PRIVACY, 'Privacy policy')}
              {externalIconLink(ROUTES.EXTERNALS.GITHUB, '/github128.png')}
              {externalIconLink(ROUTES.EXTERNALS.LINKEDIN, '/linkedin128.png')}
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