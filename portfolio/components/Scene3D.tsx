'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Signal pulse that travels along connections
interface SignalPulse {
  startNode: number
  endNode: number
  progress: number
  speed: number
  color: THREE.Color
}

// Organic Neural Network Mesh with sci-fi signal transmission
function NeuralMesh() {
  const groupRef = useRef<THREE.Group>(null)
  const { pointer, viewport } = useThree()
  const [activePulses, setActivePulses] = useState<SignalPulse[]>([])
  const [litNodes, setLitNodes] = useState<Map<number, number>>(new Map()) // node index -> brightness

  // Generate denser scattered nodes and organic connections
  const { nodes, connections, adjacencyMap } = useMemo(() => {
    const nodeList: { pos: THREE.Vector3; basePos: THREE.Vector3; color: THREE.Color }[] = []
    const connList: { start: number; end: number; color: THREE.Color }[] = []
    const adjMap: Map<number, number[]> = new Map()

    const nodeCount = 280 // Denser network

    // Create scattered nodes in organic clusters
    for (let i = 0; i < nodeCount; i++) {
      // Create organic clustering effect
      const cluster = Math.floor(Math.random() * 5)
      const clusterOffsetX = (cluster - 2) * 6
      const clusterOffsetY = Math.sin(cluster * 1.2) * 3

      const x = (Math.random() - 0.5) * 12 + clusterOffsetX
      const y = (Math.random() - 0.5) * 14 + clusterOffsetY
      const z = (Math.random() - 0.5) * 10 - 8

      // Enhanced color gradient: magenta -> purple -> cyan -> teal -> green
      const t = (x + 17.5) / 35
      let color: THREE.Color
      if (t < 0.25) {
        const localT = t / 0.25
        color = new THREE.Color().lerpColors(
          new THREE.Color('#ec4899'),
          new THREE.Color('#a855f7'),
          localT
        )
      } else if (t < 0.5) {
        const localT = (t - 0.25) / 0.25
        color = new THREE.Color().lerpColors(
          new THREE.Color('#a855f7'),
          new THREE.Color('#22d3ee'),
          localT
        )
      } else if (t < 0.75) {
        const localT = (t - 0.5) / 0.25
        color = new THREE.Color().lerpColors(
          new THREE.Color('#22d3ee'),
          new THREE.Color('#14b8a6'),
          localT
        )
      } else {
        const localT = (t - 0.75) / 0.25
        color = new THREE.Color().lerpColors(
          new THREE.Color('#14b8a6'),
          new THREE.Color('#22c55e'),
          localT
        )
      }

      const pos = new THREE.Vector3(x, y, z)
      nodeList.push({ pos: pos.clone(), basePos: pos.clone(), color })
      adjMap.set(i, [])
    }

    // Create more organic connections between nearby nodes
    const connectionDistance = 3.2

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
          // Build adjacency map for signal propagation
          adjMap.get(i)?.push(j)
          adjMap.get(j)?.push(i)
        }
      }
    }

    return { nodes: nodeList, connections: connList, adjacencyMap: adjMap }
  }, [])

  // Sequential wave signal propagation
  useEffect(() => {
    const spawnSignal = () => {
      // Start signals from random nodes
      const startNode = Math.floor(Math.random() * nodes.length)
      const neighbors = adjacencyMap.get(startNode) || []

      if (neighbors.length > 0) {
        // Pick 1-2 random neighbors to send signals to
        const numSignals = Math.min(neighbors.length, Math.floor(Math.random() * 2) + 1)
        const newPulses: SignalPulse[] = []

        for (let i = 0; i < numSignals; i++) {
          const endNode = neighbors[Math.floor(Math.random() * neighbors.length)]
          newPulses.push({
            startNode,
            endNode,
            progress: 0,
            speed: 0.015 + Math.random() * 0.01,
            color: nodes[startNode].color.clone()
          })
        }

        // Light up the starting node
        setLitNodes(prev => {
          const newMap = new Map(prev)
          newMap.set(startNode, 2.5)
          return newMap
        })

        setActivePulses(prev => [...prev, ...newPulses])
      }
    }

    // Spawn new signals periodically
    const interval = setInterval(spawnSignal, 150)
    return () => clearInterval(interval)
  }, [nodes, adjacencyMap])

  // Update signal pulses and propagate
  useEffect(() => {
    const updatePulses = () => {
      setActivePulses(prev => {
        const updated: SignalPulse[] = []
        const newLitNodes = new Map(litNodes)

        prev.forEach(pulse => {
          const newProgress = pulse.progress + pulse.speed

          if (newProgress >= 1) {
            // Signal reached destination - light up end node
            newLitNodes.set(pulse.endNode, 2.5)

            // Propagate to next nodes (chain reaction)
            if (Math.random() < 0.6) {
              const neighbors = adjacencyMap.get(pulse.endNode) || []
              const validNeighbors = neighbors.filter(n => n !== pulse.startNode)
              if (validNeighbors.length > 0) {
                const nextNode = validNeighbors[Math.floor(Math.random() * validNeighbors.length)]
                updated.push({
                  startNode: pulse.endNode,
                  endNode: nextNode,
                  progress: 0,
                  speed: pulse.speed,
                  color: nodes[pulse.endNode].color.clone()
                })
              }
            }
          } else {
            updated.push({ ...pulse, progress: newProgress })
          }
        })

        // Decay lit nodes
        litNodes.forEach((brightness, nodeIdx) => {
          const newBrightness = brightness - 0.03
          if (newBrightness > 1) {
            newLitNodes.set(nodeIdx, newBrightness)
          } else {
            newLitNodes.delete(nodeIdx)
          }
        })

        setLitNodes(newLitNodes)
        return updated.slice(-100) // Limit active pulses
      })
    }

    const interval = setInterval(updatePulses, 16)
    return () => clearInterval(interval)
  }, [litNodes, adjacencyMap, nodes])

  return (
    <group ref={groupRef}>
      <AnimatedNodes
        nodes={nodes}
        litNodes={litNodes}
        pointer={pointer}
        viewport={viewport}
      />
      <AnimatedConnections
        nodes={nodes}
        connections={connections}
        activePulses={activePulses}
        pointer={pointer}
        viewport={viewport}
      />
      <SignalPulses
        nodes={nodes}
        pulses={activePulses}
      />
    </group>
  )
}

