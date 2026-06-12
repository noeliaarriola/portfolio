// CraneParticles.jsx  (edge-based renderer — replaces particle cloud)
//
// Pipeline
//   1. Load GLB via useGLTF
//   2. mergeVertices → EdgesGeometry (threshold 15°) per mesh
//   3. Merge all edge segments into one BufferGeometry, normalise to unit cube
//   4. Render as <lineSegments> — clean CAD / blueprint aesthetic
//   5. 250 ambient particles scattered ±0.06 from edge vertices (secondary detail)
//   6. Fade-in over 1.5 s, then slow rotation + mouse parallax + vertical float
//
// No per-frame allocation — all geometry built once in useMemo, mutated in place

import { useRef, useMemo, useEffect, useState, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

// ── Theme ─────────────────────────────────────────────────────────────────────
function useIsDark() {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.getAttribute('data-theme') === 'dark'
  )
  useEffect(() => {
    const mo = new MutationObserver(() =>
      setIsDark(document.documentElement.getAttribute('data-theme') === 'dark')
    )
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })
    return () => mo.disconnect()
  }, [])
  return isDark
}

// ── Soft dot texture for ambient particles ────────────────────────────────────
function makeSprite() {
  const c = document.createElement('canvas')
  c.width = c.height = 32
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(16, 16, 0, 16, 16, 16)
  g.addColorStop(0,   'rgba(255,255,255,1)')
  g.addColorStop(0.4, 'rgba(255,255,255,0.6)')
  g.addColorStop(1,   'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 32, 32)
  return new THREE.CanvasTexture(c)
}

// ── Build edge + particle geometry from the loaded GLB ────────────────────────
const EDGE_THRESHOLD  = 15   // degrees — increase to show only sharpest folds
const PARTICLE_COUNT  = 250  // ambient dots around the silhouette

function buildGeometry(gltfScene) {
  gltfScene.updateMatrixWorld(true)

  const rawEdge = []   // [x, y, z, …] — line segment vertices

  gltfScene.traverse(node => {
    if (!node.isMesh || !node.geometry) return
    try {
      // mergeVertices gives EdgesGeometry correct shared-face information
      // (GLBs from Blender often have split vertices / flat-shading data)
      const clean  = mergeVertices(node.geometry.clone(), 1e-4)
      clean.computeVertexNormals()

      const edges  = new THREE.EdgesGeometry(clean, EDGE_THRESHOLD)
      edges.applyMatrix4(node.matrixWorld)          // world-space coords

      const pos = edges.attributes.position
      for (let i = 0; i < pos.count; i++) {
        rawEdge.push(pos.getX(i), pos.getY(i), pos.getZ(i))
      }

      clean.dispose()
      edges.dispose()
    } catch (_) { /* skip incompatible mesh */ }
  })

  if (!rawEdge.length) return null

  // ── Normalise: centre + scale to unit cube ────────────────────────────────
  let minX = Infinity, maxX = -Infinity
  let minY = Infinity, maxY = -Infinity
  let minZ = Infinity, maxZ = -Infinity

  for (let i = 0; i < rawEdge.length; i += 3) {
    minX = Math.min(minX, rawEdge[i]);   maxX = Math.max(maxX, rawEdge[i])
    minY = Math.min(minY, rawEdge[i+1]); maxY = Math.max(maxY, rawEdge[i+1])
    minZ = Math.min(minZ, rawEdge[i+2]); maxZ = Math.max(maxZ, rawEdge[i+2])
  }
  const cx   = (minX + maxX) / 2
  const cy   = (minY + maxY) / 2
  const cz   = (minZ + maxZ) / 2
  const span = Math.max(maxX - minX, maxY - minY, maxZ - minZ) || 1

  const normEdge = new Float32Array(rawEdge.length)
  for (let i = 0; i < rawEdge.length; i += 3) {
    normEdge[i]   = (rawEdge[i]   - cx) / span
    normEdge[i+1] = (rawEdge[i+1] - cy) / span
    normEdge[i+2] = (rawEdge[i+2] - cz) / span
  }

  const edgeGeo = new THREE.BufferGeometry()
  edgeGeo.setAttribute('position', new THREE.BufferAttribute(normEdge, 3))

  // ── Ambient particles: sample uniformly from edge vertices ────────────────
  const step    = Math.max(1, Math.floor(normEdge.length / 3 / PARTICLE_COUNT)) * 3
  const pArr    = new Float32Array(PARTICLE_COUNT * 3)
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const src = ((i * step) % normEdge.length)
    pArr[i*3]   = normEdge[src]   + (Math.random() - 0.5) * 0.06
    pArr[i*3+1] = normEdge[src+1] + (Math.random() - 0.5) * 0.06
    pArr[i*3+2] = normEdge[src+2] + (Math.random() - 0.5) * 0.06
  }
  const particleGeo = new THREE.BufferGeometry()
  particleGeo.setAttribute('position', new THREE.BufferAttribute(pArr, 3))

  return { edgeGeo, particleGeo }
}

