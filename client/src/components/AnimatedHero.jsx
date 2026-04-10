import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import { useNavigate } from 'react-router-dom'

gsap.registerPlugin(TextPlugin)

const AnimatedHero = () => {
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const buttonsRef = useRef(null)
  const backgroundRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const tl = gsap.timeline()

    // Background gradient animation
    tl.to(
      backgroundRef.current,
      {
        backgroundPosition: '200% center',
        duration: 3,
        ease: 'none',
        repeat: -1,
        yoyo: true
      },
      0
    )

    // Title animation
    tl.fromTo(
  titleRef.current,
  { opacity: 0, y: 50 },
  { opacity: 1, y: 0, duration: 0.8, ease: 'back.out' },
  0
)



    // Subtitle animation
    tl.from(
      subtitleRef.current,
      {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'back.out'
      },
      0.2
    )

    // Buttons animation
    const buttons = buttonsRef.current?.children


if (buttons) {
  tl.fromTo(
    Array.from(buttons),
    {
      opacity: 0,
      y: 20
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.15,
      ease: 'back.out'
    },
    0.4
  )
}

    // Floating animation for title
    // gsap.to(titleRef.current, {
    //   y: -2,
    //   duration: 2.5,
    //   repeat: -1,
    //   yoyo: true,
    //   ease: 'sine.inOut'
    // })
  }, [])

  return (
    <div
      ref={backgroundRef}
      className="relative w-full min-h-screen bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 overflow-hidden"
      style={{
        backgroundSize: '200% 100%'
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-32 text-center flex flex-col items-center justify-center min-h-screen">
        <h1
          ref={titleRef}
          className="text-6xl  md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-6 leading-tight"
        >
          Welcome to Devconnect
        </h1>

        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl leading-relaxed"
        >
          A Revolutionary Platform Connecting Developers and Recruiters in Real-Time
        </p>

        <div ref={buttonsRef} className="flex gap-4 justify-center flex-wrap">
         <button  onClick={()=>{
          navigate("/register")
         }}
          className="  relative px-8 py-3 rounded-lg text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 overflow-hidden group">
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          <button  onClick={()=>{
          navigate("/login")
         }}
          className="overflow-hidden relative px-8 py-3 rounded-lg text-lg font-semibold text-white border-2 border-purple-400 hover:bg-purple-400 hover:bg-opacity-10 transition-all duration-300 transform hover:scale-105">
            Login
          </button>
        </div>

        {/* Animated scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <span className="text-gray-400 text-sm">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnimatedHero