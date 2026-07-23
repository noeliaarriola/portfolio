import { useEffect } from 'react'

export default function useScrollAnimations() {
  useEffect(() => {
    // ─── Grab globals loaded via <script> tags in index.html ─────────────────
    const { THREE, gsap, ScrollTrigger, ScrollToPlugin } = window

    if (!THREE || !gsap) {
      console.warn('Three.js or GSAP not found. Check index.html script tags.')
      // Failsafe: the hero starts hidden in CSS for the entrance animation.
      // Without GSAP it would stay invisible, so reveal it directly.
      document
        .querySelectorAll('.giant-heading .word, .hero-tagline, .hero-cta')
        .forEach((el) => {
          el.style.opacity = '1'
          el.style.transform = 'none'
        })
      return
    }

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

    // ─── Three.js Scene ───────────────────────────────────────────────────────
    const canvas = document.getElementById('three-canvas')
    const container = canvas.parentElement
    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    )
    camera.position.z = 5.2

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)

    const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark'
    const threeColor = () => isDark() ? 0xefefef : 0x0a0a0a

    // Globe (visible on section 1)
    const globeGeom = new THREE.SphereGeometry(1.7, 24, 24)
    const globeWireframe = new THREE.WireframeGeometry(globeGeom)
    const globeMaterial = new THREE.LineBasicMaterial({
      color: threeColor(),
      transparent: true,
      opacity: 0.2,
      linewidth: 1,
    })
    const globe = new THREE.LineSegments(globeWireframe, globeMaterial)
    const getGlobeX = () => (container.clientWidth / container.clientHeight) * 1.2

    // World-space position for the crane — right-center so it's fully visible
    const getCranePos = () => {
      const aspect = container.clientWidth / container.clientHeight
      const halfH  = Math.tan(22.5 * Math.PI / 180) * camera.position.z
      const halfW  = halfH * aspect
      return { x: halfW * 0.15, y: -halfH * 0.4 }
    }
    globe.position.set(getGlobeX(), -1.7, 0)
    scene.add(globe)

    // Origami Crane (visible on section 4) — loaded async, never blocks
    let craneGroup = null
    let craneMaterial = null
    let craneBaseX = 0, craneBaseY = 0

    if (THREE.GLTFLoader) {
      const loader = new THREE.GLTFLoader()
      loader.load('/origami_crane_study.glb', (gltf) => {
        const wires = []
        let minX = Infinity, maxX = -Infinity
        let minY = Infinity, maxY = -Infinity
        let minZ = Infinity, maxZ = -Infinity

        gltf.scene.updateMatrixWorld(true)
        gltf.scene.traverse((node) => {
          if (!node.isMesh || !node.geometry) return
          try {
            const geom = node.geometry.clone().applyMatrix4(node.matrixWorld)
            // WireframeGeometry always produces edges regardless of vertex sharing
            const wire = new THREE.WireframeGeometry(geom)
            const pos = wire.attributes.position
            for (let i = 0; i < pos.count; i++) {
              const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i)
              if (x < minX) minX = x; if (x > maxX) maxX = x
              if (y < minY) minY = y; if (y > maxY) maxY = y
              if (z < minZ) minZ = z; if (z > maxZ) maxZ = z
            }
            wires.push(wire)
            geom.dispose()
          } catch (_) { /* skip incompatible mesh */ }
        })

        if (!wires.length) return

        // Normalise: centre + scale to unit cube
        const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2, cz = (minZ + maxZ) / 2
        const span = Math.max(maxX - minX, maxY - minY, maxZ - minZ) || 1

        craneMaterial = new THREE.LineBasicMaterial({
          color: threeColor(),
          transparent: true,
          opacity: 0,
          linewidth: 1,
        })

        // Merge all wireframe geometries into ONE LineSegments — single draw call per frame
        const allPos = []
        wires.forEach((wire) => {
          const pos = wire.attributes.position
          for (let i = 0; i < pos.count; i++) {
            allPos.push(
              (pos.getX(i) - cx) / span,
              (pos.getY(i) - cy) / span,
              (pos.getZ(i) - cz) / span
            )
          }
          wire.dispose()
        })
        const mergedGeom = new THREE.BufferGeometry()
        mergedGeom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(allPos), 3))

        craneGroup = new THREE.Group()
        craneGroup.add(new THREE.LineSegments(mergedGeom, craneMaterial))

        const cp = getCranePos()
        craneGroup.scale.setScalar(5.8)
        craneGroup.rotation.set(1.2, -Math.PI * -0.75, 1.95)
        craneBaseX = cp.x
        craneBaseY = cp.y
        craneGroup.position.set(cp.x, cp.y, 0)
        scene.add(craneGroup)

        // Snap opacity to current scroll position in case the user is already at sec-4
        const p0 = window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
        craneMaterial.opacity = Math.max(0, Math.min(1, (p0 - 0.82) / 0.15)) * 0.2
      }, undefined, (err) => {
        console.warn('GLB failed to load:', err)
      })
    }

    // Update Three.js material colors when the theme changes
    const onThemeChange = (e) => {
      const color = e.detail.dark ? 0xefefef : 0x0a0a0a
      globeMaterial.color.setHex(color)
      if (craneMaterial) craneMaterial.color.setHex(color)
    }
    document.addEventListener('themechange', onThemeChange)

    // Resize
    const onResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      globe.position.x = getGlobeX()
      if (craneGroup) {
        const { x, y } = getCranePos()
        craneBaseX = x
        craneBaseY = y
        craneGroup.position.set(x, y, 0)
      }
    }
    window.addEventListener('resize', onResize)

    // Mouse parallax
    let mouseX = 0, mouseY = 0
    let targetX = 0, targetY = 0
    const onMouseMove = (e) => {
      targetX = (e.clientX / window.innerWidth) * 2 - 1
      targetY = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    // Render loop
    let animFrameId
    const animate = () => {
      animFrameId = requestAnimationFrame(animate)
      mouseX += (targetX - mouseX) * 0.10
      mouseY += (targetY - mouseY) * 0.10

      globe.rotation.y += 0.001
      globe.rotation.x = mouseY * 0.15
      globe.rotation.y += mouseX * 0.01

      // Crane: mouse parallax + position drift away from cursor
      if (craneGroup) {
        craneGroup.rotation.x = -0.15 + mouseY * 0.15
        craneGroup.rotation.y = -Math.PI * 0.1 + mouseX * 0.25
        craneGroup.rotation.z =  0.10 + mouseX * 0.10
        // Drift away from cursor so links are easier to reach
        craneGroup.position.x = craneBaseX - mouseX * 0.2
        craneGroup.position.y = craneBaseY - mouseY * 0.15
      }

      renderer.render(scene, camera)
    }
    animate()

    // ─── GSAP Scroll Timeline ─────────────────────────────────────────────────
    // Wrap each .word in an overflow-hidden clip span so the yPercent exit is masked
    const wordWrappers = []
    document.querySelectorAll('.giant-heading .word').forEach(word => {
      const clip = document.createElement('span')
      clip.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:bottom;'
      word.parentNode.insertBefore(clip, word)
      clip.appendChild(word)
      wordWrappers.push(clip)
    })

    gsap.set('#sec-2, #sec-3, #sec-4', { autoAlpha: 0, y: 30 })
    gsap.set('#sec-1', { autoAlpha: 1, y: 0 })

    // ─── Hero Entrance Animation ──────────────────────────────────────────────
    // All elements start hidden via CSS to prevent a flash before useEffect runs.
    gsap.to('.giant-heading .word', {
      y: 0, autoAlpha: 1, duration: 1.0, stagger: 0.14, ease: 'power3.out', delay: 0.2,
    })
    gsap.to('.hero-tagline', {
      y: 0, autoAlpha: 0.55, duration: 0.8, delay: 0.6, ease: 'power3.out',
    })
    gsap.to('.hero-cta', {
      autoAlpha: 1, duration: 0.7, delay: 1.0, ease: 'power2.out',
    })

    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.scroll-height-holder',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
      },
    })

    mainTl
      // S1 → S2: words sweep up first; section fades only after last word clears
  .to('.giant-heading .word', { yPercent: -120, skewX: 6, stagger: 0.08, duration: 0.45, ease: 'power2.in' }, 0)
  .to(globeMaterial, { opacity: 0, duration: 0.8 }, 0)
  .to(globe.scale, { x: 0, y: 0, z: 0, duration: 0.8, ease: 'power2.in' }, 0)
  .to('#sec-1', { autoAlpha: 0, y: -20, duration: 0.4 }, 0.7)
  .to('#sec-2', { autoAlpha: 1, y: 0, duration: 1 }, 0.5)
  // S2 → S3
  .to('#sec-2', { autoAlpha: 0, y: -30, duration: 1 }, 2)
  .to('#sec-3', { autoAlpha: 1, y: 0, duration: 1 }, 2.5) // antes era 3
  // S3 → S4
  .to('#sec-3', { autoAlpha: 0, y: -30, duration: 1 }, 4)
  .to('#sec-4', { autoAlpha: 1, y: 0, duration: 1 }, 4.5)

    // ─── Nav: Active Link + Smooth Scroll ────────────────────────────────────
    const navLinks = [
      document.getElementById('link-home'),
      document.getElementById('link-about'),
      document.getElementById('link-projects'),
      document.getElementById('link-contact'),
    ]

    const onScroll = () => {
      const progress = window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)
      const idx = progress < 0.25 ? 0 : progress < 0.55 ? 1 : progress < 0.85 ? 2 : 3
      navLinks.forEach((link, i) => link?.classList.toggle('active', i === idx))
      // Crane fades in during the last ~15% of scroll (roughly when sec-4 becomes visible)
      if (craneMaterial) {
        craneMaterial.opacity = Math.max(0, Math.min(1, (progress - 0.82) / 0.15)) * 0.2
      }
    }
    window.addEventListener('scroll', onScroll)

    navLinks.forEach((link, idx) => {
      link?.addEventListener('click', (e) => {
        e.preventDefault()
        const total = document.documentElement.scrollHeight - window.innerHeight
        const targets = [0, 0.35, 0.68, 1]
        gsap.to(window, {
          scrollTo: total * targets[idx],
          duration: 1.5,
          ease: 'power3.inOut',
        })
      })
    })

    document.getElementById('back-to-top-btn')?.addEventListener('click', () => {
      gsap.to(window, { scrollTo: 0, duration: 2.0, ease: 'power4.inOut' })
    })

    const scrollToProgress = (p) => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      gsap.to(window, { scrollTo: total * p, duration: 1.5, ease: 'power3.inOut' })
    }
    const ctaViewWork = document.getElementById('cta-view-work')
    const ctaContact  = document.getElementById('cta-contact')
    const onCtaViewWork = () => scrollToProgress(0.68)
    const onCtaContact  = () => scrollToProgress(1.0)
    ctaViewWork?.addEventListener('click', onCtaViewWork)
    ctaContact?.addEventListener('click', onCtaContact)

    let previewFrame

    // ─── Cleanup on unmount ───────────────────────────────────────────────────
    // React StrictMode mounts/unmounts in dev; this prevents duplicated listeners.
    return () => {
      cancelAnimationFrame(animFrameId)
      cancelAnimationFrame(previewFrame)
      wordWrappers.forEach(clip => {
        if (clip.parentNode) {
          while (clip.firstChild) clip.parentNode.insertBefore(clip.firstChild, clip)
          clip.parentNode.removeChild(clip)
        }
      })
      document.removeEventListener('themechange', onThemeChange)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onScroll)
      ctaViewWork?.removeEventListener('click', onCtaViewWork)
      ctaContact?.removeEventListener('click', onCtaContact)
      if (craneGroup) {
        craneGroup.traverse((obj) => { if (obj.geometry) obj.geometry.dispose() })
        scene.remove(craneGroup)
      }
      renderer.dispose()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, []) // Empty array = run once after first render
}
