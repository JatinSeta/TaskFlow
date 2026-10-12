
import About from "../component/About";
import CallToAction from "../component/CallToAction";
import Features from "../component/Features";
import HeroSection from "../component/HeroSection";
import HowWeWork from "../component/HowWeWork";
import Navbar from "../component/Navbar";
import Footer from '../component/Footer.jsx';
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
