'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Line } from '@react-three/drei'
import * as THREE from 'three'

// Pulsing Neural Node with glow effect
function NeuralNode({
  position,
  size = 0.08,
  color = '#00d4ff',
  pulseSpeed = 1,
  layer = 0
}: {
  position: [number, number, number],
  size?: number,
  color?: string,
  pulseSpeed?: number,
  layer?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * pulseSpeed + position[0] + layer) * 0.3 + 1
      meshRef.current.scale.setScalar(pulse)
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.2)
    }
  })

  return (
    <group position={position}>
      {/* Glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[size * 2.5, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.1} />
      </mesh>
      {/* Main node */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 24, 24]} />
        <meshBasicMaterial color={color} transparent opacity={0.7} />
      </mesh>
    </group>
  )
}

// Animated data signal flowing through connection
function DataSignal({
  start,
  end,
  color = '#00d4ff',
  delay = 0
}: {
  start: THREE.Vector3,
  end: THREE.Vector3,
  color?: string,
  delay?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const t = ((state.clock.elapsedTime * 0.5 + delay) % 1)
      meshRef.current.position.lerpVectors(start, end, t)
      meshRef.current.scale.setScalar(Math.sin(t * Math.PI) * 0.8 + 0.2)
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.9} />
    </mesh>
  )
}

// Neural Network Connection with animated signals
function NeuralConnection({
  start,
  end,
  color = '#00d4ff',
  showSignal = true,
  signalDelay = 0
}: {
  start: [number, number, number],
  end: [number, number, number],
  color?: string,
  showSignal?: boolean,
  signalDelay?: number
}) {
  const points = useMemo(() => [new THREE.Vector3(...start), new THREE.Vector3(...end)], [start, end])

  return (
    <group>
      <Line
        points={points}
        color={color}
        lineWidth={1}
        transparent
        opacity={0.25}
      />
      {showSignal && (
        <DataSignal
          start={points[0]}
          end={points[1]}
          color={color}
          delay={signalDelay}
        />
      )}
    </group>
  )
}

// Main Neural Brain Structure - prominent and animated
function NeuralBrain() {
  const groupRef = useRef<THREE.Group>(null)
  const { pointer } = useThree()

  // Generate brain-like structure with multiple layers
  const { nodes, connections } = useMemo(() => {
    const nodePositions: { pos: [number, number, number], layer: number, color: string }[] = []
    const conns: { start: [number, number, number], end: [number, number, number], color: string, signalDelay: number }[] = []

    const colors = ['#00d4ff', '#a855f7', '#22d3ee', '#c084fc', '#06b6d4']

    // Create layered neural network structure
    const layers = [
      { count: 4, x: -5, spread: 2.5 },
      { count: 6, x: -2.5, spread: 3 },
      { count: 8, x: 0, spread: 3.5 },
      { count: 6, x: 2.5, spread: 3 },
      { count: 4, x: 5, spread: 2.5 },
    ]

    layers.forEach((layer, layerIdx) => {
      for (let i = 0; i < layer.count; i++) {
        const angle = (i / layer.count) * Math.PI * 2
        const y = Math.sin(angle) * layer.spread
        const z = Math.cos(angle) * layer.spread - 8
        const color = colors[layerIdx % colors.length]
        nodePositions.push({ pos: [layer.x, y, z], layer: layerIdx, color })
      }
    })

    // Connect adjacent layers
    let nodeIdx = 0
    for (let layerIdx = 0; layerIdx < layers.length - 1; layerIdx++) {
      const currentLayerStart = nodeIdx
      const currentLayerCount = layers[layerIdx].count
      const nextLayerStart = nodeIdx + currentLayerCount
      const nextLayerCount = layers[layerIdx + 1].count

      for (let i = 0; i < currentLayerCount; i++) {
        // Connect to 2-3 nodes in next layer
        const connectionCount = 2 + Math.floor(Math.random() * 2)
        for (let c = 0; c < connectionCount; c++) {
          const targetIdx = nextLayerStart + Math.floor(Math.random() * nextLayerCount)
          const color = nodePositions[currentLayerStart + i].color
          conns.push({
            start: nodePositions[currentLayerStart + i].pos,
            end: nodePositions[targetIdx].pos,
            color,
            signalDelay: Math.random() * 2
          })
        }
      }
      nodeIdx += currentLayerCount
    }

    return { nodes: nodePositions, connections: conns }
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle rotation following mouse
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.2 + pointer.x * 0.15
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.15) * 0.1 + pointer.y * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <NeuralNode
          key={i}
          position={node.pos}
          size={0.1}
          color={node.color}
          pulseSpeed={1.5 + node.layer * 0.2}
          layer={node.layer}
        />
      ))}
      {connections.map((conn, i) => (
        <NeuralConnection
          key={i}
          start={conn.start}
          end={conn.end}
          color={conn.color}
          showSignal={i % 3 === 0}
          signalDelay={conn.signalDelay}
        />
      ))}
    </group>
  )
}

