// HoverPreview.jsx
// A fixed-position image that appears near the cursor when hovering a project row.
// Visibility and position are controlled by the useHoverPreview hook (via JS/GSAP),
// not by React state — this avoids unnecessary re-renders on every mouse move.
export default function HoverPreview() {
  return (
    <div className="project-hover-preview" id="hover-preview">
      <img src="" alt="Project Preview" />
    </div>
  )
}
