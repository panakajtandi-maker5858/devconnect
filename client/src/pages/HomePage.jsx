import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import AnimatedHero from '../components/AnimatedHero'
import Scene3D from '../components/3DScene'
import AnimatedFeatures from '../components/AnimatedFeatures'
import AnimatedStats from '../components/AnimatedStats'
import AnimatedCTA from '../components/AnimatedCTA'

const HomePage = () => {
  const user = useAuth()

  return (
    <>
      {/* Animated Hero Section */}
      <AnimatedHero />

      {/* 3D Scene Section */}
      <section className="relative py-20 bg-gradient-to-b from-slate-900 to-slate-800 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
              Experience 3D Innovation
            </h2>
            <p className="text-gray-400 text-lg">
              Immerse yourself in our cutting-edge 3D environment
            </p>
          </div>
          <Scene3D />
        </div>
      </section>

      {/* Animated Features Section */}
      <AnimatedFeatures />

      {/* Animated Stats Section */}
      <AnimatedStats />

      {/* Animated CTA Section */}
      <AnimatedCTA />

      {/* Footer Section */}
      <footer className="relative bg-slate-950 text-gray-400 py-12 border-t border-slate-700">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold mb-4">Devconnect</h3>
              <p className="text-sm">Connecting developers with opportunities worldwide.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Product</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-sm">
            <p>&copy; 2024 Devconnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default HomePage