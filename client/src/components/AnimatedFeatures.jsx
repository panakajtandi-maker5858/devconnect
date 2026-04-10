import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const AnimatedFeatures = () => {
  const featuresRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const cards = cardsRef.current
    const handlers = []

    // GSAP animation
//    gsap.fromTo(
//   cards,
//   {
//     opacity: 0,
//     y: 100,
//     rotation: -5
//   },
//   {
//     opacity: 1,
//     y: 0,
//     rotation: 0,
//     stagger: 0.2,
//     duration: 1,
//     scrollTrigger: {
//       trigger: featuresRef.current,
//       start: 'top 85%',
//       toggleActions: 'play none none none', // 👈 important
//       markers: false
//     }
//   }
// )

    // Hover animation
    cards.forEach((card) => {
      if (!card) return

      const handleMouseEnter = () => {
        gsap.to(card, {
          y: -10,
          boxShadow: '0 20px 40px rgba(0, 212, 255, 0.3)',
          duration: 0.3,
          ease: 'power2.out'
        })
      }

      const handleMouseLeave = () => {
        gsap.to(card, {
          y: 0,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
          duration: 0.3,
          ease: 'power2.out'
        })
      }

      card.addEventListener('mouseenter', handleMouseEnter)
      card.addEventListener('mouseleave', handleMouseLeave)

      handlers.push({ card, handleMouseEnter, handleMouseLeave })
    })

    return () => {
      handlers.forEach(({ card, handleMouseEnter, handleMouseLeave }) => {
        if (!card) return
        card.removeEventListener('mouseenter', handleMouseEnter)
        card.removeEventListener('mouseleave', handleMouseLeave)
      })

      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const features = [
    { icon: '🚀', title: 'Fast Matching', description: 'AI-powered algorithm matches developers with perfect job opportunities in seconds' },
    { icon: '🔐', title: 'Secure Platform', description: 'Enterprise-grade security ensures your data and privacy are always protected' },
    { icon: '💼', title: 'Career Growth', description: 'Access exclusive opportunities and grow your career with industry leaders' },
    { icon: '🌍', title: 'Global Network', description: 'Connect with top companies and talented developers from around the world' },
    { icon: '📊', title: 'Analytics Dashboard', description: 'Track your progress with detailed insights and performance metrics' },
    { icon: '⚡', title: 'Real-Time Updates', description: 'Get instant notifications about new opportunities and messages' }
  ]

  return (
    <section ref={featuresRef} className="relative py-20 bg-gradient-to-b from-slate-900 to-slate-800 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
            Powerful Features
          </h2>
          <p className="text-gray-400 text-lg">Everything you need to succeed in your career</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group p-8 rounded-xl bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-600 hover:border-purple-500 transition-all duration-300 cursor-pointer"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AnimatedFeatures