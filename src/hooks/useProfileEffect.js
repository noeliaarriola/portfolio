import { useEffect } from 'react'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

// RGB channel split: R shifts right, B shifts left along the horizontal axis.
// uStrength (0→1) drives how far the channels separate.
const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uStrength;
  uniform vec2 uUvScale;
  varying vec2 vUv;

  void main() {
    // "object-fit: cover": uUvScale crops the photo around its centre when
    // the canvas box is not the photo's own ratio, instead of stretching it.
    vec2 uv = (vUv - 0.5) * uUvScale + 0.5;
    float offset = uStrength * 0.018;

    float r = texture2D(uTexture, vec2(uv.x + offset, uv.y)).r;
    float g = texture2D(uTexture, uv).g;
    float b = texture2D(uTexture, vec2(uv.x - offset, uv.y)).b;

    vec4 base = texture2D(uTexture, uv);
    float luma = dot(base.rgb, vec3(0.299, 0.587, 0.114));
    vec3 glitched = mix(vec3(luma), vec3(r, g, b), 0.8);

    gl_FragColor = vec4(glitched, base.a);
  }
`

export default function useProfileEffect() {
  useEffect(() => {
    const { THREE, gsap } = window
    if (!THREE || !gsap) return

    const canvas = document.getElementById('profile-canvas')
    if (!canvas) return

    // Without WebGL (blocked by the browser — Chrome does this for a site
    // after its GPU process has crashed a few times — or unavailable) this
    // constructor throws. Uncaught, that error made React unmount the whole
    // app: a completely white page. Show the plain photo instead and skip
    // the hover effect.
    // The photo is also the canvas's CSS background: WebGL paints over it
    // (the shader is opaque), and whenever WebGL is missing or its context is
    // lost, the plain photo shows through instead of an empty box.
    canvas.style.backgroundImage = `url("${canvas.getAttribute('data-src')}")`
    canvas.style.backgroundSize = 'cover'
    canvas.style.backgroundPosition = 'center'

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    } catch (err) {
      console.warn('WebGL unavailable — showing the profile photo without the effect.', err)
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const scene = new THREE.Scene()

    // A fixed -1..1 frustum and a 2x2 quad: the quad always fills the canvas
    // exactly, whatever its shape. Keeping the photo undistorted is the
    // shader's job (uUvScale), not the geometry's.
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const uniforms = {
      uTexture:  { value: null },
      uStrength: { value: 0.0 },
      uUvScale:  { value: new THREE.Vector2(1, 1) },
    }

    scene.add(new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader })
    ))

    // The canvas box is sized by CSS alone (.about-photo in index.css: width
    // 100% of its container, aspect-ratio 4/5). The drawing buffer follows
    // that box — never the other way round. `false` stops Three from writing
    // an inline width/height on the canvas: that used to freeze the height at
    // its first measurement, so any later change of width (web fonts landing,
    // rotating a phone, resizing the window) left a box with the wrong ratio
    // and a stretched photo.
    let imageAspect = 4 / 5 // replaced by the real value once the photo loads
    const fit = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      if (!w || !h) return
      renderer.setSize(w, h, false)
      const boxAspect = w / h
      if (boxAspect > imageAspect) uniforms.uUvScale.value.set(1, imageAspect / boxAspect)
      else uniforms.uUvScale.value.set(boxAspect / imageAspect, 1)
      // setSize clears the buffer; redraw now rather than flash until the next frame
      if (uniforms.uTexture.value) renderer.render(scene, camera)
    }
    // Fires for every change of the box, not only window resizes.
    const resizeObserver = new ResizeObserver(fit)
    resizeObserver.observe(canvas)
    fit()

    // Render on demand. The shader has no time input: the picture only
    // changes while uStrength is tweening (hover in/out) or when the box is
    // resized. It used to redraw at 60fps forever — even with section 2
    // hidden and a case-study modal open — which kept the GPU busy the whole
    // visit and, together with the heavy case-study images, could exhaust GPU
    // memory and crash the page (white canvas, broken images).
    const draw = () => {
      if (uniforms.uTexture.value) renderer.render(scene, camera)
    }

    new THREE.TextureLoader().load(canvas.getAttribute('data-src'), (texture) => {
      uniforms.uTexture.value = texture
      imageAspect = texture.image.width / texture.image.height
      fit()
      draw()
    })

    const onMouseEnter = () =>
      gsap.to(uniforms.uStrength, { value: 1, duration: 0.4, ease: 'power2.out', onUpdate: draw })
    const onMouseLeave = () =>
      gsap.to(uniforms.uStrength, { value: 0, duration: 0.6, ease: 'power2.inOut', onUpdate: draw })

    // If the GPU drops the context anyway, hide the canvas instead of leaving
    // a blank box, and bring it back when the browser restores it.
    // A lost context leaves the canvas transparent, so the background photo
    // shows; redraw the effect if the browser gives the context back.
    const onContextLost = (e) => { e.preventDefault() }
    const onContextRestored = () => { fit(); draw() }
    canvas.addEventListener('webglcontextlost', onContextLost)
    canvas.addEventListener('webglcontextrestored', onContextRestored)

    canvas.addEventListener('mouseenter', onMouseEnter)
    canvas.addEventListener('mouseleave', onMouseLeave)

    return () => {
      gsap.killTweensOf(uniforms.uStrength)
      resizeObserver.disconnect()
      canvas.removeEventListener('mouseenter', onMouseEnter)
      canvas.removeEventListener('mouseleave', onMouseLeave)
      canvas.removeEventListener('webglcontextlost', onContextLost)
      canvas.removeEventListener('webglcontextrestored', onContextRestored)
      renderer.dispose()
    }
  }, [])
}
