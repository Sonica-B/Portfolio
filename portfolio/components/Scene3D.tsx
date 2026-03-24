'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Signal pulse interface
interface SignalPulse {
  startNode: number
  endNode: number
  progress: number
  speed: number
  color: THREE.Color
  id: number
}

// Neural Network with real-time signal propagation
function NeuralMesh({ isMobile }: { isMobile: boolean }) {
  const { pointer, viewport } = useThree()

  // Use refs for mutable state to avoid re-renders
  const pulsesRef = useRef<SignalPulse[]>([])
  const litNodesRef = useRef<Map<number, number>>(new Map())
  const pulseIdRef = useRef(0)
  const lastSpawnRef = useRef(0)

  // Generate nodes and connections - responsive to mobile
  const { nodes, connections, adjacencyMap } = useMemo(() => {
    const nodeList: { pos: THREE.Vector3; basePos: THREE.Vector3; color: THREE.Color }[] = []
    const connList: { start: number; end: number; color: THREE.Color }[] = []
    const adjMap: Map<number, number[]> = new Map()

    // Mobile: fewer nodes, narrower spread, taller layout
    const nodeCount = isMobile ? 150 : 300
    const xSpreadFactor = isMobile ? 0.35 : 1  // Narrower on mobile
    const ySpreadFactor = isMobile ? 1.2 : 1   // Taller on mobile

    for (let i = 0; i < nodeCount; i++) {
      const cluster = Math.floor(Math.random() * 5)
      const clusterOffsetX = (cluster - 2) * 7 * xSpreadFactor
      const clusterOffsetY = Math.sin(cluster * 1.2) * 4 * ySpreadFactor

      const x = (Math.random() - 0.5) * 14 * xSpreadFactor + clusterOffsetX
      const y = (Math.random() - 0.5) * 16 * ySpreadFactor + clusterOffsetY
      const z = (Math.random() - 0.5) * 20 - 5

      // Normalize color gradient based on actual spread (so mobile shows full spectrum)
      const maxX = 7 * xSpreadFactor + 7 * xSpreadFactor // Max possible x
      const t = (x + maxX) / (maxX * 2)
      let color: THREE.Color
      if (t < 0.25) {
        color = new THREE.Color().lerpColors(new THREE.Color('#ec4899'), new THREE.Color('#a855f7'), t / 0.25)
      } else if (t < 0.5) {
        color = new THREE.Color().lerpColors(new THREE.Color('#a855f7'), new THREE.Color('#22d3ee'), (t - 0.25) / 0.25)
      } else if (t < 0.75) {
        color = new THREE.Color().lerpColors(new THREE.Color('#22d3ee'), new THREE.Color('#14b8a6'), (t - 0.5) / 0.25)
      } else {
        color = new THREE.Color().lerpColors(new THREE.Color('#14b8a6'), new THREE.Color('#22c55e'), (t - 0.75) / 0.25)
      }

      const pos = new THREE.Vector3(x, y, z)
      nodeList.push({ pos: pos.clone(), basePos: pos.clone(), color })
      adjMap.set(i, [])
    }

    const connectionDistance = 3.5
    for (let i = 0; i < nodeList.length; i++) {
      for (let j = i + 1; j < nodeList.length; j++) {
        const dist = nodeList[i].basePos.distanceTo(nodeList[j].basePos)
        if (dist < connectionDistance) {
          const midColor = new THREE.Color().lerpColors(nodeList[i].color, nodeList[j].color, 0.5)
          connList.push({ start: i, end: j, color: midColor })
          adjMap.get(i)?.push(j)
          adjMap.get(j)?.push(i)
        }
      }
    }

    return { nodes: nodeList, connections: connList, adjacencyMap: adjMap }
  }, [isMobile])

  // Spawn new signal
  const spawnSignal = (startNode: number) => {
    if (startNode < 0 || startNode >= nodes.length) return
    const neighbors = adjacencyMap.get(startNode) || []
    if (neighbors.length > 0) {
      const endNode = neighbors[Math.floor(Math.random() * neighbors.length)]
      if (endNode < 0 || endNode >= nodes.length) return
      pulsesRef.current.push({
        startNode,
        endNode,
        progress: 0,
        speed: 0.02 + Math.random() * 0.015,
        color: nodes[startNode].color.clone(),
        id: pulseIdRef.current++
      })
      litNodesRef.current.set(startNode, 2.5)
    }
  }

  return (
    <group>
      <AnimatedNodes
        nodes={nodes}
        litNodesRef={litNodesRef}
        pointer={pointer}
        viewport={viewport}
      />
      <AnimatedConnections
        nodes={nodes}
        connections={connections}
        pulsesRef={pulsesRef}
      />
      <SignalPulses
        nodes={nodes}
        pulsesRef={pulsesRef}
        litNodesRef={litNodesRef}
        adjacencyMap={adjacencyMap}
        lastSpawnRef={lastSpawnRef}
        spawnSignal={spawnSignal}
      />
    </group>
  )
}

