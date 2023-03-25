const path = require('path');

const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'UI')));

app.use('/openai', require('./endpoints/openai_endpoints'));
app.listen(port, () => console.log("Server started on port ${port}"));

