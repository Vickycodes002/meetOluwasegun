import { About } from "@/components/About";
import { BookCall } from "@/components/BookCall";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { History } from "@/components/History";
import { MotionReel } from "@/components/MotionReel";
import { Nav } from "@/components/Nav";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { WorkList } from "@/components/WorkList";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <WorkList />
        <Services />
        <MotionReel />
        <History />
        <Testimonials />
        <About />
        <BookCall />
      </main>
      <Footer />
    </>
  );
}
