// ProjectRow.jsx
// A single row in the projects list. Receives project data as props.
// `thumb` is the row cover; falls back to `image` (the modal cover) if absent.
export default function ProjectRow({ num, name, tags, year, image, thumb, onClick }) {
  const tagList = tags.split(' / ')
  const cover = thumb || image

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
        {cover && <img src={cover} alt={name} />}
      </div>
      <button className="project-open" aria-label="Open project">+</button>
    </div>
  )
}
