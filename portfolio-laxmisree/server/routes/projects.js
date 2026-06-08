// server/routes/projects.js
// Replace your existing file with this

const express = require("express");
const router  = express.Router();
const mongoose = require("mongoose");

// ── Schema (safe to re-declare with models check) ─────────────────────────────
const projectSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, default: "" },
  techStack:   [String],
  keyFeatures: [String],
  images:      [String],
  pdf:         { type: String, default: "" },
  pdfName:     { type: String, default: "" },
  githubUrl:   { type: String, default: "" },
  liveUrl:     { type: String, default: "" },
}, { timestamps: true });

// prevents OverwriteModelError on hot reload
const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

// ── GET all ───────────────────────────────────────────────────────────────────
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// ── GET one ───────────────────────────────────────────────────────────────────
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch project" });
  }
});

// ── POST create ───────────────────────────────────────────────────────────────
router.post("/", async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: "Failed to create project", details: err.message });
  }
});

// ── PUT update ────────────────────────────────────────────────────────────────
router.put("/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!project) return res.status(404).json({ error: "Not found" });
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: "Failed to update project", details: err.message });
  }
});

// ── DELETE ────────────────────────────────────────────────────────────────────
router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete project" });
  }
});

module.exports = router;
