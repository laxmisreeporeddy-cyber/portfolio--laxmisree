import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeCtx } from "./home";
import axios from "axios";

const API = "http://localhost:5000/api";
const ADMIN_PASSWORD = "laxmi@admin123"; // 🔒 change this to your password

// ── helpers ──────────────────────────────────────────────────────────────────
const emptyProject = () => ({
  title: "",
  description: "",
  techStack: "",        // comma-separated, split before sending
  keyFeatures: "",      // newline-separated
  images: "",           // comma-separated paths
  pdf: "",
  pdfName: "",
  githubUrl: "",
  liveUrl: "",
});

const toPayload = (form) => ({
  title: form.title.trim(),
  description: form.description.trim(),
  techStack: form.techStack.split(",").map((s) => s.trim()).filter(Boolean),
  keyFeatures: form.keyFeatures.split("\n").map((s) => s.trim()).filter(Boolean),
  images: form.images.split(",").map((s) => s.trim()).filter(Boolean),
  pdf: form.pdf.trim(),
  pdfName: form.pdfName.trim(),
  githubUrl: form.githubUrl.trim(),
  liveUrl: form.liveUrl.trim(),
});

const fromProject = (p) => ({
  title: p.title || "",
  description: p.description || "",
  techStack: (p.techStack || []).join(", "),
  keyFeatures: (p.keyFeatures || []).join("\n"),
  images: (p.images || []).join(", "),
  pdf: p.pdf || "",
  pdfName: p.pdfName || "",
  githubUrl: p.githubUrl || "",
  liveUrl: p.liveUrl || "",
});