// Animated circular nodes
function AnimatedNodes({
  nodes,
  litNodesRef,
  pointer,
  viewport
}: {
  nodes: { pos: THREE.Vector3; basePos: THREE.Vector3; color: THREE.Color }[]
  litNodesRef: React.MutableRefObject<Map<number, number>>
  pointer: THREE.Vector2
  viewport: { width: number; height: number }
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const tempObject = useMemo(() => new THREE.Object3D(), [])
  const tempColor = useMemo(() => new THREE.Color(), [])

  useFrame((state) => {
    if (!meshRef.current) return

    const time = state.clock.elapsedTime

    // Decay lit nodes
    litNodesRef.current.forEach((brightness, nodeIdx) => {
      const newBrightness = brightness - 0.04
      if (newBrightness > 1) {
        litNodesRef.current.set(nodeIdx, newBrightness)
      } else {
        litNodesRef.current.delete(nodeIdx)
      }
    })

    nodes.forEach((node, i) => {
      // Parallax effect
      const depth = (node.basePos.z + 15) / 20
      const parallaxX = pointer.x * viewport.width * 0.4 * depth
      const parallaxY = pointer.y * viewport.height * 0.3 * depth

      // Organic wave movement
      const waveX = Math.sin(time * 0.4 + i * 0.25 + node.basePos.y * 0.15) * 0.35
      const waveY = Math.cos(time * 0.35 + i * 0.2 + node.basePos.x * 0.12) * 0.3
      const waveZ = Math.sin(time * 0.25 + i * 0.15) * 0.2

      const x = node.basePos.x + parallaxX + waveX
      const y = node.basePos.y + parallaxY + waveY
      const z = node.basePos.z + waveZ

      node.pos.set(x, y, z)

      tempObject.position.set(x, y, z)

      // Size based on lighting
      const litBrightness = litNodesRef.current.get(i) || 1
      const baseSize = 0.08
      const scale = baseSize * (litBrightness > 1 ? 1 + (litBrightness - 1) * 0.3 : 1)
      tempObject.scale.setScalar(scale)

      tempObject.updateMatrix()
      meshRef.current!.setMatrixAt(i, tempObject.matrix)

      // Color with brightness
      const basePulse = Math.sin(time * 0.6 + i * 0.12) * 0.2 + 1
      const brightness = Math.max(litBrightness, basePulse)
      tempColor.setRGB(
        Math.min(1, node.color.r * brightness),
        Math.min(1, node.color.g * brightness),
        Math.min(1, node.color.b * brightness)
      )
      meshRef.current!.setColorAt(i, tempColor)
    })

    meshRef.current.instanceMatrix.needsUpdate = true
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true
    }
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, nodes.length]}>
      <circleGeometry args={[1, 32]} />
      <meshBasicMaterial
        transparent
        opacity={0.9}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  )
}

