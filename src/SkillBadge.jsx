function SkillBadge({ skill, index }) {
  return (
    <span
      className="skill-badge"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {skill}
    </span>
  );
}

export default SkillBadge;