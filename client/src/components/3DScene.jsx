import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Box, Torus, PerspectiveCamera, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'

// Animated Sphere Component
const AnimatedSphere = () => {
  const meshRef = useRef(null)

  useEffect(() => {
    if (meshRef.current) {
      gsap.to(meshRef.current.rotation, {
        x: Math.PI * 2,
        y: Math.PI * 2,
        duration: 8,
        repeat: -1,
        ease: 'none'
      })

      gsap.to(meshRef.current.position, {
        y: 0.5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
    }
  }, [])

  return (
    <Sphere ref={meshRef} args={[1, 100, 100]} position={[-3, 0, 0]}>
      <meshStandardMaterial
        color="#00d4ff"
        emissive="#0099cc"
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </Sphere>
  )
}

// Animated Box Component
const AnimatedBox = () => {
  const meshRef = useRef(null)

  useEffect(() => {
    if (meshRef.current) {
      gsap.to(meshRef.current.rotation, {
        x: Math.PI * 2,
        z: Math.PI * 2,
        duration: 6,
        repeat: -1,
        ease: 'none'
      })

      gsap.to(meshRef.current.scale, {
        x: 1.2,
        y: 1.2,
        z: 1.2,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
    }
  }, [])

  return (
    <Box ref={meshRef} args={[1, 1, 1]} position={[0, 0, 0]}>
      <meshStandardMaterial
        color="#ff006e"
        emissive="#ff0066"
        emissiveIntensity={0.4}
        metalness={0.7}
        roughness={0.3}
      />
    </Box>
  )
}

// Animated Torus Component
const AnimatedTorus = () => {
  const meshRef = useRef(null)

  useEffect(() => {
    if (meshRef.current) {
      gsap.to(meshRef.current.rotation, {
        y: Math.PI * 2,
        duration: 5,
        repeat: -1,
        ease: 'none'
      })

      gsap.to(meshRef.current.position, {
        z: 1,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
    }
  }, [])

  return (
    <Torus ref={meshRef} args={[1.5, 0.5, 100, 100]} position={[3, 0, 0]}>
      <meshStandardMaterial
        color="#00ff88"
        emissive="#00cc66"
        emissiveIntensity={0.5}
        metalness={0.6}
        roughness={0.4}
      />
    </Torus>
  )
}

// Particle System Component
const ParticleSystem = () => {
  const pointsRef = useRef(null)

  useEffect(() => {
    if (pointsRef.current) {
      const positions = new Float32Array(300)
      for (let i = 0; i < 300; i += 3) {
        positions[i] = (Math.random() - 0.5) * 10
        positions[i + 1] = (Math.random() - 0.5) * 10
        positions[i + 2] = (Math.random() - 0.5) * 10
      }

      pointsRef.current.geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
      )

      gsap.to(pointsRef.current.rotation, {
        x: Math.PI * 2,
        y: Math.PI * 2,
        duration: 20,
        repeat: -1,
        ease: 'none'
      })
    }
  }, [])

  return (
    <points ref={pointsRef}>
      <bufferGeometry />
      <pointsMaterial size={0.1} color="#00d4ff" sizeAttenuation />
    </points>
  )
}

// Main 3D Scene Component
const Scene3D = () => {
  return (
    <div className="w-full h-96 rounded-lg overflow-hidden shadow-2xl">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00d4ff" />
        
        <AnimatedSphere />
        <AnimatedBox />
        <AnimatedTorus />
        <ParticleSystem />
      </Canvas>
    </div>
  )
}

export default Scene3D