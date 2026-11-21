import SectionHeading from './SectionHeading.jsx';
import Reveal from './Reveal.jsx';
import css3Icon from '../assets/tech/css3.svg';
import expressIcon from '../assets/tech/express.svg';
import html5Icon from '../assets/tech/html5.svg';
import javascriptIcon from '../assets/tech/javascript.svg';
import mongodbIcon from '../assets/tech/mongodb.svg';
import nodeIcon from '../assets/tech/nodejs.svg';
import pythonIcon from '../assets/tech/python.svg';
import reactIcon from '../assets/tech/react.svg';
import machineLearningIcon from '../assets/tech/machine-learning.svg';
import deepLearningIcon from '../assets/tech/deep-learning.svg';
import cIcon from '../assets/tech/c.svg';

const technologies = [
  { name: 'HTML5', icon: html5Icon },
  { name: 'CSS3', icon: css3Icon },
  { name: 'JavaScript', icon: javascriptIcon },
  { name: 'React.js', icon: reactIcon },
  { name: 'Node.js', icon: nodeIcon },
  { name: 'Express.js', icon: expressIcon },
  { name: 'MongoDB', icon: mongodbIcon },
  { name: 'Python', icon: pythonIcon },
  { name: 'Machine Learning', icon: machineLearningIcon },
  { name: 'Deep Learning', icon: deepLearningIcon },
  { name: 'C', icon: cIcon },
];

function TechStackSection() {
  return (
    <section id="skills" className="section-wrap section-skills">
      <div className="content-width">
        <Reveal>
          <SectionHeading
            eyebrow="Skills"
            title="My tech stack"
            description="Tools I use to build thoughtful, reliable digital experiences."
            align="center"
          />
        </Reveal>
        <ul className="tech-grid" aria-label="Technologies">
          {technologies.map((technology, index) => (
            <Reveal className="tech-item" key={technology.name} delay={index * 0.035}>
              <span className="tech-icon-frame">
                <img src={technology.icon} alt="" width="42" height="42" loading="lazy" decoding="async" />
              </span>
              <span>{technology.name}</span>
            </Reveal>
          ))}
        </ul>
        <Reveal className="skills-note">
          Also familiar with Tailwind CSS, Bootstrap, REST APIs, MySQL, SQL, Git, GitHub, VS Code, Postman, npm, and Vite.
        </Reveal>
      </div>
    </section>
  );
}

export default TechStackSection;
