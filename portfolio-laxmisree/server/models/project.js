const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title:       String,
  description: String,
  techStack:   [String],
  githubUrl:   String,
  liveUrl:     String,
});

module.exports = mongoose.model('Project', ProjectSchema);