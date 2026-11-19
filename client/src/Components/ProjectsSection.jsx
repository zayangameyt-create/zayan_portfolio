import { ArrowUpRight, ShoppingBag } from 'lucide-react';

function ProjectsSection() {
  return (
    <section id="projects" className="projects">
      <div className="section-title"><h1>My Projects</h1></div>

      <article className="project-card">
        <a
          className="project-preview"
          href="https://nishree.in/"
          target="_blank"
          rel="noreferrer"
          aria-label="Open Nishree saree e-commerce website"
        >
          <div className="project-preview-top">
            <span>ECOMMERCE / 01</span>
            <ShoppingBag size={20} aria-hidden="true" />
          </div>
          <div className="project-preview-brand">
            <span className="project-brand-mark">N</span>
            <p>Nishree</p>
            <span>Saree E-commerce</span>
          </div>
          <div className="project-preview-bottom">
            <span>Online Store</span>
            <span>nishree.in</span>
          </div>
        </a>

        <div className="project-info">
          <p className="project-kicker">Live Project / E-commerce</p>
          <h2>Nishree Saree Store</h2>
          <p className="project-description">
            A saree e-commerce website focused on browsing and shopping traditional styles online.
          </p>
          <a className="project-link" href="https://nishree.in/" target="_blank" rel="noreferrer">
            Visit Nishree.in <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      </article>
    </section>
  );
}

export default ProjectsSection;
