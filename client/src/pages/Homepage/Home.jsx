import React from "react";
import HeroSection from "./HeroSection"; // Make sure the path is correct based on your folder structure
import CustomSignSection from "./CustomSignSection";
import TrendySlider from "./TrendySlider";
import CommercialSignsSection from "./CommercialSignsSection";
import TestimonialSlider from "./TestimonialSlider";
import DesignSteps from "./DesignSteps";
import ImageTextScroller from "../../components/imgTextSlider/ImageTextScroller";
import {scrollerData} from "../../assets/allData/homePagaData/imgTextSliderData.js"
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
      <ImageTextScroller scrollerData={scrollerData} />
      <GetStartedSection />
    </div>
  );
};

export default Home;
