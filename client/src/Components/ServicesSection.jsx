import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import services from '../data/services.js';

function ServicesSection() {
  const [activeServiceId, setActiveServiceId] = useState(services[0].id);
  const activeService = services.find((service) => service.id === activeServiceId);

  const toggleService = (serviceId) => {
    setActiveServiceId((currentId) => currentId === serviceId ? null : serviceId);
  };

  return (
    <section id="services" className="services">
      <div className="section-title"><h1>Our Services</h1></div>

      <div className="services-container" role="group" aria-label="Service categories">
        {services.map(({ id, number, title, description, icon: Icon }) => {
          const isActive = activeServiceId === id;

          return (
            <button
              className={`service-category${isActive ? ' active' : ''}`}
              id={`service-category-${id}`}
              type="button"
              key={id}
              aria-expanded={isActive}
              aria-controls={activeServiceId ? 'service-details' : undefined}
              onClick={() => toggleService(id)}
            >
              <span className="service-category-top">
                <span className="service-number">{number}</span>
                <Icon className="service-icon" aria-hidden="true" />
              </span>
              <span className="service-category-title">{title}</span>
              <span className="service-category-description">{description}</span>
              <span className="service-category-action">
                {isActive ? 'Hide services' : 'Explore services'}
                <ChevronDown className={isActive ? 'chevron expanded' : 'chevron'} size={17} aria-hidden="true" />
              </span>
            </button>
          );
        })}
      </div>

      <div id="service-details" hidden={!activeService}>
        {activeService && (
          <div
            className="service-details"
            role="region"
            aria-labelledby={`service-category-${activeService.id}`}
          >
          <div className="service-details-heading">
            <div>
              <p className="service-details-kicker">{activeService.number} / SERVICE DETAILS</p>
              <h2>{activeService.title}</h2>
            </div>
            <p>{activeService.description}</p>
          </div>
          <div className="service-groups">
            {activeService.groups.map((group) => (
              <article className="service-group" key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ServicesSection;