// Floating Data Stream Particles - enhanced
function DataParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  const { pointer } = useThree()

  const particles = useMemo(() => {
    const count = 250
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      // Create flowing particle streams
      const stream = Math.floor(Math.random() * 5)
      const streamAngle = (stream / 5) * Math.PI * 2
      const distance = Math.random() * 15 + 5

      positions[i * 3] = Math.cos(streamAngle) * distance + (Math.random() - 0.5) * 5
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = Math.sin(streamAngle) * distance - 10

      // Vibrant cyan to purple gradient
      const t = Math.random()
      colors[i * 3] = t * 0.5 + 0.3     // R
      colors[i * 3 + 1] = 0.9 - t * 0.3 // G
      colors[i * 3 + 2] = 1             // B
    }

    return { positions, colors }
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      // Flowing rotation
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05 + pointer.x * 0.1
      particlesRef.current.rotation.x = pointer.y * 0.05

      // Animate particle positions for flowing effect
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < positions.length / 3; i++) {
        positions[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i * 0.1) * 0.003
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={250}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={250}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Circuit Pattern Background
function CircuitPattern() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.02
    }
  })

  const circuitLines = useMemo(() => {
    const lines: { start: [number, number, number], end: [number, number, number] }[] = []
    // Create circuit-like patterns
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2
      const r1 = 8
      const r2 = 12
      lines.push({
        start: [Math.cos(angle) * r1, Math.sin(angle) * r1, -20],
        end: [Math.cos(angle) * r2, Math.sin(angle) * r2, -20]
      })
    }
    return lines
  }, [])

  return (
    <group ref={groupRef}>
      {circuitLines.map((line, i) => (
        <Line
          key={i}
          points={[new THREE.Vector3(...line.start), new THREE.Vector3(...line.end)]}
          color={i % 2 === 0 ? '#00d4ff' : '#a855f7'}
          lineWidth={0.5}
          transparent
          opacity={0.15}
        />
      ))}
      {/* Outer ring */}
      <mesh position={[0, 0, -20]}>
        <torusGeometry args={[12, 0.02, 16, 100]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.15} />
      </mesh>
      {/* Inner ring */}
      <mesh position={[0, 0, -20]}>
        <torusGeometry args={[8, 0.02, 16, 100]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.2} />
      </mesh>
    </group>
  )
}

// Floating geometric shapes representing AI concepts
function AIGeometries() {
  const cubeRef = useRef<THREE.Mesh>(null)
  const torusRef = useRef<THREE.Mesh>(null)
  const dodecaRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x = state.clock.elapsedTime * 0.3
      cubeRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
    if (torusRef.current) {
      torusRef.current.rotation.x = state.clock.elapsedTime * 0.2
      torusRef.current.rotation.z = state.clock.elapsedTime * 0.15
    }
    if (dodecaRef.current) {
      dodecaRef.current.rotation.y = state.clock.elapsedTime * 0.25
      dodecaRef.current.rotation.z = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <>
      {/* Floating cube */}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={cubeRef} position={[-8, 4, -15]}>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.25} />
        </mesh>
      </Float>

      {/* Floating torus knot */}
      <Float speed={0.8} rotationIntensity={0.3} floatIntensity={0.4}>
        <mesh ref={torusRef} position={[9, -3, -18]}>
          <torusKnotGeometry args={[1, 0.3, 100, 16]} />
          <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.2} />
        </mesh>
      </Float>

      {/* Floating dodecahedron */}
      <Float speed={0.6} rotationIntensity={0.4} floatIntensity={0.35}>
        <mesh ref={dodecaRef} position={[7, 5, -12]}>
          <dodecahedronGeometry args={[1.2, 0]} />
          <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.25} />
        </mesh>
      </Float>

      {/* Icosahedron */}
      <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh position={[-7, -4, -14]}>
          <icosahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#c084fc" wireframe transparent opacity={0.2} />
        </mesh>
      </Float>
    </>
  )
}

// Animated rings around the scene
function AnimatedRings() {
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const ring3Ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = Math.PI / 3 + Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      ring1Ref.current.rotation.z = state.clock.elapsedTime * 0.08
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = Math.PI / 4
      ring2Ref.current.rotation.y = -state.clock.elapsedTime * 0.06
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = state.clock.elapsedTime * 0.04
      ring3Ref.current.rotation.z = Math.PI / 6
    }
  })

  return (
    <>
      <mesh ref={ring1Ref} position={[0, 0, -6]}>
        <torusGeometry args={[6, 0.015, 16, 150]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.3} />
      </mesh>
      <mesh ref={ring2Ref} position={[0, 0, -8]}>
        <torusGeometry args={[9, 0.015, 16, 150]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.2} />
      </mesh>
      <mesh ref={ring3Ref} position={[0, 0, -10]}>
        <torusGeometry args={[12, 0.015, 16, 150]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.15} />
      </mesh>
    </>
  )
}

export default function Scene3D() {
  return (
    <div className="scene-3d">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#000000']} />

        {/* Ambient lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.4} color="#00d4ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#a855f7" />
        <pointLight position={[0, 0, 5]} intensity={0.2} color="#22d3ee" />

        {/* Main Neural Network Brain */}
        <NeuralBrain />

        {/* Flowing Data Particles */}
        <DataParticles />

        {/* Circuit Pattern Background */}
        <CircuitPattern />

        {/* Floating AI Geometries */}
        <AIGeometries />

        {/* Animated Rings */}
        <AnimatedRings />
      </Canvas>
    </div>
  )
}
