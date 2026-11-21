import { ArrowUpRight } from 'lucide-react';
import aboutImage from '../assets/about_image three.png';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';

function AboutSection() {
  return (
    <section id="about" className="section-wrap section-about">
      <div className="content-width">
        <Reveal className="about-layout">
          <figure className="about-visual">
            <div className="about-image-frame">
              <img
                src={aboutImage}
                alt="Sanjeev, full-stack developer"
                width="960"
                height="1080"
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="about-visual-caption">Building with curiosity and care.</figcaption>
          </figure>

          <div className="about-copy">
            <SectionHeading eyebrow="About me" title="Passionate developer building better web" />
            <p className="about-lead">
              I&apos;m a Fullstack Developer based in Tamil Nadu, India, with a strong passion for
              creating modern, scalable web applications.
            </p>
            <p className="about-detail">
              From thoughtful interfaces to reliable backend systems, I enjoy bringing useful ideas
              to life with clean, considered code.
            </p>
            <a className="text-link" href="#skills">
              More About Me <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default AboutSection;
