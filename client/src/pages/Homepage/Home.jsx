import React from "react";
import HeroSection from "./HeroSection"; 
import CustomSignSection from "./CustomSignSection";
import TrendySlider from "./TrendySlider";
import CommercialSignsSection from "./CommercialSignsSection";
import TestimonialSlider from "./TestimonialSlider";
import DesignSteps from "./DesignSteps";
import ImageTextScroller from "./ImageTextScroller/ImageTextScroller";
import TrustedBy from "./TrustedBy";
import GetStartedSection from "./GetStarted/GetStartedSection";
const Home = () => {
  return (
    <div>
      <HeroSection />
      <CustomSignSection />
      <TrendySlider />
      <CommercialSignsSection />
      <TestimonialSlider />
      <DesignSteps />
      <TrustedBy />
      <ImageTextScroller />
      <GetStartedSection />
    </div>
  );
};

export default Home;
