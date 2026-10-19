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

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
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

    let frameId

    new THREE.TextureLoader().load(canvas.getAttribute('data-src'), (texture) => {
      uniforms.uTexture.value = texture
      imageAspect = texture.image.width / texture.image.height
      fit()
      const animate = () => {
        frameId = requestAnimationFrame(animate)
        renderer.render(scene, camera)
      }
      animate()
    })

    const onMouseEnter = () =>
      gsap.to(uniforms.uStrength, { value: 1, duration: 0.4, ease: 'power2.out' })
    const onMouseLeave = () =>
      gsap.to(uniforms.uStrength, { value: 0, duration: 0.6, ease: 'power2.inOut' })

    canvas.addEventListener('mouseenter', onMouseEnter)
    canvas.addEventListener('mouseleave', onMouseLeave)

    return () => {
      cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      canvas.removeEventListener('mouseenter', onMouseEnter)
      canvas.removeEventListener('mouseleave', onMouseLeave)
      renderer.dispose()
    }
  }, [])
}
