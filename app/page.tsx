import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
