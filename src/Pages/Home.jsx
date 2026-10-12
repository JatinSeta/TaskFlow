
import About from "../component/About";
import CallToAction from "../component/CallToAction";
import Features from "../component/Features";
import Footer from "../component/Footer.jsx";
import HeroSection from "../component/HeroSection";
import HowWeWork from "../component/HowWeWork";
import Navbar from "../component/Navbar";
export default function Home() {
  return (
    <div className="">
      <Navbar/>
      <HeroSection />
      <About/>
      <Features/>
      <HowWeWork/>
      <CallToAction/>
      <Footer/>
    </div>
  );
}
