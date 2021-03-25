import React from 'react';
import { AiOutlineCode, AiOutlineCodeSandbox } from 'react-icons/ai';
import { Row, Col } from 'react-bootstrap';
import { FiDatabase } from 'react-icons/fi';
import { BiMicrochip, BiCode } from 'react-icons/bi';
import { GiSkills } from 'react-icons/gi';
import { BsCloud } from 'react-icons/bs';
import { RiTempColdLine } from 'react-icons/ri';
import { SiJavascript } from 'react-icons/si';
import cx from 'classnames';
import { ROUTES } from '../constants';
import { renderExternalLinkByUrlAndIcon } from '../utils';

const Skills = ({ className }) => {
  return (
    <Row className={cx(className, 'skills')}>
      <Col sm={6}>
        <p>
          <b>Hello, my name is Yann, French software developer.</b> Until today I have worked on
          several personal/professional projects based on various kind of solutions: web, desktop
          and embedded. Different technologies were used like JAVA, JavaScript/HTML/CSS, C#, C/C++.
          I'm currently working abroad at <b>Montreal</b>.
        </p>
        <p>
          This web-site acts as my blog / portfolio / showcase / poc ... or simply somewhere if I
          want to test an idea quickly.
        </p>
        <p>
          {renderExternalLinkByUrlAndIcon(ROUTES.EXTERNALS.GITHUB_PAGE, '/github128.png', 'mr-3')}
          The GitHub repository of this web-site and all my others personal projects.
        </p>
        <p>
          {renderExternalLinkByUrlAndIcon(ROUTES.EXTERNALS.LINKED_IN, '/linkedin128.png', 'mr-3')}
          If you want to contact me, please use LinkedIn.
        </p>
        <p>
          {renderExternalLinkByUrlAndIcon(ROUTES.EXTERNALS.TWITTER, '/twitter128.png', 'mr-3')}
          Follow me on twitter and be notified first about new content.
        </p>
        <p>
          <b>Have a nice day :&#41;</b>
        </p>
      </Col>
      <Col sm={6}>
        <p>
          Summary list of my <b>skills</b> and <b>knowledge</b>:
        </p>
        <div className="skills-item mb-3">
          <span>
            <SiJavascript />
            <b>Front-end: </b>
          </span>
          <span>React.js | GraphQl | Redux | Saga | Hooks | Bootstrap</span>
        </div>
        <div className="skills-item mb-3">
          <span>
            <AiOutlineCodeSandbox />
            <b>Back-end: </b>
          </span>
          <span>Spring-boot | Micronaut | OpenAPI/Swagger</span>
        </div>
        <div className="skills-item mb-3">
          <span>
            <BiCode />
            <b>Languages: </b>
          </span>
          <span>Java | JavaScript | HTML/CSS/SCSS</span>
        </div>
        <div className="skills-item mb-3">
          <span>
            <AiOutlineCode />
            <b>Tools: </b>{' '}
          </span>
          <span>IntelliJ | VSCode | Github | Atlassian | npm | yarn | maven | bash</span>
        </div>
        <div className="skills-item mb-3">
          <span>
            <FiDatabase />
            <b>Databases: </b>{' '}
          </span>
          <span>MongoDB | H2 | PostgreSQL | Oracle</span>
        </div>
        <div className="skills-item mb-3">
          <span>
            <BsCloud />
            <b>CI / CD / Cloud: </b>{' '}
          </span>
          <span>Jenkins | Circle-ci | OpenShift | Heroku</span>
        </div>
        <div className="skills-item mb-3">
          <span>
            <BiMicrochip />
            <b>Embedded: </b>{' '}
          </span>
          <span>Arduino | Raspberry-pi</span>
        </div>
        <div className="skills-item mb-3">
          <span>
            <GiSkills />
            <b>Extra skills: </b>{' '}
          </span>
          <span>Tech lead | Shopify | Gimp | Blender | Agile methods</span>
        </div>
        <hr />
        <div className="skills-item mb-3">
          <span>
            <RiTempColdLine />
            <b>In need of a refresh: </b>{' '}
          </span>
          <span>C/C++ | C# | Qt | Swing | Neo4j | Play Framework 1.x</span>
        </div>
      </Col>
    </Row>
  );
};

export default Skills;
