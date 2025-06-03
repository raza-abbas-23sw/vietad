import React from 'react'
import ProductHero from './ProductHero.jsx'
import Products from './Products'
import ImageTextScroller from '../../components/imgTextSlider/ImageTextScroller.jsx'
import {scrollerData} from "../../assets/allData/productPageData/imgTextSlider.js"
import Faq from '../../components/Faq/Faq'
import {faqsData} from "../../components/Faq/ProductPageFaq.js" 
const ProductsPage = () => {
  return (
    <div>
  {console.log(typeof(faqs))
  }      
      <ProductHero/>
      <Products/>
      <ImageTextScroller scrollerData={scrollerData}/>
      <Faq faqs={faqsData}/>
      
    </div>
  )
}

export default ProductsPage
