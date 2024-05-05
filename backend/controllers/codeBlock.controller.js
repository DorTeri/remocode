const CodeBlock = require('../models/codeBlock.model')

// Creating code block
exports.createCodeBlock = async (req, res) => {
    try {
      const newCodeBlock = await CodeBlock.create(req.body);
      res.status(201).json(newCodeBlock);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
  // Get all code blocks
  exports.getAllCodeBlocks = async (req, res) => {
    try {
      const codeBlocks = await CodeBlock.find();
      res.status(200).json(codeBlocks);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };