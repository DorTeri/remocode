const express = require('express');
const router = express.Router();
const CodeBlockController = require('../controllers/codeBlock.controller')

router.post('/', CodeBlockController.createCodeBlock);

router.get('/', CodeBlockController.getAllCodeBlocks);


module.exports = router;
