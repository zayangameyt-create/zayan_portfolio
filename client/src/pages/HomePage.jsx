import Navbar from '../Components/Navbar.jsx';
import HeroSection from '../Components/HeroSection.jsx';
import AboutSection from '../Components/AboutSection.jsx';
import TechStackSection from '../Components/TechStackSection.jsx';
import ServicesSection from '../Components/ServicesSection.jsx';
import ProjectsSection from '../Components/ProjectsSection.jsx';
import ContactSection from '../Components/ContactSection.jsx';
import Footer from '../Components/Footer.jsx';
import ChatWidget from '../Components/ChatWidget.jsx';

function HomePage() {
  return (
    <div className="portfolio-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <TechStackSection />
        <ServicesSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}

export default HomePage;