// Connection lines with glow effect
function AnimatedConnections({
  nodes,
  connections,
  pulsesRef
}: {
  nodes: { pos: THREE.Vector3; basePos: THREE.Vector3; color: THREE.Color }[]
  connections: { start: number; end: number; color: THREE.Color }[]
  pulsesRef: React.MutableRefObject<SignalPulse[]>
}) {
  const linesRef = useRef<THREE.LineSegments>(null)
  const positionsRef = useRef<Float32Array>(new Float32Array(connections.length * 6))
  const colorsRef = useRef<Float32Array>(new Float32Array(connections.length * 6))
  const activeConnectionsRef = useRef<Set<string>>(new Set())

  useMemo(() => {
    connections.forEach((conn, i) => {
      colorsRef.current[i * 6] = conn.color.r * 0.5
      colorsRef.current[i * 6 + 1] = conn.color.g * 0.5
      colorsRef.current[i * 6 + 2] = conn.color.b * 0.5
      colorsRef.current[i * 6 + 3] = conn.color.r * 0.5
      colorsRef.current[i * 6 + 4] = conn.color.g * 0.5
      colorsRef.current[i * 6 + 5] = conn.color.b * 0.5
    })
  }, [connections])

  useFrame(() => {
    if (!linesRef.current) return

    // Update active connections
    activeConnectionsRef.current.clear()
    pulsesRef.current.forEach(pulse => {
      activeConnectionsRef.current.add(`${pulse.startNode}-${pulse.endNode}`)
      activeConnectionsRef.current.add(`${pulse.endNode}-${pulse.startNode}`)
    })

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

      // Glow when active
      const isActive = activeConnectionsRef.current.has(`${conn.start}-${conn.end}`)
      const brightness = isActive ? 1.2 : 0.4

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
        opacity={0.35}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  )
}

// Signal pulses with chain reaction
function SignalPulses({
  nodes,
  pulsesRef,
  litNodesRef,
  adjacencyMap,
  lastSpawnRef,
  spawnSignal
}: {
  nodes: { pos: THREE.Vector3; basePos: THREE.Vector3; color: THREE.Color }[]
  pulsesRef: React.MutableRefObject<SignalPulse[]>
  litNodesRef: React.MutableRefObject<Map<number, number>>
  adjacencyMap: Map<number, number[]>
  lastSpawnRef: React.MutableRefObject<number>
  spawnSignal: (startNode: number) => void
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const tempObject = useMemo(() => new THREE.Object3D(), [])
  const tempColor = useMemo(() => new THREE.Color(), [])

  useFrame((state) => {
    if (!meshRef.current) return

    const time = state.clock.elapsedTime

    // Spawn new signals periodically
    if (time - lastSpawnRef.current > 0.12) {
      lastSpawnRef.current = time
      const startNode = Math.floor(Math.random() * nodes.length)
      spawnSignal(startNode)
    }

    // Update pulses
    const newPulses: SignalPulse[] = []

    pulsesRef.current.forEach(pulse => {
      pulse.progress += pulse.speed

      if (pulse.progress >= 1) {
        // Signal reached destination - light up end node
        litNodesRef.current.set(pulse.endNode, 2.5)

        // Chain reaction - 60% chance to propagate
        if (Math.random() < 0.6) {
          const neighbors = adjacencyMap.get(pulse.endNode) || []
          const validNeighbors = neighbors.filter(n => n !== pulse.startNode)
          if (validNeighbors.length > 0) {
            const nextNode = validNeighbors[Math.floor(Math.random() * validNeighbors.length)]
            newPulses.push({
              startNode: pulse.endNode,
              endNode: nextNode,
              progress: 0,
              speed: pulse.speed,
              color: nodes[pulse.endNode].color.clone(),
              id: pulse.id + 1000
            })
          }
        }
      } else {
        newPulses.push(pulse)
      }
    })

    pulsesRef.current = newPulses.slice(-150)

    // Render pulses
    pulsesRef.current.forEach((pulse, i) => {
      if (i >= 150) return

      const startNode = nodes[pulse.startNode]
      const endNode = nodes[pulse.endNode]
      if (!startNode || !endNode) return
      const startPos = startNode.pos
      const endPos = endNode.pos

      const x = startPos.x + (endPos.x - startPos.x) * pulse.progress
      const y = startPos.y + (endPos.y - startPos.y) * pulse.progress
      const z = startPos.z + (endPos.z - startPos.z) * pulse.progress

      tempObject.position.set(x, y, z)

      const sizeCurve = Math.sin(pulse.progress * Math.PI)
      const scale = 0.06 + sizeCurve * 0.08
      tempObject.scale.setScalar(scale)

      tempObject.updateMatrix()
      meshRef.current!.setMatrixAt(i, tempObject.matrix)

      tempColor.copy(pulse.color).multiplyScalar(3)
      meshRef.current!.setColorAt(i, tempColor)
    })

    // Hide unused instances
    for (let i = pulsesRef.current.length; i < 150; i++) {
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
    <instancedMesh ref={meshRef} args={[undefined, undefined, 150]}>
      <circleGeometry args={[1, 16]} />
      <meshBasicMaterial
        transparent
        opacity={1}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  )
}

// Camera that moves through the neural field based on scroll position
function ScrollCamera({
  scrollProgressRef,
  isMobile
}: {
  scrollProgressRef: React.MutableRefObject<number>
  isMobile: boolean
}) {
  const { camera } = useThree()
  const smoothProgress = useRef(0)

  const startZ = isMobile ? 14 : 18
  const endZ = isMobile ? 4 : -2
  const startFov = isMobile ? 60 : 50
  const endFov = isMobile ? 75 : 70

  useFrame(() => {
    // Smooth lerp toward target
    smoothProgress.current += (scrollProgressRef.current - smoothProgress.current) * 0.05

    const t = smoothProgress.current

    // Animate camera z position - travel through node field
    camera.position.z = startZ + (endZ - startZ) * t

    // Subtle sinusoidal y-drift for organic movement
    camera.position.y = Math.sin(t * Math.PI * 2) * 0.8

    // Animate FOV for rushing tunnel feel
    const perspCamera = camera as THREE.PerspectiveCamera
    perspCamera.fov = startFov + (endFov - startFov) * t
    perspCamera.updateProjectionMatrix()
  })

  return null
}

interface Scene3DProps {
  scrollProgressRef?: React.MutableRefObject<number>
}

export default function Scene3D({ scrollProgressRef }: Scene3DProps) {
  const [isMobile, setIsMobile] = useState(false)
  const fallbackRef = useRef(0)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const progressRef = scrollProgressRef || fallbackRef

  return (
    <div className="scene-3d">
      <Canvas
        camera={{ position: [0, 0, isMobile ? 14 : 18], fov: isMobile ? 60 : 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#000000']} />
        <ScrollCamera scrollProgressRef={progressRef} isMobile={isMobile} />
        <NeuralMesh isMobile={isMobile} />
      </Canvas>
    </div>
  )
}
