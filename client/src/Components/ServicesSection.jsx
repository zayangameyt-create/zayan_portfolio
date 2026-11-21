import services from '../data/services.js';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';

function ServicesSection() {
  return (
    <section id="services" className="section-wrap section-services">
      <div className="content-width">
        <Reveal>
          <SectionHeading
            eyebrow="Services"
            title="What I offer"
            description="A considered approach from the first screen to the systems behind it."
          />
        </Reveal>
        <div className="services-grid">
          {services.map(({ title, description, icon: Icon }, index) => (
            <Reveal className="service-card" key={title} delay={index * 0.055}>
              <span className="service-icon"><Icon size={22} strokeWidth={1.7} aria-hidden="true" /></span>
              <span className="service-number">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
