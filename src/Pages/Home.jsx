import About from "../component/About";
import CallToAction from "../component/CallToAction";
import Features from "../component/Features";
import HeroSection from "../component/HeroSection";
import HowWork from "../component/HowWork";
import Navbar from "../component/Navbar";
export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <About/>
      <Features/>
      <HowWork/>
      <CallToAction/>
    </>
  );
}
