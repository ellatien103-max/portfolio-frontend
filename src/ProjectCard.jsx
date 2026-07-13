function ProjectCard(props) {
  return (
    <div className="project-card">
      <span className="project-tag">{props.tag}</span>
      <h3>{props.title}</h3>
      <p>{props.description}</p>

      {props.stack && props.stack.length > 0 && (
        <div className="stack-row">
          {props.stack.map((tech, i) => (
            <span key={i} className="stack-tag">{tech}</span>
          ))}
        </div>
      )}

      <a
        href={props.link}
        target="_blank"
        rel="noreferrer"
        className="project-link"
      >
        View Project
      </a>
    </div>
  );
}

export default ProjectCard;