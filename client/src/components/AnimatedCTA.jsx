import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useNavigate } from 'react-router-dom'


gsap.registerPlugin(ScrollTrigger)

const AnimatedCTA = () => {
  const ctaRef = useRef(null)
  const titleRef = useRef(null)
  const descRef = useRef(null)
  const buttonsRef = useRef(null)
  const navigate = useNavigate()



const bgRef = useRef(null)

useEffect(() => {
  gsap.to(bgRef.current, {
    y: -16,              // 👈 sirf background move
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  })
}, [])

  return (
    <section
      ref={bgRef}
      className="relative py-20 bg-gradient-to-b from-slate-800 to-slate-900 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-20">
        <h2
          ref={titleRef}
          className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-6"
        >
          Ready to Transform Your Career?
        </h2>

        <p
          ref={descRef}
          className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Join thousands of developers and recruiters who are already using Devconnect to find their perfect match. Start your journey today and unlock unlimited opportunities.
        </p>

        <div ref={buttonsRef} className="flex gap-6 justify-center flex-wrap">
          <button   onClick={()=>{
          navigate("/register")
         }}
          className="relative px-10 py-4 rounded-lg text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-110 overflow-hidden group">
            <span className="relative z-10">Join as Developer</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          <button    onClick={()=>{
          navigate("/register")
         }}
           className="relative px-10 py-4 rounded-lg text-lg font-bold text-white bg-gradient-to-r from-pink-600 to-orange-600 hover:shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 transform hover:scale-110 overflow-hidden group">
            <span className="relative z-10">Join as Recruiter</span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* Animated decorative elements */}
        <div className="mt-16 flex justify-center gap-4">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse animation-delay-1000"></div>
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse animation-delay-2000"></div>
        </div>
      </div>
    </section>
  )
}

export default AnimatedCTA