// ── styles ───────────────────────────────────────────────────────────────────
const S = {
  page: (dark) => ({ minHeight: "100vh", background: dark ? "#080810" : "#f4f4f8", fontFamily: "DM Sans, sans-serif", paddingBottom: 80 }),
  wrap: { maxWidth: 1100, margin: "0 auto", padding: "32px 24px" },
  header: (dark) => ({ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 36 }),
  h1: (dark) => ({ fontFamily: "Syne, sans-serif", fontSize: 32, fontWeight: 800, color: dark ? "#f4f0e8" : "#0d0d14", margin: 0 }),
  accent: { color: "#c8f542" },

  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20, marginBottom: 40 },
  card: (dark) => ({ background: dark ? "#0f0f1a" : "#fff", border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "#e0e0e8"}`, borderRadius: 14, padding: 22, display: "flex", flexDirection: "column", gap: 10 }),
  cardTitle: (dark) => ({ fontSize: 17, fontWeight: 700, color: dark ? "#f4f0e8" : "#0d0d14", margin: 0 }),
  cardDesc: (dark) => ({ fontSize: 13, color: dark ? "#888" : "#666", lineHeight: 1.6, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }),
  tags: { display: "flex", flexWrap: "wrap", gap: 6 },
  tag: { background: "#1f1f2f", color: "#c8f542", padding: "3px 10px", borderRadius: 20, fontSize: 12 },
  cardActions: { display: "flex", gap: 8, marginTop: 4 },

  btn: (variant) => {
    const base = { padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "DM Sans, sans-serif", transition: "opacity 0.2s" };
    if (variant === "primary") return { ...base, background: "#c8f542", color: "#0d0d14" };
    if (variant === "danger")  return { ...base, background: "#ff4444", color: "#fff" };
    if (variant === "ghost")   return { ...base, background: "transparent", border: "1px solid rgba(255,255,255,0.12)", color: "#aaa" };
    if (variant === "outline") return { ...base, background: "transparent", border: "1px solid #c8f542", color: "#c8f542" };
    return base;
  },

  // modal
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 },
  modal: (dark) => ({ background: dark ? "#0f0f1a" : "#fff", border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "#ddd"}`, borderRadius: 16, padding: 32, width: "100%", maxWidth: 620, maxHeight: "90vh", overflowY: "auto" }),
  modalTitle: (dark) => ({ fontFamily: "Syne, sans-serif", fontSize: 22, fontWeight: 800, color: dark ? "#f4f0e8" : "#0d0d14", marginBottom: 24 }),

  // form
  fieldGroup: { display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 },
  label: (dark) => ({ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: dark ? "#666" : "#888", marginBottom: 4, display: "block" }),
  input: (dark) => ({ width: "100%", background: dark ? "#080810" : "#f8f8fc", border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "#ddd"}`, borderRadius: 8, padding: "10px 14px", color: dark ? "#f4f0e8" : "#0d0d14", fontSize: 14, fontFamily: "DM Sans, sans-serif", outline: "none", boxSizing: "border-box" }),
  textarea: (dark) => ({ width: "100%", background: dark ? "#080810" : "#f8f8fc", border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "#ddd"}`, borderRadius: 8, padding: "10px 14px", color: dark ? "#f4f0e8" : "#0d0d14", fontSize: 14, fontFamily: "DM Sans, sans-serif", outline: "none", resize: "vertical", boxSizing: "border-box" }),
  hint: { fontSize: 11, color: "#666", marginTop: 4 },

  // login
  loginWrap: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" },
  loginCard: (dark) => ({ background: dark ? "#0f0f1a" : "#fff", border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "#e0e0e8"}`, borderRadius: 16, padding: 40, width: "100%", maxWidth: 360, textAlign: "center" }),

  toast: (type) => ({ position: "fixed", bottom: 24, right: 24, zIndex: 999, background: type === "success" ? "#c8f542" : "#ff4444", color: type === "success" ? "#0d0d14" : "#fff", padding: "12px 24px", borderRadius: 10, fontWeight: 700, fontSize: 14, boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }),
};

// ── Toast ─────────────────────────────────────────────────────────────────────
function Toast({ msg, type }) {
  if (!msg) return null;
  return <div style={S.toast(type)}>{msg}</div>;
}

// ── Login screen ──────────────────────────────────────────────────────────────
function Login({ onLogin, dark }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const submit = () => {
    if (pw === ADMIN_PASSWORD) { onLogin(); setErr(""); }
    else setErr("Wrong password.");
  };
  return (
    <div style={{ ...S.loginWrap, background: dark ? "#080810" : "#f4f4f8" }}>
      <div style={S.loginCard(dark)}>
        <div style={{ fontSize: 36, marginBottom: 12 }}>🔐</div>
        <h2 style={{ fontFamily: "Syne, sans-serif", color: dark ? "#f4f0e8" : "#0d0d14", marginBottom: 8 }}>Admin Panel</h2>
        <p style={{ color: "#888", fontSize: 13, marginBottom: 24 }}>Enter password to continue</p>
        <input
          type="password" value={pw} placeholder="Password"
          onChange={(e) => setPw(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          style={{ ...S.input(dark), marginBottom: 12 }}
        />
        {err && <p style={{ color: "#ff4444", fontSize: 13, marginBottom: 8 }}>{err}</p>}
        <button onClick={submit} style={{ ...S.btn("primary"), width: "100%", padding: "11px" }}>Login</button>
      </div>
    </div>
  );
}

// ── Project Form Modal ────────────────────────────────────────────────────────
function ProjectModal({ dark, initial, onClose, onSave }) {
  const [form, setForm] = useState(initial || emptyProject());
  const [saving, setSaving] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSave = async () => {
    if (!form.title.trim()) return alert("Title is required.");
    setSaving(true);
    await onSave(toPayload(form));
    setSaving(false);
  };

  return (
    <div style={S.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={S.modal(dark)}>
        <h2 style={S.modalTitle(dark)}>{initial ? "Edit Project" : "Add New Project"}</h2>

        <div style={S.fieldGroup}>
          <div>
            <label style={S.label(dark)}>Project Title *</label>
            <input style={S.input(dark)} value={form.title} onChange={set("title")} placeholder="e.g. Women Safe Route Guidance System" />
          </div>

          <div>
            <label style={S.label(dark)}>Description *</label>
            <textarea style={{ ...S.textarea(dark), minHeight: 80 }} value={form.description} onChange={set("description")} placeholder="Short description of the project..." />
          </div>

          <div>
            <label style={S.label(dark)}>Tech Stack</label>
            <input style={S.input(dark)} value={form.techStack} onChange={set("techStack")} placeholder="React, Node.js, MongoDB" />
            <p style={S.hint}>Comma-separated</p>
          </div>

          <div>
            <label style={S.label(dark)}>Key Features</label>
            <textarea style={{ ...S.textarea(dark), minHeight: 100 }} value={form.keyFeatures} onChange={set("keyFeatures")} placeholder={"Safe route recommendations\nShortest path navigation\nLocation-based assistance"} />
            <p style={S.hint}>One feature per line</p>
          </div>

          <div>
            <label style={S.label(dark)}>Image Paths</label>
            <input style={S.input(dark)} value={form.images} onChange={set("images")} placeholder="/womensafe/img1.png, /womensafe/img2.png" />
            <p style={S.hint}>Comma-separated paths relative to /public</p>
          </div>

          <div>
            <label style={S.label(dark)}>PDF Path</label>
            <input style={S.input(dark)} value={form.pdf} onChange={set("pdf")} placeholder="/docs/womensafe.pdf" />
          </div>

          <div>
            <label style={S.label(dark)}>PDF Download Name</label>
            <input style={S.input(dark)} value={form.pdfName} onChange={set("pdfName")} placeholder="Women-Safe-Route-Report.pdf" />
          </div>

          <div>
            <label style={S.label(dark)}>GitHub URL</label>
            <input style={S.input(dark)} value={form.githubUrl} onChange={set("githubUrl")} placeholder="https://github.com/..." />
          </div>

          <div>
            <label style={S.label(dark)}>Live URL</label>
            <input style={S.input(dark)} value={form.liveUrl} onChange={set("liveUrl")} placeholder="https://your-demo.com" />
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button style={S.btn("ghost")} onClick={onClose}>Cancel</button>
          <button style={S.btn("primary")} onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Project"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Delete Confirm Modal ──────────────────────────────────────────────────────
function DeleteModal({ dark, project, onClose, onConfirm }) {
  return (
    <div style={S.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={{ ...S.modal(dark), maxWidth: 400, textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🗑</div>
        <h3 style={{ color: dark ? "#f4f0e8" : "#0d0d14", marginBottom: 8 }}>Delete Project?</h3>
        <p style={{ color: "#888", fontSize: 14, marginBottom: 24 }}>
          "<strong style={{ color: dark ? "#f4f0e8" : "#0d0d14" }}>{project.title}</strong>" will be permanently removed.
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <button style={S.btn("ghost")} onClick={onClose}>Cancel</button>
          <button style={S.btn("danger")} onClick={onConfirm}>Yes, Delete</button>
        </div>
      </div>
    </div>
  );
}

// ── Main Admin Panel ──────────────────────────────────────────────────────────
export default function AdminPanel() {
  const { dark } = useContext(ThemeCtx);
  const navigate = useNavigate();

  const [authed, setAuthed]       = useState(() => sessionStorage.getItem("adminAuth") === "true");
  const [projects, setProjects]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [showAdd, setShowAdd]     = useState(false);
  const [editProject, setEdit]    = useState(null);
  const [deleteProject, setDel]   = useState(null);
  const [toast, setToast]         = useState({ msg: "", type: "success" });

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: "", type: "success" }), 3000);
  };

  const fetchProjects = () => {
    setLoading(true);
    axios.get(`${API}/projects`)
      .then((r) => setProjects(r.data || []))
      .catch(() => showToast("Failed to fetch projects", "error"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { if (authed) fetchProjects(); }, [authed]);

  const handleLogin = () => {
    sessionStorage.setItem("adminAuth", "true");
    setAuthed(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    setAuthed(false);
  };

  const handleAdd = async (payload) => {
    try {
      await axios.post(`${API}/projects`, payload);
      showToast("Project added!");
      setShowAdd(false);
      fetchProjects();
    } catch {
      showToast("Failed to add project", "error");
    }
  };

  const handleEdit = async (payload) => {
    try {
      await axios.put(`${API}/projects/${editProject._id}`, payload);
      showToast("Project updated!");
      setEdit(null);
      fetchProjects();
    } catch {
      showToast("Failed to update project", "error");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API}/projects/${deleteProject._id}`);
      showToast("Project deleted!");
      setDel(null);
      fetchProjects();
    } catch {
      showToast("Failed to delete project", "error");
    }
  };

  if (!authed) return <Login onLogin={handleLogin} dark={dark} />;

  return (
    <div style={S.page(dark)}>
      <div style={S.wrap}>

        {/* Header */}
        <div style={S.header(dark)}>
          <div>
            <h1 style={S.h1(dark)}>Admin <span style={S.accent}>Panel</span></h1>
            <p style={{ color: "#666", fontSize: 13, margin: "4px 0 0" }}>{projects.length} project{projects.length !== 1 ? "s" : ""} in database</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button style={S.btn("outline")} onClick={() => navigate("/projects")}>← View Site</button>
            <button style={S.btn("primary")} onClick={() => setShowAdd(true)}>+ Add Project</button>
            <button style={S.btn("ghost")} onClick={handleLogout}>Logout</button>
          </div>
        </div>

        {/* Project Cards */}
        {loading ? (
          <p style={{ color: "#666", textAlign: "center", marginTop: 60 }}>Loading projects...</p>
        ) : projects.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: 80 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📂</div>
            <p style={{ color: "#666" }}>No projects yet. Click "+ Add Project" to get started.</p>
          </div>
        ) : (
          <div style={S.grid}>
            {projects.map((p, i) => (
              <div style={S.card(dark)} key={p._id || i}>
                {/* Preview image */}
                {p.images?.[0] && (
                  <div style={{ borderRadius: 8, overflow: "hidden", aspectRatio: "16/9", background: "#1a1a2a" }}>
                    <img src={p.images[0]} alt={p.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={(e) => { e.target.style.display = "none"; }} />
                  </div>
                )}

                <h3 style={S.cardTitle(dark)}>{p.title}</h3>
                <p style={S.cardDesc(dark)}>{p.description}</p>

                <div style={S.tags}>
                  {(p.techStack || []).slice(0, 4).map((t) => (
                    <span key={t} style={S.tag}>{t}</span>
                  ))}
                </div>

                <div style={{ fontSize: 12, color: "#555" }}>
                  {p.keyFeatures?.length || 0} features · {p.images?.length || 0} images
                  {p.pdf && " · PDF ✓"}
                </div>

                <div style={S.cardActions}>
                  <button style={{ ...S.btn("outline"), flex: 1 }}
                    onClick={() => setEdit({ ...p, _formData: fromProject(p) })}>
                    ✏ Edit
                  </button>
                  <button style={{ ...S.btn("danger"), flex: 1 }} onClick={() => setDel(p)}>
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {showAdd && (
        <ProjectModal dark={dark} initial={null} onClose={() => setShowAdd(false)} onSave={handleAdd} />
      )}
      {editProject && (
        <ProjectModal dark={dark} initial={fromProject(editProject)} onClose={() => setEdit(null)} onSave={handleEdit} />
      )}
      {deleteProject && (
        <DeleteModal dark={dark} project={deleteProject} onClose={() => setDel(null)} onConfirm={handleDelete} />
      )}

      <Toast msg={toast.msg} type={toast.type} />
    </div>
  );
}
