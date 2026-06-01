function Skills() {
  const skills = [
    { name: "HTML5", level: 95, color: "primary" },
    { name: "CSS3", level: 90, color: "success" },
    { name: "JavaScript", level: 85, color: "info" },
    { name: "React", level: 80, color: "warning" },
  ];

  return (
    <section className="skills" id="skills">
      <div className="container">
        <h2 className="section-title text-center">Skills</h2>
        <div className="skills-grid">
          {skills.map((skill) => (
            <div key={skill.name} className="skill-item">
              <div className="skill-header">
                <span className="skill-name">{skill.name}</span>
                <span className={`skill-percentage text-${skill.color}`}>{skill.level}%</span>
              </div>
              <div className="skill-bar">
                <div className={`skill-progress bg-${skill.color}`} style={{ width: `${skill.level}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;