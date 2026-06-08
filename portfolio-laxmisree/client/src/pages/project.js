import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { projects } from "../data/Projectsdata"; // ✅ same path as ProjectDetails

function Projects() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { background: #080810; }
        .projects-container { min-height: 100vh; padding: 60px 8%; background: #080810; }
        .section-title { text-align: center; color: #c8f542; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px; }
        .main-title { text-align: center; color: white; font-size: 42px; margin-bottom: 50px; }
        .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 25px; }
        .project-card { background: #13131e; border-radius: 15px; padding: 25px; border: 1px solid rgba(255,255,255,0.08); transition: 0.3s; display: flex; flex-direction: column; }
        .project-card:hover { transform: translateY(-8px); border-color: #c8f542; }
        .project-number { color: #777; font-size: 13px; margin-bottom: 15px; }
        .project-title { color: white; margin-bottom: 15px; font-size: 24px; }
        .project-description { color: #aaa; line-height: 1.7; margin-bottom: 20px; flex: 1; }
        .tags { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 25px; }
        .tag { padding: 6px 12px; border-radius: 20px; background: #1f1f2f; color: #c8f542; font-size: 13px; }
        .loading { text-align: center; color: white; font-size: 20px; margin-top: 100px; }
        .features { margin-bottom: 20px; }
        .features h4 { color: #c8f542; margin-bottom: 10px; font-size: 16px; }
        .features ul { padding-left: 20px; }
        .features li { color: #bbb; margin-bottom: 6px; line-height: 1.5; font-size: 14px; }
        .view-details-btn { display: block; margin-top: auto; padding: 10px 20px; background: transparent; border: 1px solid #c8f542; color: #c8f542; border-radius: 8px; text-decoration: none; font-size: 14px; font-family: 'DM Sans', sans-serif; transition: all 0.2s; text-align: center; }
        .view-details-btn:hover { background: #c8f542; color: #080810; font-weight: 600; }
      `}</style>

      <div className="projects-container">
        <p className="section-title">My Work</p>
        <h1 className="main-title">Featured Projects</h1>

        {loading ? (
          <div className="loading">Loading Projects...</div>
        ) : (
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div className="project-card" key={project.id}>
                <div className="project-number">
                  {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                </div>
                <h2 className="project-title">{project.title}</h2>
                <p className="project-description">{project.description}</p>
                <div className="tags">
                  {(project.techStack || []).map((tech, i) => (
                    <span className="tag" key={i}>{tech}</span>
                  ))}
                </div>
                <div className="features">
                  <h4>Key Features</h4>
                  <ul>
                    {(project.keyFeatures || []).map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>

                {/* ✅ uses project.id to match ProjectDetails */}
                <Link to={`/projects/${project.id}`} className="view-details-btn">
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Projects;