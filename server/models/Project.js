const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  tenantId: { type: String, required: true, index: true },
  createdAt: { type: Date, default: Date.now },
});

// Compound index for faster queries
projectSchema.index({ tenantId: 1, createdAt: -1 });

module.exports = mongoose.model("Project", projectSchema);


/* 
const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  tenantId: { type: String, required: true, index: true },
  createdAt: { type: Date, default: Date.now },
});

// Compound index for faster queries
projectSchema.index({ tenantId: 1, createdAt: -1 });

module.exports = mongoose.model("Project", projectSchema);
*/