import React from 'react';
import { Col } from 'react-bootstrap';
import { BsGear } from 'react-icons/bs';
import { AiOutlineCode } from 'react-icons/ai';
import { FiDatabase } from 'react-icons/fi';
import { BiMicrochip } from 'react-icons/bi';
import { GiSkills } from 'react-icons/gi';
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
      <p>
        <BiMicrochip />
        <b>Embedded: </b>
        <span>Arduino | Raspberry-pi</span>
      </p>
      <p>
        <GiSkills />
        <b>Extra skills: </b>
        <span>Tech lead | Shopify | Gimp | Blender | Agile methods</span>
      </p>
    </Col>
  );
};

export default Skills;
