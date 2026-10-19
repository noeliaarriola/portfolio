import { useEffect } from 'react'

export default function useScrollAnimations() {
  useEffect(() => {
    // ─── Grab globals loaded via <script> tags in index.html ─────────────────
    const { THREE, gsap, ScrollTrigger, ScrollToPlugin } = window

    // Failsafe: the hero starts hidden in CSS for the entrance animation, so
    // anything that prevents the animation from running has to reveal it.
    const revealHero = () => {
      document
        .querySelectorAll('.giant-heading .word, .hero-tagline, .hero-cta')
        .forEach((el) => {
          el.style.opacity = '1'
          el.style.transform = 'none'
        })
    }

    if (!THREE || !gsap) {
      console.warn('Three.js or GSAP not found. Check index.html script tags.')
      revealHero()
      return
    }

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

    // ─── Device & preference flags ───────────────────────────────────────────
    const mq = (q) => window.matchMedia(q).matches
    const reduceMotion = mq('(prefers-reduced-motion: reduce)')
    const isNarrow     = mq('(max-width: 900px)')
    const isCoarse     = mq('(pointer: coarse)')
    const saveData     = navigator.connection?.saveData === true
    const lowMemory    = (navigator.deviceMemory ?? 8) < 4
    // The crane is an 11 MB GLB whose edge extraction walks ~900K triangles,
    // all to draw a faint wireframe on section 4. Phones and tablets get a
    // pre-extracted light version instead (public/origami_crane_mobile.bin,
    // ~600 KB: the same fold lines, already normalised, nothing to compute).
    // Skipped entirely on a metered connection, low memory or reduced motion.
    const skipCrane = saveData || lowMemory || reduceMotion
    const useLightCrane = isNarrow
    // a small wireframe on a phone needs more ink than the large desktop one
    const craneMaxOpacity = isNarrow ? 0.35 : 0.2

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

    // Antialiasing costs real fill rate on mobile GPUs and buys almost
    // nothing on 1px wireframes. Capping the pixel ratio at 1.5 there roughly
    // halves the fragment work versus the old flat cap of 2 on a 3x screen.
    const maxDpr = () => (isNarrow || isCoarse ? 1.5 : 2)

    // A blocked or unavailable WebGL context throws here. That used to abort
    // the entire effect, so the GSAP timeline, nav links and CTA handlers were
    // never wired up and the hero stayed at opacity 0 — a blank page on any
    // device without WebGL. Fall through to the 2D half of the hook instead.
    let renderer = null
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: !(isNarrow || isCoarse),
        alpha: true,
        powerPreference: 'low-power',
      })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxDpr()))
      renderer.setSize(container.clientWidth, container.clientHeight)
    } catch (err) {
      console.warn('WebGL unavailable — continuing without the 3D layer.', err)
      canvas.style.display = 'none'
    }

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

    // Shared frustum half-extents at z=0: how much world-space is actually
    // visible, in both directions. Constant vertically (fixed vertical fov),
    // scales horizontally with the container's own aspect ratio.
    const getFrustumHalfExtents = () => {
      const aspect = container.clientWidth / container.clientHeight
      const halfH  = Math.tan(22.5 * Math.PI / 180) * camera.position.z
      return { halfW: halfH * aspect, halfH }
    }

    // The globe's base radius is 1.7 world units — smaller than the
    // desktop frustum's half-width (~2.8+), but *bigger* than a phone's
    // (~0.99). Moving an object that large toward a corner on a narrow
    // screen doesn't make it read as "a globe in the corner" — it just
    // changes which slice of an oversized sphere is cropped off, and what's
    // left on screen is a handful of stray mesh lines, easy to mistake for
    // not being there at all. Scaling it down on portrait screens so its
    // radius is comfortably under the frustum half-width is what actually
    // makes a whole, recognizable circle fit in the corner.
    const getGlobeScale = () =>
      container.clientWidth / container.clientHeight < 1 ? 0.45 : 1

    // Bottom-right corner placement, expressed as fractions of the frustum
    // half-extents so it holds up across different portrait aspect ratios
    // (a narrow phone vs. a squarer small tablet), not just the one device
    // this was tuned against. At scale 0.45 (radius 0.765) this leaves the
    // circle mostly on-screen (~87% of its own width/height visible on a
    // 375-wide phone, per the frustum-intersection math) with only a slight
    // bleed past the corner — verified by rendering and inspecting the
    // actual screenshot, not computed blind.
    const getGlobePos = () => {
      const { halfW, halfH } = getFrustumHalfExtents()
      const aspect = container.clientWidth / container.clientHeight
      if (aspect < 1) {
        return { x: halfW * 0.43, y: -halfH * 0.74 }
      }
      return { x: aspect * 1.2, y: -1.7 }
    }

    // World-space position and scale for the crane.
    // Desktop: right of centre, below the contact links, large (it bleeds off
    // the right edge on purpose). Below 900px the side rails are gone and the
    // contact block is centred, so the whole composition (hand + cranes) is
    // scaled to the screen — about the full width (it bleeds slightly off
    // the sides, like on desktop) and at most 28% of the height — and
    // centred horizontally in the free space under the links. The 0.038 /
    // 0.0275 terms re-centre the model: its projected bounds are slightly
    // off its origin (measured by projecting every vertex at the rendered
    // rotation, then checked against a screenshot).
    const getCranePos = () => {
      const { halfW, halfH } = getFrustumHalfExtents()
      // same breakpoint as the CSS (the canvas container is narrower than the
      // window on desktop, so its own width can't be used for this)
      if (!window.matchMedia('(max-width: 900px)').matches) {
        return { x: halfW * 0.15, y: -halfH * 0.4, scale: 5.8 }
      }
      const scale = Math.min(halfW * 2.4, halfH * 1.11)
      return { x: -0.038 * scale, y: -halfH * 0.66 + 0.0275 * scale, scale }
    }
    {
      const p = getGlobePos()
      globe.position.set(p.x, p.y, 0)
      globe.scale.setScalar(getGlobeScale())
    }
    scene.add(globe)

    // Origami Crane (visible on section 4) — the GLB is 11 MB. Fetched right
    // away on mount (not blocking: fetch() is async and the heavy wireframe
    // build below is time-sliced across frames) so it's ready well before the
    // user scrolls down to section 4, instead of only starting then.
    let craneGroup = null
    let craneMaterial = null
    let craneBaseX = 0, craneBaseY = 0
    let craneLoadStarted = false

    // WireframeGeometry (the previous approach) keeps every single triangle
    // edge — for this mesh's ~900K triangles that's several million line
    // vertices, tens of MB of intermediate typed arrays held in memory all
    // at once. That's almost certainly what was crashing the tab. Switching
    // to EdgesGeometry keeps only edges between faces that actually meet at
    // an angle (real creases) and silently discards the flat internal
    // triangulation — for a faceted origami model that's a small fraction
    // of the geometry, and it's the more correct look besides (fold lines,
    // not every internal triangle diagonal). Cheap enough to do one mesh
    // per animation frame with no further splitting needed.
    const CRANE_FRAME_BUDGET_MS = 8
    let craneRafId = null
    let disposed = false

    // Shared by both sources: positions are line-segment vertices already
    // centred and scaled to a unit cube.
    const buildCrane = (positions) => {
      craneMaterial = new THREE.LineBasicMaterial({
        color: threeColor(),
        transparent: true,
        opacity: 0,
        linewidth: 1,
      })
      const geom = new THREE.BufferGeometry()
      geom.setAttribute('position', new THREE.BufferAttribute(positions, 3))

      craneGroup = new THREE.Group()
      craneGroup.add(new THREE.LineSegments(geom, craneMaterial))

      const cp = getCranePos()
      craneGroup.scale.setScalar(cp.scale)
      craneGroup.rotation.set(1.2, -Math.PI * -0.75, 1.95)
      craneBaseX = cp.x
      craneBaseY = cp.y
      craneGroup.position.set(cp.x, cp.y, 0)
      scene.add(craneGroup)

      // Snap opacity to current scroll position in case the user is already at sec-4
      const p0 = window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      craneMaterial.opacity = Math.max(0, Math.min(1, (p0 - 0.85) / 0.15)) * craneMaxOpacity
    }

    // Phones/tablets: Int16 vertex triplets (value / 65534 = unit-cube coord),
    // made offline from the GLB's fold edges and thinned to 50K segments.
    const loadLightCrane = () => {
      if (craneLoadStarted) return
      craneLoadStarted = true
      fetch('/origami_crane_mobile.bin')
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`)
          return res.arrayBuffer()
        })
        .then((buf) => {
          if (disposed) return
          const q = new Int16Array(buf)
          const positions = new Float32Array(q.length)
          for (let i = 0; i < q.length; i++) positions[i] = q[i] / 65534
          buildCrane(positions)
        })
        .catch((err) => console.warn('Crane (mobile) failed to load:', err))
    }

    const loadCrane = () => {
      if (craneLoadStarted || !THREE.GLTFLoader) return
      craneLoadStarted = true
      const loader = new THREE.GLTFLoader()
      loader.load('/origami_crane_study.glb', (gltf) => {
        gltf.scene.updateMatrixWorld(true)
        const meshNodes = []
        gltf.scene.traverse((node) => {
          if (node.isMesh && node.geometry) meshNodes.push(node)
        })
        if (!meshNodes.length) return

        const rawArrays = []
        let minX = Infinity, maxX = -Infinity
        let minY = Infinity, maxY = -Infinity
        let minZ = Infinity, maxZ = -Infinity
        let meshIndex = 0

        const processOneMesh = () => {
          const node = meshNodes[meshIndex]
          try {
            const geom = node.geometry.clone().applyMatrix4(node.matrixWorld)
            const edges = new THREE.EdgesGeometry(geom, 1)
            const arr = edges.attributes.position.array
            // Read the typed array directly (no getX/getY/getZ accessor calls)
            for (let i = 0; i < arr.length; i += 3) {
              const x = arr[i], y = arr[i + 1], z = arr[i + 2]
              if (x < minX) minX = x; if (x > maxX) maxX = x
              if (y < minY) minY = y; if (y > maxY) maxY = y
              if (z < minZ) minZ = z; if (z > maxZ) maxZ = z
            }
            rawArrays.push(arr)
            edges.dispose()
            geom.dispose()
          } catch (_) { /* skip incompatible mesh */ }
          meshIndex++
        }

        const processFrame = () => {
          const frameStart = performance.now()
          while (meshIndex < meshNodes.length && performance.now() - frameStart < CRANE_FRAME_BUDGET_MS) {
            processOneMesh()
          }
          if (meshIndex < meshNodes.length) {
            craneRafId = requestAnimationFrame(processFrame)
          } else {
            finalizeCrane()
          }
        }

        const finalizeCrane = () => {
          craneRafId = null
          if (!rawArrays.length) return

          // Normalise: centre + scale to unit cube
          const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2, cz = (minZ + maxZ) / 2
          const span = Math.max(maxX - minX, maxY - minY, maxZ - minZ) || 1

          // Merge all wireframe geometries into ONE LineSegments — single draw call per frame.
          // Pre-size the buffer and copy in one pass per chunk instead of push()-ing
          // scalar-by-scalar (push() on a plain array is far slower at this scale).
          let totalLength = 0
          for (const arr of rawArrays) totalLength += arr.length
          const allPos = new Float32Array(totalLength)
          let offset = 0
          for (const arr of rawArrays) {
            for (let i = 0; i < arr.length; i += 3) {
              allPos[offset++] = (arr[i] - cx) / span
              allPos[offset++] = (arr[i + 1] - cy) / span
              allPos[offset++] = (arr[i + 2] - cz) / span
            }
          }
          if (!disposed) buildCrane(allPos)
        }

        processFrame()
      }, undefined, (err) => {
        console.warn('GLB failed to load:', err)
      })
    }
    // Gated: see `skipCrane` / `useLightCrane` above. On a phone the 11 MB
    // download and ~900K triangles of edge extraction never happen at all.
    if (!skipCrane) {
      if (useLightCrane) loadLightCrane()
      else loadCrane()
    }

    // Update Three.js material colors when the theme changes
    const onThemeChange = (e) => {
      const color = e.detail.dark ? 0xefefef : 0x0a0a0a
      globeMaterial.color.setHex(color)
      if (craneMaterial) craneMaterial.color.setHex(color)
    }
    document.addEventListener('themechange', onThemeChange)

    // Resize
    const applyResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      if (renderer) {
        renderer.setSize(w, h)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxDpr()))
      }
      {
        // Also re-applied on resize, not just at mount: rotating a phone
        // from portrait to landscape crosses the aspect<1 threshold, and
        // without this the globe would keep whichever scale it was created
        // at.
        const p = getGlobePos()
        globe.position.x = p.x
        globe.position.y = p.y
        globe.scale.setScalar(getGlobeScale())
      }
      if (craneGroup) {
        const { x, y, scale } = getCranePos()
        craneBaseX = x
        craneBaseY = y
        craneGroup.position.set(x, y, 0)
        craneGroup.scale.setScalar(scale)
      }
    }

    // Mobile browsers fire `resize` every time the URL bar collapses or comes
    // back mid-scroll, with the width unchanged. Reallocating the drawing
    // buffer for that is a visible hitch, so on touch ignore events that did
    // not actually change the width, and debounce the ones that did.
    let lastWidth = container.clientWidth
    let resizeTimer = null
    const onResize = () => {
      const w = container.clientWidth
      if (isCoarse && w === lastWidth) return
      lastWidth = w
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(applyResize, 120)
    }
    window.addEventListener('resize', onResize)

    // Mouse parallax — pointer devices only; this never fires on touch, so
    // there is no reason to hold the listener there.
    let mouseX = 0, mouseY = 0
    let targetX = 0, targetY = 0
    const onMouseMove = (e) => {
      targetX = (e.clientX / window.innerWidth) * 2 - 1
      targetY = -(e.clientY / window.innerHeight) * 2 + 1
    }
    if (!isCoarse) window.addEventListener('mousemove', onMouseMove, { passive: true })

    // ─── Render loop ─────────────────────────────────────────────────────────
    // Three things the old always-on 60fps loop did not do:
    //   1. stop entirely while the tab is hidden,
    //   2. run at half rate on touch devices — with no cursor the only
    //      autonomous motion is a 0.001 rad/frame globe spin, which is
    //      indistinguishable at 30fps,
    //   3. stop drawing once everything has faded to zero opacity, which on
    //      mobile (no crane) means the whole of sections 2-4.
    let animFrameId = null
    let frameParity = 0
    let drewEmptyFrame = false

    const nothingVisible = () =>
      globeMaterial.opacity <= 0.002 &&
      (!craneMaterial || craneMaterial.opacity <= 0.002)

    const animate = () => {
      animFrameId = requestAnimationFrame(animate)

      // Half rate on touch devices.
      if (isCoarse && (frameParity ^= 1)) return

      // Reduced motion: keep rendering (so the globe/crane and their
      // scroll-driven opacity fades stay visible), just freeze the ambient
      // idle rotation and cursor parallax that has no functional purpose.
      if (!reduceMotion) {
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
      }

      if (!renderer) return

      if (nothingVisible()) {
        // Draw one last (blank) frame so the canvas is actually cleared, then
        // idle until something fades back in.
        if (!drewEmptyFrame) {
          renderer.render(scene, camera)
          drewEmptyFrame = true
        }
        return
      }
      drewEmptyFrame = false
      renderer.render(scene, camera)
    }

    const startLoop = () => { if (animFrameId === null) animate() }
    const stopLoop = () => {
      if (animFrameId !== null) cancelAnimationFrame(animFrameId)
      animFrameId = null
    }
    const onVisibility = () => (document.hidden ? stopLoop() : startLoop())
    document.addEventListener('visibilitychange', onVisibility)

    // The loop still runs under reduced motion — see the guard inside
    // animate() above — so the globe/crane render and their scroll-driven
    // fades keep working; only the idle rotation and parallax are frozen.
    startLoop()

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
    if (reduceMotion) {
      // Same end state, no travel.
      gsap.set('.giant-heading .word', { y: 0, autoAlpha: 1 })
      gsap.set('.hero-tagline', { y: 0, autoAlpha: 0.55 })
      gsap.set('.hero-cta', { autoAlpha: 1 })
    } else {
      gsap.to('.giant-heading .word', {
        y: 0, autoAlpha: 1, duration: 1.0, stagger: 0.14, ease: 'power3.out', delay: 0.2,
      })
      gsap.to('.hero-tagline', {
        y: 0, autoAlpha: 0.55, duration: 0.8, delay: 0.6, ease: 'power3.out',
      })
      gsap.to('.hero-cta', {
        autoAlpha: 1, duration: 0.7, delay: 1.0, ease: 'power2.out',
      })
    }

    // ─── About section overflow reveal (mobile) ───────────────────────────────
    // On mobile, .col-center's content (headline + paragraph + photo) can be
    // taller than #sec-2 itself — matching the photo to the paragraph's
    // width plus a full-length ES/PT bio makes that the common case, not an
    // edge case. #sec-2 clips it (overflow:hidden, in index.css); this
    // tween slides the content up by exactly the overflow amount, as part
    // of the SAME scrubbed timeline driving every other section transition
    // — scrolling through it feels identical to the rest of the page,
    // rather than behaving like a separate scrollable widget.
    const aboutColCenter = document.querySelector('#sec-2 .col-center')
    const getAboutOverflow = () =>
      aboutColCenter ? Math.max(0, aboutColCenter.scrollHeight - aboutColCenter.clientHeight) : 0
    // A function value (not a plain number) so `.invalidate()` on resize —
    // see below — picks up a freshly measured overflow instead of the
    // stale one captured when the timeline was first built.
    const aboutRevealTween = gsap.to('#sec-2 .col-center', {
      y: () => -getAboutOverflow(),
      duration: 1.2,
      ease: 'none',
    })

    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.scroll-height-holder',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.3,
      },
    })

    mainTl
      // S1 → S2: words sweep up first; section fades only after last word clears
  .to('.giant-heading .word', { yPercent: -120, skewX: 6, stagger: 0.08, duration: 0.45, ease: 'power2.in' }, 0)
  .to(globeMaterial, { opacity: 0, duration: 0.8 }, 0)
  .to(globe.scale, { x: 0, y: 0, z: 0, duration: 0.8, ease: 'power2.in' }, 0)
  .to('#sec-1', { autoAlpha: 0, y: -20, duration: 0.4 }, 0.7)
  .to('#sec-2', { autoAlpha: 1, y: 0, duration: 1 }, 0.5)
  // S2 holds fully visible until 3.3 (was 2.7) — even more settle time
  // Overflow reveal happens inside that hold, well clear of both the
  // fade-in (ends 1.5) and fade-out (starts 3.3) so it never overlaps a
  // cross-fade — the whole photo is on screen before S2 starts leaving.
  .add(aboutRevealTween, 1.7)
  // S2 → S3
  .to('#sec-2', { autoAlpha: 0, y: -30, duration: 1 }, 3.3)
  .to('#sec-3', { autoAlpha: 1, y: 0, duration: 1 }, 3.8)
  // S3 holds fully visible until 6.6 (was 5.4)
  // S3 → S4
  .to('#sec-3', { autoAlpha: 0, y: -30, duration: 1 }, 6.6)
  .to('#sec-4', { autoAlpha: 1, y: 0, duration: 1 }, 7.1)

    // ScrollTrigger measures '.scroll-height-holder' height synchronously
    // right here — but web fonts and project-thumbnail images can still be
    // loading at this point and change page height afterward, leaving the
    // trigger's cached end position stale (progress then never advances
    // past 0, no matter how much the user scrolls). Refresh once now and
    // again after everything has actually finished loading.
    ScrollTrigger.refresh()
    const onWindowLoad = () => {
      // Web fonts finishing late can reflow the bio paragraph (more/fewer
      // lines), changing how much .col-center actually overflows by.
      aboutRevealTween.invalidate()
      ScrollTrigger.refresh()
    }
    window.addEventListener('load', onWindowLoad)

    // Same reasoning on resize/orientation-change: the overflow amount is
    // layout-dependent (viewport width changes how the photo and paragraph
    // wrap), so the captured y-target needs re-measuring, not just reuse.
    const onAboutResize = () => aboutRevealTween.invalidate()
    window.addEventListener('resize', onAboutResize)

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
      const idx = progress < 0.12 ? 0 : progress < 0.5 ? 1 : progress < 0.91 ? 2 : 3
      navLinks.forEach((link, i) => link?.classList.toggle('active', i === idx))
      // Crane fades in during the last ~15% of scroll (roughly when sec-4 becomes visible)
      if (craneMaterial) {
        craneMaterial.opacity = Math.max(0, Math.min(1, (progress - 0.85) / 0.15)) * craneMaxOpacity
      }
    }
    window.addEventListener('scroll', onScroll)
    onScroll() // covers page loads that restore mid-scroll (e.g. browser back/forward)

    navLinks.forEach((link, idx) => {
      link?.addEventListener('click', (e) => {
        e.preventDefault()
        const total = document.documentElement.scrollHeight - window.innerHeight
        const targets = [0, 0.22, 0.62, 1]
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
    const onCtaViewWork = () => scrollToProgress(0.62)
    const onCtaContact  = () => scrollToProgress(1.0)
    ctaViewWork?.addEventListener('click', onCtaViewWork)
    ctaContact?.addEventListener('click', onCtaContact)

    let previewFrame

    // ─── Cleanup on unmount ───────────────────────────────────────────────────
    // React StrictMode mounts/unmounts in dev; this prevents duplicated listeners.
    return () => {
      disposed = true
      stopLoop()
      clearTimeout(resizeTimer)
      cancelAnimationFrame(previewFrame)
      if (craneRafId !== null) cancelAnimationFrame(craneRafId)
      wordWrappers.forEach(clip => {
        if (clip.parentNode) {
          while (clip.firstChild) clip.parentNode.insertBefore(clip.firstChild, clip)
          clip.parentNode.removeChild(clip)
        }
      })
      document.removeEventListener('themechange', onThemeChange)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('resize', onAboutResize)
      window.removeEventListener('load', onWindowLoad)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onScroll)
      ctaViewWork?.removeEventListener('click', onCtaViewWork)
      ctaContact?.removeEventListener('click', onCtaContact)
      if (craneGroup) {
        craneGroup.traverse((obj) => { if (obj.geometry) obj.geometry.dispose() })
        scene.remove(craneGroup)
      }
      // The globe's own buffers were never released — under StrictMode's
      // double-mount that leaked a copy on every dev remount.
      globeWireframe.dispose()
      globeGeom.dispose()
      globeMaterial.dispose()
      renderer?.dispose()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, []) // Empty array = run once after first render
}
