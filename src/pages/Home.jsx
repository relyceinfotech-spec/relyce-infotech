
import React from 'react'
import Hero from "../components/HeroSection"
import Features from "../components/features"
import Services from '../components/Services'
import ChooseUs from '../components/ChooseUs'
import Product from "../components/SaasProduct"
import Client from "../components/Client"
import "../index.css"

const Home = () => {
  return (
    <div>
      <Hero/>
      <Features/>
      <Client/>
      <Services/>
      <ChooseUs/>
      <Product/>
    </div>
  )
}

export default Home


