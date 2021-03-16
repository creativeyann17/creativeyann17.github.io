import React from 'react';
import { AiOutlineCode, AiOutlineCodeSandbox } from 'react-icons/ai';
import { FiDatabase } from 'react-icons/fi';
import { BiMicrochip, BiCode } from 'react-icons/bi';
import { GiSkills } from 'react-icons/gi';
import { BsCloud } from 'react-icons/bs';
import cx from 'classnames';

const Skills = ({ className }) => {
  return (
    <div className={cx(className, 'skills')}>
      <div className="skills-item mb-3">
        <span>
          <AiOutlineCodeSandbox />
          <b>Frameworks: </b>
        </span>
        <span>Spring-boot | Micronaut | React.js | Bootstrap | Qt</span>
      </div>
      <div className="skills-item mb-3">
        <span>
          <BiCode />
          <b>Languages: </b>
        </span>
        <span>Java | JavaScript | HTML/CSS | C# | C/C++</span>
      </div>
      <div className="skills-item mb-3">
        <span>
          <AiOutlineCode />
          <b>Tools: </b>{' '}
        </span>
        <span>Intellij | VSCode | Github | Bitbucket | npm | yarn | maven | bash</span>
      </div>
      <div className="skills-item mb-3">
        <span>
          <FiDatabase />
          <b>Databases: </b>{' '}
        </span>
        <span>MongoDB | Oracle | PostgreSQL | H2 | Neo4j</span>
      </div>
      <div className="skills-item mb-3">
        <span>
          <BsCloud />
          <b>CI / CD / Cloud: </b>{' '}
        </span>
        <span>Jenkins | Circle-ci | Heroku | Openshift</span>
      </div>
      <div className="skills-item mb-3">
        <span>
          <BiMicrochip />
          <b>Embedded: </b>{' '}
        </span>
        <span>Arduino | Raspberry-pi | Teensy-usb</span>
      </div>
      <div className="skills-item mb-3">
        <span>
          <GiSkills />
          <b>Extra skills: </b>{' '}
        </span>
        <span>Tech lead | Shopify | Gimp | Blender | Agile methods</span>
      </div>
    </div>
  );
};

export default Skills;
