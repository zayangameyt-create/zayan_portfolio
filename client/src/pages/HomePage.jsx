import Navbar from '../Components/Navbar.jsx';
import HeroSection from '../Components/HeroSection.jsx';
import AboutSection from '../Components/AboutSection.jsx';
import ServicesSection from '../Components/ServicesSection.jsx';
import ProjectsSection from '../Components/ProjectsSection.jsx';
import ContactSection from '../Components/ContactSection.jsx';
import Footer from '../Components/Footer.jsx';
import ChatWidget from '../Components/ChatWidget.jsx';

function HomePage() {
  return (
    <div className="portfolio-shell">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
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
