import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const AnimatedStats = () => {
  const statsRef = useRef(null)
  const countersRef = useRef([])
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const stats = [
      { number: 5000, label: 'Active Developers', suffix: '+' },
      { number: 1200, label: 'Job Opportunities', suffix: '+' },
      { number: 98, label: 'Success Rate', suffix: '%' },
      { number: 50, label: 'Partner Companies', suffix: '+' }
    ]

    ScrollTrigger.create({
      trigger: statsRef.current,
      onEnter: () => {
        if (!hasAnimated) {
          countersRef.current.forEach((counter, index) => {
            const stat = stats[index]
            gsap.to(counter, {
              textContent: stat.number,
              duration: 2,
              ease: 'power2.out',
              snap: { textContent: 1 },
              onUpdate: function () {
                counter.textContent = Math.ceil(this.targets()[0].textContent)
              }
            })
          })
          setHasAnimated(true)
        }
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [hasAnimated])

  const stats = [
    { number: 5000, label: 'Active Developers', suffix: '+' },
    { number: 1200, label: 'Job Opportunities', suffix: '+' },
    { number: 98, label: 'Success Rate', suffix: '%' },
    { number: 50, label: 'Partner Companies', suffix: '+' }
  ]

  return (
    <section ref={statsRef} className="relative py-20 bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="mb-4 p-4 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm">
                <div
                  ref={(el) => (countersRef.current[index] = el)}
                  className="text-5xl md:text-6xl font-bold text-white"
                >
                  0
                </div>
                <span className="text-3xl font-bold text-white ml-1">{stat.suffix}</span>
              </div>
              <p className="text-lg text-white font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AnimatedStats