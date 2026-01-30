'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Stars, Line } from '@react-three/drei'
import * as THREE from 'three'

interface NodeProps {
  position: [number, number, number]
  color: string
  scale?: number
}

function NeuralNode({ position, color, scale = 1 }: NodeProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(scale * (1 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.1))
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  )
}

function Connection({ start, end, color }: { start: [number, number, number], end: [number, number, number], color: string }) {
  const points = useMemo(() => {
    return [new THREE.Vector3(...start), new THREE.Vector3(...end)]
  }, [start, end])

  return (
    <Line
      points={points}
      color={color}
      lineWidth={1}
      transparent
      opacity={0.3}
    />
  )
}

function NeuralNetworkMesh() {
  const groupRef = useRef<THREE.Group>(null)
  const { pointer } = useThree()

  // Generate neural network nodes in layers
  const nodes = useMemo(() => {
    const layers = [
      { count: 4, x: -3, color: '#00d4ff' },
      { count: 6, x: -1.5, color: '#00d4ff' },
      { count: 8, x: 0, color: '#a855f7' },
      { count: 6, x: 1.5, color: '#a855f7' },
      { count: 4, x: 3, color: '#00d4ff' },
    ]

    const nodePositions: { position: [number, number, number], color: string }[] = []

    layers.forEach((layer) => {
      for (let i = 0; i < layer.count; i++) {
        const y = (i - (layer.count - 1) / 2) * 0.6
        const z = (Math.random() - 0.5) * 2
        nodePositions.push({
          position: [layer.x, y, z],
          color: layer.color
        })
      }
    })

    return nodePositions
  }, [])

  // Generate connections between layers
  const connections = useMemo(() => {
    const conns: { start: [number, number, number], end: [number, number, number], color: string }[] = []
    const layerStartIndices = [0, 4, 10, 18, 24]
    const layerCounts = [4, 6, 8, 6, 4]

    for (let l = 0; l < layerStartIndices.length - 1; l++) {
      const currentStart = layerStartIndices[l]
      const nextStart = layerStartIndices[l + 1]

      for (let i = 0; i < layerCounts[l]; i++) {
        const numConnections = Math.min(3, layerCounts[l + 1])
        for (let j = 0; j < numConnections; j++) {
          const targetIdx = nextStart + Math.floor(Math.random() * layerCounts[l + 1])
          if (nodes[currentStart + i] && nodes[targetIdx]) {
            conns.push({
              start: nodes[currentStart + i].position,
              end: nodes[targetIdx].position,
              color: '#00d4ff'
            })
          }
        }
      }
    }

    return conns
  }, [nodes])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.3 + pointer.x * 0.3
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.1 + pointer.y * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <NeuralNode key={i} position={node.position} color={node.color} />
      ))}
      {connections.map((conn, i) => (
        <Connection key={i} start={conn.start} end={conn.end} color={conn.color} />
      ))}
    </group>
  )
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const positions = new Float32Array(200 * 3)
    for (let i = 0; i < 200; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return positions
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={200}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00d4ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

export default function NeuralNetwork() {
  return (
    <div className="neural-canvas">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#0a0a0f']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />

        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <NeuralNetworkMesh />
        </Float>

        <FloatingParticles />
        <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  )
}
