const express = require('express');
const router = express.Router();
const CodeBlockController = require('../controllers/codeBlock.controller')

// POST
// Create a new code block
router.post('/', CodeBlockController.createCodeBlock);

// GET
// Get all code blocks
router.get('/', CodeBlockController.getAllCodeBlocks);

// Add more routes as needed (e.g., for updating, deleting users)

module.exports = router;
