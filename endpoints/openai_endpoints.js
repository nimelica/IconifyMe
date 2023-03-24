const express = require("express");
const { generateImage } = require('..controllers/openaoi_contoller')
const router = express.Router();

router.post('/generateimage', generateImage);

module.exports = router;

