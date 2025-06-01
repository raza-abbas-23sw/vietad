import React from "react";
import HeroSection from "./HeroSection"; // Make sure the path is correct based on your folder structure
import CustomSignSection from "./CustomSignSection";
import TrendySlider from "./TrendySlider";
import CommercialSignsSection from "./CommercialSignsSection";
import TestimonialSlider from "./TestimonialSlider";
import DesignSteps from "./DesignSteps";
import { sectionData } from "../../assets/teamslider/sectionData"; 
     import ScrollSection from './ScrollSection'; // update path if different
import ImageTextScroller from './ImageTextScroller/ImageTextScroller';
import TrustedBy from './TrustedBy'
import GetStartedSection from './GetStarted/GetStartedSection'
import Footer from "../../components/Footer/Footer";
const Home = () => {
  return (
    <div>
      <HeroSection />
      <CustomSignSection />
      <TrendySlider />
      <CommercialSignsSection/>
      <TestimonialSlider/>
      <DesignSteps/>
      <TrustedBy/>
      <ImageTextScroller />
      <GetStartedSection />
    </div>
  );
};

export default Home;
