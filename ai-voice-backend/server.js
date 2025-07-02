const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Route
const gptRoute = require('./routes/gpt');
app.use('/gpt-feedback', gptRoute);  // 🔴 This is important

app.listen(port, () => {
  console.log(`Server running at http://localhost:5000`);
});
