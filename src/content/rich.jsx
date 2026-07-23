// rich.jsx
// Shared helpers for translated case-study content.
// - richParts / P: render a string, turning **double-asterisk** spans into <strong>.
// - Process: a row of steps separated by arrows (direct flex children).
// - Results: the numbered outcome grid, with an optional "→" highlight item.
import { Fragment } from 'react'

export function richParts(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={i}>{part.slice(2, -2)}</strong>
      : <Fragment key={i}>{part}</Fragment>
  )
}

// A <p> whose text may contain **bold** markers.
export function P({ text, ...rest }) {
  return <p {...rest}>{richParts(text)}</p>
}

// Process steps rendered as direct flex children: step → arrow → step …
export function Process(steps, style) {
  return (
    <div className="modal-process" style={style}>
      {steps.map((step, i) => (
        <Fragment key={i}>
          <span>{step}</span>
          {i < steps.length - 1 && <span className="modal-process-arrow">→</span>}
        </Fragment>
      ))}
    </div>
  )
}

// Numbered results grid; `highlight` (optional) renders as a final "→" item.
export function Results(items, highlight) {
  return (
    <div className="modal-results">
      {items.map((text, i) => (
        <div className="modal-results-item" key={i}>
          <span className="modal-results-num">{String(i + 1).padStart(2, '0')}</span>
          <span className="modal-results-text">{text}</span>
        </div>
      ))}
      {highlight && (
        <div className="modal-results-item">
          <span className="modal-results-num">→</span>
          <span className="modal-results-text">{highlight}</span>
        </div>
      )}
    </div>
  )
}
