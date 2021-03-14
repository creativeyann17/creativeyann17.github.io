import React from 'react';
import { Col } from 'react-bootstrap';
import { BsGear } from 'react-icons/bs';
import { AiOutlineCode } from 'react-icons/ai';
import { FiDatabase } from 'react-icons/fi';
import { BsCloud } from 'react-icons/bs';

const Skills = () => {
  return (
    <Col className="skills">
      <p>
        <AiOutlineCode />
        <b>Frameworks: </b>
        <span>Spring-boot | Micronaut | React.js</span>
      </p>
      <p>
        <BsGear />
        <b>Tools: </b>
        <span>Intellij | VSCode | Github | Bitbucket | npm | yarn | maven | bash</span>
      </p>
      <p>
        <FiDatabase />
        <b>Databases: </b>
        <span>MongoDB | Oracle | PostgreSQL | H2 | Neo4j</span>
      </p>
      <p>
        <BsCloud />
        <b>CI / CD / Cloud: </b>
        <span>Jenkins | Circle-ci | Heroku | Openshift</span>
      </p>
    </Col>
  );
};

export default Skills;