// Animated circular nodes with parallax and signal lighting
function AnimatedNodes({
  nodes,
  litNodes,
  pointer,
  viewport
}: {
  nodes: { pos: THREE.Vector3; basePos: THREE.Vector3; color: THREE.Color }[]
  litNodes: Map<number, number>
  pointer: THREE.Vector2
  viewport: { width: number; height: number }
}) {
  const pointsRef = useRef<THREE.Points>(null)
  const positionsRef = useRef<Float32Array>(new Float32Array(nodes.length * 3))
  const colorsRef = useRef<Float32Array>(new Float32Array(nodes.length * 3))
  const sizesRef = useRef<Float32Array>(new Float32Array(nodes.length))

  // Initialize
  useMemo(() => {
    nodes.forEach((node, i) => {
      positionsRef.current[i * 3] = node.basePos.x
      positionsRef.current[i * 3 + 1] = node.basePos.y
      positionsRef.current[i * 3 + 2] = node.basePos.z
      colorsRef.current[i * 3] = node.color.r
      colorsRef.current[i * 3 + 1] = node.color.g
      colorsRef.current[i * 3 + 2] = node.color.b
      sizesRef.current[i] = 0.15
    })
  }, [nodes])

  useFrame((state) => {
    if (!pointsRef.current) return

    const time = state.clock.elapsedTime
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
    const colors = pointsRef.current.geometry.attributes.color.array as Float32Array

    nodes.forEach((node, i) => {
      // Parallax effect
      const depth = (node.basePos.z + 14) / 20
      const parallaxX = pointer.x * viewport.width * 0.35 * depth
      const parallaxY = pointer.y * viewport.height * 0.25 * depth

      // Organic wave-like floating movement
      const waveX = Math.sin(time * 0.3 + i * 0.2 + node.basePos.y * 0.1) * 0.3
      const waveY = Math.cos(time * 0.25 + i * 0.15 + node.basePos.x * 0.1) * 0.25
      const waveZ = Math.sin(time * 0.2 + i * 0.1) * 0.15

      positions[i * 3] = node.basePos.x + parallaxX + waveX
      positions[i * 3 + 1] = node.basePos.y + parallaxY + waveY
      positions[i * 3 + 2] = node.basePos.z + waveZ

      node.pos.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2])

      // Signal-based lighting
      const litBrightness = litNodes.get(i) || 1
      const basePulse = Math.sin(time * 0.5 + i * 0.1) * 0.15 + 1

      const brightness = Math.max(litBrightness, basePulse)
      colors[i * 3] = Math.min(1, node.color.r * brightness)
      colors[i * 3 + 1] = Math.min(1, node.color.g * brightness)
      colors[i * 3 + 2] = Math.min(1, node.color.b * brightness)
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
        size={0.2}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Connection lines with subtle base glow
function AnimatedConnections({
  nodes,
  connections,
  activePulses,
}: {
  nodes: { pos: THREE.Vector3; basePos: THREE.Vector3; color: THREE.Color }[]
  connections: { start: number; end: number; color: THREE.Color }[]
  activePulses: SignalPulse[]
  pointer: THREE.Vector2
  viewport: { width: number; height: number }
}) {
  const linesRef = useRef<THREE.LineSegments>(null)
  const positionsRef = useRef<Float32Array>(new Float32Array(connections.length * 6))
  const colorsRef = useRef<Float32Array>(new Float32Array(connections.length * 6))

  // Track which connections have active pulses
  const activeConnectionsRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    const activeSet = new Set<string>()
    activePulses.forEach(pulse => {
      activeSet.add(`${pulse.startNode}-${pulse.endNode}`)
      activeSet.add(`${pulse.endNode}-${pulse.startNode}`)
    })
    activeConnectionsRef.current = activeSet
  }, [activePulses])

  useMemo(() => {
    connections.forEach((conn, i) => {
      colorsRef.current[i * 6] = conn.color.r * 0.4
      colorsRef.current[i * 6 + 1] = conn.color.g * 0.4
      colorsRef.current[i * 6 + 2] = conn.color.b * 0.4
      colorsRef.current[i * 6 + 3] = conn.color.r * 0.4
      colorsRef.current[i * 6 + 4] = conn.color.g * 0.4
      colorsRef.current[i * 6 + 5] = conn.color.b * 0.4
    })
  }, [connections])

  useFrame(() => {
    if (!linesRef.current) return

    const positions = linesRef.current.geometry.attributes.position.array as Float32Array
    const colors = linesRef.current.geometry.attributes.color.array as Float32Array

    connections.forEach((conn, i) => {
      const startNode = nodes[conn.start]
      const endNode = nodes[conn.end]

      positions[i * 6] = startNode.pos.x
      positions[i * 6 + 1] = startNode.pos.y
      positions[i * 6 + 2] = startNode.pos.z
      positions[i * 6 + 3] = endNode.pos.x
      positions[i * 6 + 4] = endNode.pos.y
      positions[i * 6 + 5] = endNode.pos.z

      // Subtle glow for active connections
      const isActive = activeConnectionsRef.current.has(`${conn.start}-${conn.end}`)
      const brightness = isActive ? 0.6 : 0.3

      colors[i * 6] = conn.color.r * brightness
      colors[i * 6 + 1] = conn.color.g * brightness
      colors[i * 6 + 2] = conn.color.b * brightness
      colors[i * 6 + 3] = conn.color.r * brightness
      colors[i * 6 + 4] = conn.color.g * brightness
      colors[i * 6 + 5] = conn.color.b * brightness
    })

    linesRef.current.geometry.attributes.position.needsUpdate = true
    linesRef.current.geometry.attributes.color.needsUpdate = true
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
        opacity={0.2}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  )
}

// Animated signal pulses traveling along connections
function SignalPulses({
  nodes,
  pulses
}: {
  nodes: { pos: THREE.Vector3; basePos: THREE.Vector3; color: THREE.Color }[]
  pulses: SignalPulse[]
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const tempObject = useMemo(() => new THREE.Object3D(), [])
  const tempColor = useMemo(() => new THREE.Color(), [])

  useFrame(() => {
    if (!meshRef.current) return

    pulses.forEach((pulse, i) => {
      if (i >= 100) return // Max instances

      const startPos = nodes[pulse.startNode].pos
      const endPos = nodes[pulse.endNode].pos

      // Interpolate position along the connection
      const x = startPos.x + (endPos.x - startPos.x) * pulse.progress
      const y = startPos.y + (endPos.y - startPos.y) * pulse.progress
      const z = startPos.z + (endPos.z - startPos.z) * pulse.progress

      tempObject.position.set(x, y, z)

      // Pulse size based on progress (grows then shrinks)
      const sizeCurve = Math.sin(pulse.progress * Math.PI)
      const scale = 0.08 + sizeCurve * 0.06
      tempObject.scale.setScalar(scale)

      tempObject.updateMatrix()
      meshRef.current!.setMatrixAt(i, tempObject.matrix)

      // Bright neon color
      tempColor.copy(pulse.color).multiplyScalar(2.5)
      meshRef.current!.setColorAt(i, tempColor)
    })

    // Hide unused instances
    for (let i = pulses.length; i < 100; i++) {
      tempObject.position.set(0, 0, -1000)
      tempObject.scale.setScalar(0)
      tempObject.updateMatrix()
      meshRef.current!.setMatrixAt(i, tempObject.matrix)
    }

    meshRef.current.instanceMatrix.needsUpdate = true
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true
    }
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, 100]}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshBasicMaterial
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
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
