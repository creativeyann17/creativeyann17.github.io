import React, {useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import FadeIn from '../components/FadeIn';
import {Alert} from 'react-bootstrap'

const Redirect = ({ url }) => {

    useEffect(() => {
        const timeout = setTimeout(() => {
            // 👇️ redirects to an external URL
            window.location.replace(url);
        }, 3000);

        return () => clearTimeout(timeout);
        }, [url]);

  return (
    <Container className="page">
      <Helmet>
        <title>Redirect</title>
      </Helmet>
      <Row>
        <Col lg={12}>
          <FadeIn>
            <Alert variant='info'>
             Will redirect in 3 seconds ...
            </Alert>
          </FadeIn>
        </Col>
      </Row>
    </Container>
  );
};

export default Redirect;
