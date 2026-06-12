// ThreeCanvas.jsx
// This component is intentionally empty in JSX — it just reserves the canvas element.
// The actual Three.js scene (globe + crane) is initialized inside useScrollAnimations,
// because Three.js needs the canvas to already be in the DOM before it can mount.
// Keeping Three.js logic in the hook (not here) also makes it easy to remove or swap later.
export default function ThreeCanvas() {
  return null
}
