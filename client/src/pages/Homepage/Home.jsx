import React from "react";
import HeroSection from "./HeroSection"; 
import CustomSignSection from "./CustomSignSection";
import TrendySlider from "./TrendySlider";
import CommercialSignsSection from "./CommercialSignsSection";
import TestimonialSlider from "./TestimonialSlider";
import DesignSteps from "./DesignSteps";
import TrustedBy from "./TrustedBy";
import GetStartedSection from "./GetStarted/GetStartedSection";
import ImageTextScroller from "../../components/imgTextSlider/ImageTextScroller";
import {scrollerData} from "../../assets/allData/homePagaData/imgTextSliderData"
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
      <ImageTextScroller scrollerData={scrollerData} />
      <GetStartedSection />
    </div>
  );
};

export default Home;
