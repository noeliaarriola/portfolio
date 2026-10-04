// JourneyDiagram.jsx
// A purchase journey drawn as two swimlanes: a customer row and a brand row
// (tinted band). Every time the purchase changes hands the path crosses rows;
// where the customer is left waiting, a "wait" chip marks it.
// Pass `before`, `after`, or both. In the Cleear case study the "before" lane
// sits in the Problem section and the "after" lane in the design decision that
// answers it; both keep the same 5-column scale so they read as one comparison.
//
// It is plain HTML + CSS (no image), so every label comes from the case-study
// strings (EN / ES / PT) and the colors follow the theme tokens. The layout
// lives in index.css under ".journey": horizontal when the figure is wide, a
// vertical timeline when it is narrow (container query, not viewport).
//
// Props
//   title   optional small heading above the figure
//   labels  { customer, brand, wait, waits, noWaits, steps }
//   before  { tag, name, steps: [{ who, icon, text }] }   (optional)
//   after   { tag, name, steps: [...] }                   (optional)
//   compare optional lane to quote in the caption, e.g. "Before: 5 steps · 2 waits"
//   accent  optional brand color for the "after" path and its last step
//   onAccent  icon color on top of the accent (default near-black)
//   foot    caption under the figure (overrides the compare caption)
// who is 'c' (customer) or 'b' (brand); icon is a key of ICONS.

// 24×24 line icons, stroke only.
const ICONS = {
  eye:   <><path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z" /><circle cx="12" cy="12" r="2.8" /></>,
  msg:   <path d="M4 5h16v11H9l-5 4z" />,
  reply: <><path d="M20 5H4v11h11l5 4z" /><path d="M8 10.5h.01M12 10.5h.01M16 10.5h.01" /></>,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  grid:  <><rect x="4" y="4" width="6.5" height="6.5" rx="1" /><rect x="13.5" y="4" width="6.5" height="6.5" rx="1" /><rect x="4" y="13.5" width="6.5" height="6.5" rx="1" /><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1" /></>,
  list:  <><path d="M9 7h11M9 12h11M9 17h11" /><path d="M4.5 7h.01M4.5 12h.01M4.5 17h.01" /></>,
  bag:   <><path d="M6 8h12l1 12H5z" /><path d="M9 8V7a3 3 0 0 1 6 0v1" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
}

// Both lanes share one horizontal scale, so the shorter journey visibly ends sooner.
const COLS = 5

// Narrow (vertical) layout geometry, in px. ROW reaches the CSS as --row;
// X must match the node positions in index.css (.journey-step / --b padding).
const ROW = 88             // height of one step
const X = { c: 24, b: 80 } // node center x for customer / brand

const isHandoff = (steps, i) => !!steps[i + 1] && steps[i + 1].who !== steps[i].who
// the customer hands over to the brand and has to wait for an answer
const isWait = (steps, i) => steps[i].who === 'c' && isHandoff(steps, i)

// "5 steps · 2 waits" — counted from the steps, so it can never disagree with the drawing.
function summarize(steps, labels) {
  const waits = steps.filter((_, i) => isWait(steps, i)).length
  return [
    `${steps.length} ${labels.steps}`,
    waits === 0 ? labels.noWaits : `${waits} ${waits === 1 ? labels.wait : labels.waits}`,
  ].join(' · ')
}

function Lane({ lane, labels, yc, yb, isAfter }) {
  const { steps } = lane
  const next = (i) => steps[i + 1]
  const hasBrand = steps.some((s) => s.who === 'b')

  // Wide plot height: room under the brand row only when it has labels.
  const height = yb + (hasBrand ? 104 : 36)
  const wideY = (s) => (s.who === 'c' ? yc : yb)
  const wideX = (i) => `${((i + 0.5) / COLS) * 100}%`

  return (
    <div
      className={`journey-lane${isAfter ? ' journey-lane--after' : ''}`}
      style={{
        '--n': COLS,
        '--steps': steps.length,
        '--row': `${ROW}px`,
        '--yc': `${yc}px`,
        '--yb': `${yb}px`,
        '--h': `${height}px`,
      }}
    >
      <div className="journey-side">
        <span className="journey-tag">{lane.tag}</span>
        <span className="journey-name">{lane.name}</span>
        <span className="journey-summary">{summarize(steps, labels)}</span>
      </div>

      <div className="journey-plot">
        <span className="journey-row journey-row--c" aria-hidden="true">{labels.customer}</span>
        <span className="journey-row journey-row--b" aria-hidden="true">{labels.brand}</span>
        <span className="journey-rule" aria-hidden="true" />
        <span className="journey-band" aria-hidden="true" />

        {/* Connectors: solid inside one row, dotted when the purchase changes hands */}
        <svg className="journey-lines journey-lines--wide" aria-hidden="true">
          {steps.map((s, i) => next(i) && (
            <line
              key={i}
              className={isHandoff(steps, i) ? 'is-handoff' : undefined}
              x1={wideX(i)} y1={wideY(s)} x2={wideX(i + 1)} y2={wideY(next(i))}
            />
          ))}
        </svg>
        <svg className="journey-lines journey-lines--narrow" aria-hidden="true">
          {steps.map((s, i) => next(i) && (
            <line
              key={i}
              className={isHandoff(steps, i) ? 'is-handoff' : undefined}
              x1={X[s.who]} y1={i * ROW + ROW / 2} x2={X[next(i).who]} y2={(i + 1) * ROW + ROW / 2}
            />
          ))}
        </svg>

        <ol className="journey-steps">
          {steps.map((s, i) => (
            <li key={i} className={`journey-step journey-step--${s.who}`} style={{ '--i': i }}>
              <span className={`journey-node${isAfter && i === steps.length - 1 ? ' is-end' : ''}`}>
                <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">{ICONS[s.icon]}</svg>
              </span>
              <span className="journey-label">
                <span className="journey-who">{s.who === 'c' ? labels.customer : labels.brand}</span>
                {s.text}
              </span>
            </li>
          ))}
        </ol>

        {steps.map((_, i) => isWait(steps, i) && (
          <span key={i} className="journey-chip" style={{ '--i': i }} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="11" height="11">{ICONS.clock}</svg>
            {labels.wait}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function JourneyDiagram({ title, labels, before, after, compare, accent, onAccent = '#0a0a0a', foot }) {
  const caption = foot ?? (compare && `${compare.tag}: ${summarize(compare.steps, labels)}`)
  const name = title ?? [before, after].filter(Boolean).map((l) => `${l.tag}: ${l.name}`).join(' / ')
  return (
    <>
      {title && <h4 className="modal-list-title">{title}</h4>}
      <figure className="journey" aria-label={name} style={accent ? { '--journey-accent': accent, '--journey-on-accent': onAccent } : undefined}>
        <div className="journey-frame">
          {before && <Lane lane={before} labels={labels} yc={104} yb={212} />}
          {after && <Lane lane={after} labels={labels} yc={84} yb={164} isAfter />}
        </div>
        {caption && <figcaption className="journey-foot">{caption}</figcaption>}
      </figure>
    </>
  )
}