// ── Inner R3F scene ───────────────────────────────────────────────────────────
function CraneScene({ isDark }) {
  const groupRef   = useRef()
  const lineMatRef = useRef()
  const dotMatRef  = useRef()
  const mouse      = useRef({ x: 0, y: 0 })

  const { scene: gltf } = useGLTF('/origami_crane_study.glb')
  const { viewport }    = useThree()

  const geo      = useMemo(() => buildGeometry(gltf), [gltf])
  const sprite   = useMemo(() => makeSprite(),         [])

  useEffect(() => {
    const h = e => {
      mouse.current.x =  (e.clientX / window.innerWidth)  * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', h, { passive: true })
    return () => window.removeEventListener('mousemove', h)
  }, [])

  useFrame(({ clock }, delta) => {
    if (!groupRef.current) return
    const t  = clock.getElapsedTime()
    const dt = Math.min(delta, 0.05)

    // Fade-in over 1.5 s
    const targetLineOpacity = isDark ? 0.60 : 0.55
    const targetDotOpacity  = isDark ? 0.22 : 0.18
    if (lineMatRef.current) {
      lineMatRef.current.opacity = Math.min(
        lineMatRef.current.opacity + dt / 1.5,
        targetLineOpacity
      )
    }
    if (dotMatRef.current) {
      dotMatRef.current.opacity = Math.min(
        dotMatRef.current.opacity + dt / 2.0,
        targetDotOpacity
      )
    }

    // Slow rotation
    groupRef.current.rotation.y = t * 0.08 + mouse.current.x * 0.10
    groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.035 + mouse.current.y * 0.06

    // Vertical float
    groupRef.current.position.y = Math.sin(t * 0.35) * 0.018
  })

  if (!geo) return null

  // Scale to fill ~75% of the shortest viewport dimension
  const groupScale = Math.min(viewport.width, viewport.height) * 0.72

  const lineColor = isDark ? '#dce6ff' : '#0d1b4b'
  const dotColor  = isDark ? '#a0b4ff' : '#2244aa'

  return (
    <group ref={groupRef} scale={groupScale}>

      {/* Primary: edge wireframe */}
      <lineSegments geometry={geo.edgeGeo}>
        <lineBasicMaterial
          ref={lineMatRef}
          color={lineColor}
          transparent
          opacity={0}
          depthWrite={false}
        />
      </lineSegments>

      {/* Secondary: sparse ambient particles */}
      <points geometry={geo.particleGeo}>
        <pointsMaterial
          ref={dotMatRef}
          map={sprite}
          color={dotColor}
          size={0.012}
          sizeAttenuation
          transparent
          opacity={0}
          alphaTest={0.004}
          depthWrite={false}
        />
      </points>

    </group>
  )
}

// ── Exported component ────────────────────────────────────────────────────────
export default function CraneParticles() {
  const isDark = useIsDark()

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 2.0], fov: 42 }}
        gl={{
          antialias: true,             // edges need AA to look sharp
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
        }}
        dpr={[1, Math.min(window.devicePixelRatio, 2)]}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <CraneScene isDark={isDark} />
        </Suspense>
      </Canvas>
    </div>
  )
}

useGLTF.preload('/origami_crane_study.glb')
