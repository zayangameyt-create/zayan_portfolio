import { m, useReducedMotion } from 'framer-motion';
import aboutImage from '../assets/about_image.png';

function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <m.section
      id="home"
      className="hero"
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.05 }}
    >
      <img className="hero-avatar" src={aboutImage} alt="Sanjeev's portrait" width="1024" height="1024" />
      <h1><span>I&apos;m Sanjeev,</span> Fullstack Developer based in India.</h1>
      <p>
        I&apos;m a Fullstack developer based in Tamil Nadu, India, with a strong passion for building modern, user-centric web applications. I&apos;m at the beginning of my professional journey, eager to learn and grow.
      </p>
      <div className="hero-actions">
        <a className="hero-connect" href="#contact">Connect With Me</a>
        <a className="hero-more" href="#about">More About Me</a>
      </div>
    </m.section>
  );
}

export default HeroSection;
