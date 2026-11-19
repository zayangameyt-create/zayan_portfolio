import aboutImage from '../assets/about_image.png';

const skillGroups = [
  {
    title: 'Frontend Development',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Tailwind CSS', 'Bootstrap', 'Responsive Web Design'],
  },
  {
    title: 'Backend Development',
    skills: ['Node.js', 'Express.js', 'Python', 'REST API'],
  },
  {
    title: 'Database',
    skills: ['MongoDB', 'MySQL', 'SQL'],
  },
  {
    title: 'Programming Languages',
    skills: ['JavaScript', 'Python', 'C'],
  },
  {
    title: 'Tools & Technologies',
    skills: ['Git', 'GitHub', 'VS Code', 'Postman', 'npm', 'Vite'],
  },
];

function AboutSection() {
  return (
    <section id="about" className="about">
      <div className="section-title"><h1>About Me</h1></div>

      <div className="about-section">
        <div className="about-left">
          <img src={aboutImage} alt="Sanjeev, full-stack developer" width="1024" height="1024" loading="lazy" />
        </div>

        <div className="about-right">
          <div className="about-para">
            <p>
              I am a passionate Fullstack Developer with a strong foundation in modern web technologies and a keen eye for detail. While I&apos;m at the beginning of my professional journey, I bring fresh energy, curiosity, and a strong commitment to building responsive, user-friendly interfaces.
            </p>
            <p>
              I&apos;ve worked on personal and academic projects that demonstrate my ability to turn ideas into functional, visually appealing websites. I&apos;m excited to contribute, learn from experienced teams, and grow in frontend and full-stack development.
            </p>
          </div>

          <div className="about-skills">
            <h2>Skills & Technologies</h2>
            <div className="about-skills-grid">
              {skillGroups.map((group) => (
                <article className="about-skill-group" key={group.title}>
                  <h3>{group.title}</h3>
                  <ul className="skill-tags">
                    {group.skills.map((skill) => <li key={skill}>{skill}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="about-achievements">
        <div className="about-achievement"><h2>1+</h2><p>Years of Hands-on Learning</p></div>
        <hr className="achievement-divider" />
        <div className="about-achievement"><h2>10+</h2><p>Projects Completed</p></div>
        <hr className="achievement-divider" />
        <div className="about-achievement"><h2>3+</h2><p>UI Components Designed</p></div>
      </div>
    </section>
  );
}

export default AboutSection;
