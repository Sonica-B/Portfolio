'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Organic Neural Network Mesh with enhanced interactivity
function NeuralMesh() {
  const groupRef = useRef<THREE.Group>(null)
  const { pointer, viewport } = useThree()
  const [twinklingNodes, setTwinklingNodes] = useState<Set<number>>(new Set())

  // Generate scattered nodes and organic connections
  const { nodes, connections } = useMemo(() => {
    const nodeList: { pos: THREE.Vector3; basePos: THREE.Vector3; color: THREE.Color }[] = []
    const connList: { start: number; end: number; color: THREE.Color }[] = []

    const nodeCount = 180

    // Create scattered nodes
    for (let i = 0; i < nodeCount; i++) {
      const x = (Math.random() - 0.5) * 35
      const y = (Math.random() - 0.5) * 22
      const z = (Math.random() - 0.5) * 12 - 8

      // Enhanced color gradient: magenta -> purple -> cyan -> teal -> green
      const t = (x + 17.5) / 35
      let color: THREE.Color
      if (t < 0.25) {
        // Magenta to purple
        const localT = t / 0.25
        color = new THREE.Color().lerpColors(
          new THREE.Color('#ec4899'),
          new THREE.Color('#a855f7'),
          localT
        )
      } else if (t < 0.5) {
        // Purple to cyan
        const localT = (t - 0.25) / 0.25
        color = new THREE.Color().lerpColors(
          new THREE.Color('#a855f7'),
          new THREE.Color('#22d3ee'),
          localT
        )
      } else if (t < 0.75) {
        // Cyan to teal
        const localT = (t - 0.5) / 0.25
        color = new THREE.Color().lerpColors(
          new THREE.Color('#22d3ee'),
          new THREE.Color('#14b8a6'),
          localT
        )
      } else {
        // Teal to green
        const localT = (t - 0.75) / 0.25
        color = new THREE.Color().lerpColors(
          new THREE.Color('#14b8a6'),
          new THREE.Color('#22c55e'),
          localT
        )
      }

      const pos = new THREE.Vector3(x, y, z)
      nodeList.push({ pos: pos.clone(), basePos: pos.clone(), color })
    }

    // Create organic connections between nearby nodes
    const connectionDistance = 3.8

    for (let i = 0; i < nodeList.length; i++) {
      for (let j = i + 1; j < nodeList.length; j++) {
        const dist = nodeList[i].basePos.distanceTo(nodeList[j].basePos)
        if (dist < connectionDistance) {
          const midColor = new THREE.Color().lerpColors(
            nodeList[i].color,
            nodeList[j].color,
            0.5
          )
          connList.push({
            start: i,
            end: j,
            color: midColor
          })
        }
      }
    }

    return { nodes: nodeList, connections: connList }
  }, [])

  // Random twinkling effect - more frequent and more nodes
  useEffect(() => {
    const interval = setInterval(() => {
      const newTwinkling = new Set<number>()
      // Randomly select 12-20 nodes to twinkle
      const count = Math.floor(Math.random() * 9) + 12
      for (let i = 0; i < count; i++) {
        newTwinkling.add(Math.floor(Math.random() * nodes.length))
      }
      setTwinklingNodes(newTwinkling)
    }, 600)

    return () => clearInterval(interval)
  }, [nodes.length])

  return (
    <group ref={groupRef}>
      <AnimatedNodes
        nodes={nodes}
        twinklingNodes={twinklingNodes}
        pointer={pointer}
        viewport={viewport}
      />
      <AnimatedConnections
        nodes={nodes}
        connections={connections}
        pointer={pointer}
        viewport={viewport}
      />
    </group>
  )
}

