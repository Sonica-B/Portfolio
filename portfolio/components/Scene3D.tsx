'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Line } from '@react-three/drei'
import * as THREE from 'three'

// Subtle Neural Network Nodes
function NeuralNode({ position, size = 0.05 }: { position: [number, number, number], size?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.15)
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshBasicMaterial color="#00d4ff" transparent opacity={0.4} />
    </mesh>
  )
}

// Neural Network Connection Lines
function NeuralConnection({ start, end }: { start: [number, number, number], end: [number, number, number] }) {
  const points = useMemo(() => [new THREE.Vector3(...start), new THREE.Vector3(...end)], [start, end])

  return (
    <Line
      points={points}
      color="#00d4ff"
      lineWidth={0.5}
      transparent
      opacity={0.15}
    />
  )
}

// Subtle floating neural network structure
function NeuralNetworkLayer() {
  const groupRef = useRef<THREE.Group>(null)
  const { pointer } = useThree()

  // Generate sparse neural network nodes
  const nodes = useMemo(() => {
    const nodePositions: [number, number, number][] = []
    // Create subtle layers
    for (let layer = 0; layer < 4; layer++) {
      const nodesInLayer = 3 + Math.floor(Math.random() * 2)
      for (let i = 0; i < nodesInLayer; i++) {
        const x = (layer - 1.5) * 4
        const y = (i - nodesInLayer / 2) * 1.5 + (Math.random() - 0.5) * 0.5
        const z = -10 + Math.random() * 5
        nodePositions.push([x, y, z])
      }
    }
    return nodePositions
  }, [])

  // Generate sparse connections
  const connections = useMemo(() => {
    const conns: { start: [number, number, number], end: [number, number, number] }[] = []
    for (let i = 0; i < nodes.length - 3; i++) {
      if (Math.random() > 0.5) {
        const targetIdx = Math.min(i + 3 + Math.floor(Math.random() * 3), nodes.length - 1)
        conns.push({ start: nodes[i], end: nodes[targetIdx] })
      }
    }
    return conns
  }, [nodes])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1 + pointer.x * 0.05
      groupRef.current.rotation.x = pointer.y * 0.03
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, -5]}>
      {nodes.map((pos, i) => (
        <NeuralNode key={i} position={pos} size={0.04} />
      ))}
      {connections.map((conn, i) => (
        <NeuralConnection key={i} start={conn.start} end={conn.end} />
      ))}
    </group>
  )
}

// Subtle data flow particles
function DataParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  const { pointer } = useThree()

  const particles = useMemo(() => {
    const count = 150
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5

      // Subtle cyan to purple
      const t = Math.random()
      colors[i * 3] = t * 0.4 + 0.2
      colors[i * 3 + 1] = 0.8 - t * 0.4
      colors[i * 3 + 2] = 1
    }

    return { positions, colors }
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.01 + pointer.x * 0.02
      particlesRef.current.rotation.x = pointer.y * 0.02
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={150}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={150}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  )
}

// Subtle geometric wireframe shapes representing AI/Tech
function TechGeometry() {
  const icosaRef = useRef<THREE.Mesh>(null)
  const octaRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (icosaRef.current) {
      icosaRef.current.rotation.x = state.clock.elapsedTime * 0.05
      icosaRef.current.rotation.y = state.clock.elapsedTime * 0.08
    }
    if (octaRef.current) {
      octaRef.current.rotation.x = state.clock.elapsedTime * 0.06
      octaRef.current.rotation.z = state.clock.elapsedTime * 0.04
    }
  })

  return (
    <>
      <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh ref={icosaRef} position={[-6, 3, -12]}>
          <icosahedronGeometry args={[1.2, 0]} />
          <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.15} />
        </mesh>
      </Float>
      <Float speed={0.4} rotationIntensity={0.15} floatIntensity={0.25}>
        <mesh ref={octaRef} position={[7, -2, -15]}>
          <octahedronGeometry args={[1.5, 0]} />
          <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.12} />
        </mesh>
      </Float>
    </>
  )
}

// Subtle glowing rings
function GlowRings() {
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = Math.PI / 3 + Math.sin(state.clock.elapsedTime * 0.2) * 0.05
      ring1Ref.current.rotation.z = state.clock.elapsedTime * 0.02
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = Math.PI / 4
      ring2Ref.current.rotation.z = -state.clock.elapsedTime * 0.015
    }
  })

  return (
    <>
      <mesh ref={ring1Ref} position={[0, 0, -8]}>
        <torusGeometry args={[5, 0.01, 16, 100]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.2} />
      </mesh>
      <mesh ref={ring2Ref} position={[0, 0, -10]}>
        <torusGeometry args={[7, 0.01, 16, 100]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.15} />
      </mesh>
    </>
  )
}

export default function Scene3D() {
  return (
    <div className="scene-3d">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#000000']} />

        {/* Subtle ambient lighting */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.2} color="#00d4ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.1} color="#a855f7" />

        {/* Subtle 3D elements */}
        <NeuralNetworkLayer />
        <DataParticles />
        <TechGeometry />
        <GlowRings />
      </Canvas>
    </div>
  )
}
