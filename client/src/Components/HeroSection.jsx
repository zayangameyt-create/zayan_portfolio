import { useRef } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, MapPin, Play, X } from 'lucide-react';
import aboutImage from '../assets/hero image.png';

function HeroSection() {
  const reduceMotion = useReducedMotion();
  const introDialog = useRef(null);

  return (
    <section id="home" className="hero section-wrap">
      <div className="hero-grid content-width">
        <m.div
          className="hero-copy"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.58, delay: 0.1, ease: 'easeOut' }}
        >
          <div className="hero-badge"><span className="status-dot" /> Fullstack Developer</div>
          <h1>Hi, I&apos;m <span>Sanjeev</span></h1>
          <p className="hero-subtitle">Fullstack Developer based in India.</p>
          <p className="hero-description">
            I build modern, user-centric web applications with passion and clean code.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              View My Work <ArrowDownRight size={17} aria-hidden="true" />
            </a>
            <button className="button button-quiet" type="button" onClick={() => introDialog.current?.showModal()}>
              <span className="play-icon"><Play size={12} fill="currentColor" aria-hidden="true" /></span>
              Watch Intro
            </button>
          </div>

          <p className="hero-location"><MapPin size={15} aria-hidden="true" /> Coimbatore, Tamil Nadu</p>
        </m.div>

        <m.div
          className="hero-portrait-wrap"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.97, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.72, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="portrait-glow" aria-hidden="true" />
          <div className="portrait-frame">
            <img
              className="hero-avatar"
              src={aboutImage}
              alt="Portrait of Sanjeev, full-stack developer"
              width="1349"
              height="1166"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </m.div>
      </div>

      <a className="scroll-cue" href="#about" aria-label="Scroll to About Me">
        <span>Scroll to explore</span><span className="scroll-line" />
      </a>

      <dialog
        className="intro-dialog"
        ref={introDialog}
        aria-labelledby="intro-title"
        onCancel={() => introDialog.current?.close()}
        onKeyDown={(event) => {
          if (event.key === 'Escape') introDialog.current?.close();
        }}
      >
        <div className="intro-card">
          <button className="intro-close" type="button" aria-label="Close introduction" onClick={() => introDialog.current?.close()}>
            <X size={19} aria-hidden="true" />
          </button>
          <p className="eyebrow">A quick introduction</p>
          <h2 id="intro-title">Hi, I&apos;m Sanjeev.</h2>
          <p>
            I&apos;m a Fullstack Developer based in Tamil Nadu, India. I enjoy creating modern,
            user-centric web applications and turning ideas into thoughtful digital experiences.
          </p>
          <a className="text-link" href="#about" onClick={() => introDialog.current?.close()}>
            More about me <ArrowDownRight size={16} aria-hidden="true" />
          </a>
        </div>
      </dialog>
    </section>
  );
}

export default HeroSection;
