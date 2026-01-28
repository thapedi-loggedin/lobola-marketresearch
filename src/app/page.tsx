import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { ResearchModalProvider } from "@/components/shared/ResearchModalProvider";

import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ServicesCarousel } from "@/components/sections/ServicesCarousel";
import { Bundles } from "@/components/sections/Bundles";
import { Languages } from "@/components/sections/Languages";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Legal } from "@/components/sections/Legal";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <ResearchModalProvider>
      <div className="min-h-screen bg-[var(--lobola-bone)] text-[var(--lobola-text)]">
        <Navbar />
        <main>
          <Hero />
          <HowItWorks />
          <ServicesCarousel />
          <Bundles />
          <Languages />
          <WhyChooseUs />
          <Legal />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </ResearchModalProvider>
  );
}
