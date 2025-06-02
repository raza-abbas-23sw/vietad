import React from 'react'
import ProductHero from './hero/ProductHero'
import Products from './Products'
import ImgSlider from './imgSlider/ImgSlider'
import Faq from '../../components/Faq/Faq'
import {faqsData} from "../../assets/allData/faqData/ProductPageFaq.js" 
const ProductsPage = () => {
  return (
    <div>
  {console.log(typeof(faqs))
  }      
      <ProductHero/>
      <Products/>
      <ImgSlider/>
      <Faq faqs={faqsData}/>
      
    </div>
  )
}

export default ProductsPage
