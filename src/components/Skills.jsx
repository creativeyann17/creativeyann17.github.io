import React from 'react';
import { AiOutlineCode, AiOutlineCodeSandbox } from 'react-icons/ai';
import { Row, Col } from 'react-bootstrap';
import { FiDatabase } from 'react-icons/fi';
import { BiMicrochip, BiCode } from 'react-icons/bi';
import { GiSkills } from 'react-icons/gi';
import { BsCloud } from 'react-icons/bs';
import { RiTempColdLine } from 'react-icons/ri';
import { SiJavascript } from 'react-icons/si';
import { AiFillFilePdf } from 'react-icons/ai';
import { FaMobileAlt } from 'react-icons/fa';
import cx from 'classnames';
import { ROUTES } from '../constants';
import { renderExternalLinkByUrlAndIcon, renderExternalLinkByUrlAndLabel } from '../utils';

const Skills = ({ className }) => {
  return (
    <Row className={cx(className, 'skills')}>
      <Col sm={6}>
        <p>
          <b>Hello, my name is Yann, french software developer.</b> Until today I have worked on
          several personal/professional projects based on various kind of solutions: web, desktop
          and embedded. I'm currently working abroad at <b>Montreal</b>.
        </p>
        <p>
          This web-site acts as my blog / portfolio / showcase / poc ... or simply somewhere if I
          want to test an idea quickly.
        </p>
        <p>
          {renderExternalLinkByUrlAndIcon(ROUTES.EXTERNALS.GITHUB_PAGE, '/github128.png', 'me-3')}
          The GitHub repository of this web-site and all my others personal projects.
        </p>
        <p>
          {renderExternalLinkByUrlAndIcon(ROUTES.EXTERNALS.LINKED_IN, '/linkedin128.png', 'me-3')}
          If you want to contact me, please use LinkedIn.
        </p>
        <p>
          {renderExternalLinkByUrlAndIcon(ROUTES.EXTERNALS.TWITTER, '/twitter128.png', 'me-3')}
          Follow me on twitter and be notified first about new content.
        </p>
        <p>
          {renderExternalLinkByUrlAndIcon(ROUTES.EXTERNALS.INSTAGRAM, '/instagram128.png', 'me-3')}
          Developers also have pictures to share of their free time :)
        </p>
        <p>
          <AiFillFilePdf />
          <b>CV </b>
          Français {renderExternalLinkByUrlAndLabel('/cv/fr.html', 'HTML')}{' '}
          English {renderExternalLinkByUrlAndLabel('/cv/en.html', 'HTML')}
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
          <span>React.js | GraphQL | Redux | Saga | Jest | Hooks | Bootstrap</span>
        </div>
        <div className="skills-item mb-3">
          <span>
            <AiOutlineCodeSandbox />
            <b>Back-end: </b>
          </span>
          <span>Spring-boot | Micronaut | JUnit | OpenAPI / Swagger</span>
        </div>
        <div className="skills-item mb-3">
          <span>
            <FaMobileAlt />
            <b>Mobile: </b>
          </span>
          <span>React Native | Expo | react-native-paper</span>
        </div>
        <div className="skills-item mb-3">
          <span>
            <BiCode />
            <b>Languages: </b>
          </span>
          <span>Java | Scala / Spark | JS | HTML / CSS / SCSS</span>
        </div>
        <div className="skills-item mb-3">
          <span>
            <AiOutlineCode />
            <b>Tools: </b>{' '}
          </span>
          <span>
            IntelliJ | VSCode | Git | Github | Atlassian | npm | maven | Sbt | bash | Postman
          </span>
        </div>
        <div className="skills-item mb-3">
          <span>
            <FiDatabase />
            <b>Databases: </b>{' '}
          </span>
          <span>MongoDB | PostgreSQL | S3 | ElasticSearch</span>
        </div>
        <div className="skills-item mb-3">
          <span>
            <BsCloud />
            <b>CI / CD / Cloud: </b>{' '}
          </span>
          <span>
            Kubectl | Minikube | Docker / Compose | AWS | OpenShift | Heroku | Google Cloud | GitHub Actions
          </span>
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
            <b>Extra: </b>{' '}
          </span>
          <span>Tech lead | Shopify | Gimp | Blender | Agile methods</span>
        </div>
        <hr />
        <div className="skills-item mb-3">
          <span>
            <RiTempColdLine />
            <b>In need of a refresh: </b>{' '}
          </span>
          <span>C/C++ | C# | Qt | Swing | Neo4j | Play Framework 1.x | Jenkins | Circle-ci</span>
        </div>
      </Col>
    </Row>
  );
};

export default Skills;
