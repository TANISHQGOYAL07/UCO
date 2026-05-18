import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Problem from './components/Problem'
import HowItWorks from './components/HowItWorks'
import WhoWeServe from './components/WhoWeServe'
import WhyChooseUs from './components/WhyChooseUs'
import Impact from './components/Impact'
import FAQ from './components/FAQ'
import SchedulePickup from './components/SchedulePickup'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import './index.css'
import './App.css'

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Problem />
      <HowItWorks />
      <WhoWeServe />
      <WhyChooseUs />
      <Impact />
      <FAQ />
      <SchedulePickup />
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
