import { ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import nishreePreview from '../assets/nishree-preview.avif';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';

function ProjectsSection() {
  return (
    <section id="projects" className="section-wrap section-projects">
      <div className="content-width">
        <Reveal className="projects-heading-row">
          <SectionHeading eyebrow="Selected work" title="My recent work" />
          <div className="project-controls" aria-label="Project navigation">
            <span>01 <span className="control-divider">/</span> 01</span>
            <button type="button" aria-label="Previous project" disabled><ChevronLeft size={17} aria-hidden="true" /></button>
            <button type="button" aria-label="Next project" disabled><ChevronRight size={17} aria-hidden="true" /></button>
          </div>
        </Reveal>

        <Reveal>
          <article className="project-card">
            <a
              className="project-preview"
              href="https://nishree.in/"
              target="_blank"
              rel="noreferrer"
              aria-label="Open the Nishree Attire website in a new tab"
            >
              <img src={nishreePreview} alt="Nishree Attire homepage campaign image" width="1280" height="720" loading="lazy" decoding="async" />
              <span className="project-preview-gradient" aria-hidden="true" />
              <span className="project-browser-bar" aria-hidden="true">
                <span className="browser-dots"><i /><i /><i /></span>
                <span className="browser-address">nishree.in</span>
                <ExternalLink size={13} />
              </span>
              <span className="project-preview-label"><span>Nishree Attire</span><span>E-commerce · 01</span></span>
            </a>

            <div className="project-info">
              <p className="eyebrow">E-commerce</p>
              <h3>Nishree Saree Store</h3>
              <p className="project-description">
                A modern e-commerce platform for traditional styles online.
              </p>
              <a className="text-link" href="https://nishree.in/" target="_blank" rel="noreferrer">
                View Project <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

export default ProjectsSection;
