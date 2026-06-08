import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ThemeCtx } from "./home";
import { projects } from "../data/Projectsdata";   // ✅ correct import

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dark } = useContext(ThemeCtx);

  const project = projects.find((p) => p.id === Number(id));

  const bg = dark ? "#080810" : "#f8f9ff";
  const card = dark ? "#0f0f1a" : "#ffffff";
  const border = dark ? "rgba(255,255,255,0.07)" : "#e8ecf0";
  const txt = dark ? "#f4f0e8" : "#0d0d14";
  const muted = dark ? "#888" : "#666";
  const accent = "#c8f542";

  if (!project) {
    return (
      <div style={{ minHeight: "100vh", background: bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
        <span style={{ fontSize: 48 }}>🔍</span>
        <p style={{ color: muted, fontFamily: "DM Sans, sans-serif" }}>Project not found.</p>
        <button onClick={() => navigate("/projects")} style={{ background: "none", border: `1px solid ${border}`, color: txt, padding: "10px 20px", borderRadius: 8, cursor: "pointer", fontFamily: "DM Sans, sans-serif" }}>
          ← Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: bg, fontFamily: "DM Sans, sans-serif", paddingBottom: 80 }}>

      {/* ── Top bar ── */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 24px 0" }}>
        <button
          onClick={() => navigate("/projects")}
          style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: `1px solid ${border}`, color: muted, padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontSize: 13, marginBottom: 40 }}
        >
          ← Back to Projects
        </button>

        <div style={{ marginBottom: 12 }}>
          <span style={{ fontSize: 12, color: accent, letterSpacing: "0.12em", fontWeight: 600, textTransform: "uppercase" }}>
            Project {String(project.id).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, color: txt, lineHeight: 1.1, marginBottom: 20 }}>
          {project.title}
        </h1>

        <p style={{ fontSize: 16, color: muted, lineHeight: 1.8, maxWidth: 680, marginBottom: 32 }}>
          {project.description}
        </p>

        {/* ── Tech badges ── */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
          {project.techStack.map((t) => (
            <span key={t} style={{ background: "#1f1f2f", color: accent, padding: "6px 14px", borderRadius: 20, fontSize: 13 }}>{t}</span>
          ))}
        </div>

        {/* ── Action buttons ── */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 52 }}>
          <a href={project.pdf} download
            style={{ display: "flex", alignItems: "center", gap: 8, background: accent, color: "#0d0d14", padding: "11px 22px", borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
            ⬇ Download Report PDF
          </a>
          {project.githubUrl && project.githubUrl !== "#" && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 8, background: "transparent", color: txt, border: `1px solid ${border}`, padding: "11px 22px", borderRadius: 8, fontSize: 14, textDecoration: "none" }}>
              ↗ GitHub
            </a>
          )}
          {project.liveUrl && project.liveUrl !== "#" && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 8, background: "transparent", color: txt, border: `1px solid ${border}`, padding: "11px 22px", borderRadius: 8, fontSize: 14, textDecoration: "none" }}>
              ↗ Live Demo
            </a>
          )}
        </div>
      </div>

      {/* ── Screenshots ── */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px 48px" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.14em", color: accent, textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>Screenshots</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
          {project.images.map((src, i) => (
            <div key={i} style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, overflow: "hidden", aspectRatio: "16/9" }}>
              <img
                src={src}
                alt={`${project.title} screenshot ${i + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentNode.innerHTML = `<div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:#444;font-size:13px;font-family:DM Sans,sans-serif"><span style="font-size:28px">🖼</span><span>Add image: /public${src}</span></div>`;
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto 40px", padding: "0 24px" }}>
        <div style={{ borderTop: `1px solid ${border}` }} />
      </div>

      {/* ── Key Features ── */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px 48px" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.14em", color: accent, textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>Key Features</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
          {project.keyFeatures.map((f, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "14px 16px", background: card, border: `1px solid ${border}`, borderRadius: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: accent, marginTop: 6, flexShrink: 0 }} />
              <span style={{ fontSize: 14, color: txt, lineHeight: 1.5 }}>{f}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto 40px", padding: "0 24px" }}>
        <div style={{ borderTop: `1px solid ${border}` }} />
      </div>

      {/* ── PDF download card at bottom ── */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.14em", color: accent, textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>Documentation</p>
        <a href={project.pdf} download
          style={{ display: "inline-flex", alignItems: "center", gap: 10, background: card, border: `1px solid ${border}`, color: txt, padding: "16px 24px", borderRadius: 10, fontSize: 14, textDecoration: "none" }}>
          <span style={{ fontSize: 24 }}>📄</span>
          <div>
            <div style={{ fontWeight: 600, marginBottom: 2 }}>{project.title} — Report</div>
            <div style={{ fontSize: 12, color: muted }}>Click to download PDF</div>
          </div>
        </a>
      </div>

    </div>
  );
}
