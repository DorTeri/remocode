const mongoose = require('mongoose');

const codeBlockSchema = new mongoose.Schema({
  title: { type: String, required: true },
  code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const codeBlock = mongoose.model('CodeBlock', codeBlockSchema);

module.exports = codeBlock;