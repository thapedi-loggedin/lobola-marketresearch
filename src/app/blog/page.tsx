import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { ResearchModalProvider } from "@/components/shared/ResearchModalProvider";
import { BlogSection } from "@/components/sections/BlogSection";

export default function Blog() {
  return (
    <ResearchModalProvider>
      <div className="min-h-screen bg-[var(--lobola-bone)] text-[var(--lobola-text)]">
        <Navbar />
        <main>
          <BlogSection />
        </main>
        <Footer />
      </div>
    </ResearchModalProvider>
  );
}