// Animated nodes with parallax, movement, and twinkling
function AnimatedNodes({
  nodes,
  twinklingNodes,
  pointer,
  viewport
}: {
  nodes: { pos: THREE.Vector3; basePos: THREE.Vector3; color: THREE.Color }[]
  twinklingNodes: Set<number>
  pointer: THREE.Vector2
  viewport: { width: number; height: number }
}) {
  const pointsRef = useRef<THREE.Points>(null)
  const positionsRef = useRef<Float32Array>(new Float32Array(nodes.length * 3))
  const colorsRef = useRef<Float32Array>(new Float32Array(nodes.length * 3))

  // Initialize positions and colors
  useMemo(() => {
    nodes.forEach((node, i) => {
      positionsRef.current[i * 3] = node.basePos.x
      positionsRef.current[i * 3 + 1] = node.basePos.y
      positionsRef.current[i * 3 + 2] = node.basePos.z

      colorsRef.current[i * 3] = node.color.r
      colorsRef.current[i * 3 + 1] = node.color.g
      colorsRef.current[i * 3 + 2] = node.color.b
    })
  }, [nodes])

  useFrame((state) => {
    if (!pointsRef.current) return

    const time = state.clock.elapsedTime
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
    const colors = pointsRef.current.geometry.attributes.color.array as Float32Array

    nodes.forEach((node, i) => {
      // ENHANCED Parallax effect - much more pronounced
      const depth = (node.basePos.z + 14) / 20
      const parallaxX = pointer.x * viewport.width * 0.4 * depth
      const parallaxY = pointer.y * viewport.height * 0.3 * depth

      // ENHANCED floating movement - larger amplitude, varied speeds
      const floatX = Math.sin(time * 0.4 + i * 0.3) * 0.4
      const floatY = Math.cos(time * 0.35 + i * 0.5) * 0.35
      const floatZ = Math.sin(time * 0.3 + i * 0.2) * 0.25

      // Update positions with parallax and float
      positions[i * 3] = node.basePos.x + parallaxX + floatX
      positions[i * 3 + 1] = node.basePos.y + parallaxY + floatY
      positions[i * 3 + 2] = node.basePos.z + floatZ

      // Update node's current position for connection lines
      node.pos.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2])

      // ENHANCED Twinkling effect - much brighter and more visible
      if (twinklingNodes.has(i)) {
        const twinkle = Math.sin(time * 12) * 0.8 + 2.2
        colors[i * 3] = Math.min(1, node.color.r * twinkle)
        colors[i * 3 + 1] = Math.min(1, node.color.g * twinkle)
        colors[i * 3 + 2] = Math.min(1, node.color.b * twinkle)
      } else {
        // Subtle ambient pulse for all nodes
        const pulse = Math.sin(time * 0.8 + i * 0.15) * 0.2 + 1
        colors[i * 3] = node.color.r * pulse
        colors[i * 3 + 1] = node.color.g * pulse
        colors[i * 3 + 2] = node.color.b * pulse
      }
    })

    pointsRef.current.geometry.attributes.position.needsUpdate = true
    pointsRef.current.geometry.attributes.color.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={nodes.length}
          array={positionsRef.current}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={nodes.length}
          array={colorsRef.current}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.22}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Animated connection lines that follow node movements
function AnimatedConnections({
  nodes,
  connections,
}: {
  nodes: { pos: THREE.Vector3; basePos: THREE.Vector3; color: THREE.Color }[]
  connections: { start: number; end: number; color: THREE.Color }[]
  pointer: THREE.Vector2
  viewport: { width: number; height: number }
}) {
  const linesRef = useRef<THREE.LineSegments>(null)
  const positionsRef = useRef<Float32Array>(new Float32Array(connections.length * 6))
  const colorsRef = useRef<Float32Array>(new Float32Array(connections.length * 6))

  // Initialize colors
  useMemo(() => {
    connections.forEach((conn, i) => {
      colorsRef.current[i * 6] = conn.color.r
      colorsRef.current[i * 6 + 1] = conn.color.g
      colorsRef.current[i * 6 + 2] = conn.color.b
      colorsRef.current[i * 6 + 3] = conn.color.r
      colorsRef.current[i * 6 + 4] = conn.color.g
      colorsRef.current[i * 6 + 5] = conn.color.b
    })
  }, [connections])

  useFrame(() => {
    if (!linesRef.current) return

    const positions = linesRef.current.geometry.attributes.position.array as Float32Array

    connections.forEach((conn, i) => {
      const startNode = nodes[conn.start]
      const endNode = nodes[conn.end]

      // Use the animated node positions
      positions[i * 6] = startNode.pos.x
      positions[i * 6 + 1] = startNode.pos.y
      positions[i * 6 + 2] = startNode.pos.z
      positions[i * 6 + 3] = endNode.pos.x
      positions[i * 6 + 4] = endNode.pos.y
      positions[i * 6 + 5] = endNode.pos.z
    })

    linesRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={connections.length * 2}
          array={positionsRef.current}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={connections.length * 2}
          array={colorsRef.current}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        vertexColors
        transparent
        opacity={0.18}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  )
}

export default function Scene3D() {
  return (
    <div className="scene-3d">
      <Canvas
        camera={{ position: [0, 0, 16], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#000000']} />
        <NeuralMesh />
      </Canvas>
    </div>
  )
}
