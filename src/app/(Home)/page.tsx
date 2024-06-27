import { AboutMe } from "./_components/about-me";
import { HeroSection } from "./_components/hero-section";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center">
      <HeroSection />
      <AboutMe />
    </main>
  );
}
