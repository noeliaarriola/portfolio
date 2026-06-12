// ProjectRow.jsx
// A single row in the projects list. Receives project data as props.
export default function ProjectRow({ num, name, tags, year, image, onClick }) {
  const tagList = tags.split(' / ')

  return (
    <div className="project-row" onClick={onClick}>
      <span className="project-num">{num}</span>
      <div className="project-main">
        <span className="project-name">{name}</span>
        <div className="project-meta">
          {tagList.map((tag, i) => (
            <span key={i} className="project-tag">{tag}</span>
          ))}
          <span className="project-year">{year} ↗</span>
        </div>
      </div>
      <div className="project-thumb">
        {image && <img src={image} alt={name} />}
      </div>
      <button className="project-open" aria-label="Open project">+</button>
    </div>
  )
}
