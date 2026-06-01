function ProjectCard({ title, category, image, description, tags }) {
  const categoryColors = {
    web: "bg-primary",
    mobile: "bg-success",
    design: "bg-warning",
  };

  return (
    <div className="portfolio-card">
      <div className="card-image">
        <img src={image} alt={title} />
        <div className="card-overlay">
          <h3>{title}</h3>
          <p>{category}</p>
        </div>
      </div>
      <div className="card-body">
        <span className={`badge ${categoryColors[category]}`}>{category}</span>
        <h3 className="card-title">{title}</h3>
        <p className="card-text">{description}</p>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {tags.map((tag) => (
            <span key={tag} className="badge" style={{ background: "#f1f5f9", color: "#334155" }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;