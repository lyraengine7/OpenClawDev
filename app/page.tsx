import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { FeaturedWork } from "@/components/FeaturedWork";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <FeaturedWork />
      <Footer />
    </main>
  );
}
