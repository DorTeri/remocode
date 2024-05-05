const mongoose = require('mongoose');

const codeBlockSchema = new mongoose.Schema({
  title: { type: String, required: true },
  code: { type: String, required: true },
  solution: {type: String},
  createdAt: { type: Date, default: Date.now },
}, { collection: 'codeBlocks' });

const codeBlocks = mongoose.model('CodeBlock', codeBlockSchema);

module.exports = codeBlocks;