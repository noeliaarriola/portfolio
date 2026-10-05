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
  varying vec2 vUv;

  void main() {
    float offset = uStrength * 0.018;

    float r = texture2D(uTexture, vec2(vUv.x + offset, vUv.y)).r;
    float g = texture2D(uTexture, vUv).g;
    float b = texture2D(uTexture, vec2(vUv.x - offset, vUv.y)).b;

    vec4 base = texture2D(uTexture, vUv);
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

    const container = canvas.parentElement
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)

    const scene = new THREE.Scene()

    // The camera's frustum has to match the canvas's actual pixel aspect
    // ratio, or WebGL's viewport mapping stretches the square NDC space
    // (-1..1 both axes) onto a non-square canvas — this is what was
    // distorting the photo, independent of whatever aspect-ratio the CSS
    // box itself had (changing that alone couldn't have fixed it).
    // OrthographicCamera has no built-in `aspect` the way PerspectiveCamera
    // does, so left/right are set manually here and kept in sync on resize.
    const getAspect = () => container.clientWidth / container.clientHeight
    const camera = new THREE.OrthographicCamera(-getAspect(), getAspect(), 1, -1, 0, 1)

    const uniforms = {
      uTexture:  { value: null },
      uStrength: { value: 0.0 },
    }

    // Scaled on the x-axis to exactly fill the camera's frustum (width
    // 2*aspect, height 2) — full-bleed with no gaps and no cropping, which
    // only stays undistorted because the canvas's CSS aspect-ratio (4/5,
    // see .about-photo in index.css) matches the source photo's own ratio.
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader })
    )
    mesh.scale.x = getAspect()
    scene.add(mesh)

    let frameId

    new THREE.TextureLoader().load(canvas.getAttribute('data-src'), (texture) => {
      uniforms.uTexture.value = texture
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

    const onResize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight)
      const aspect = getAspect()
      camera.left = -aspect
      camera.right = aspect
      camera.updateProjectionMatrix()
      mesh.scale.x = aspect
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', onResize)
      canvas.removeEventListener('mouseenter', onMouseEnter)
      canvas.removeEventListener('mouseleave', onMouseLeave)
      renderer.dispose()
    }
  }, [])
}
