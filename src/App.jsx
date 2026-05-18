import React from 'react'
import { Routes, Route } from 'react-router-dom'
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
import AdminDashboard from './admin/AdminDashboard'
import './index.css'
import './App.css'

function LandingPage() {
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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin/*" element={<AdminDashboard />} />
    </Routes>
  )
}
