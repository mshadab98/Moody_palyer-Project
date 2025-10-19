const express = require('express');
const songRoutes = require('./routes/song.routes');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Default route
app.get('/', (req, res) => {
  res.send('Backend is running successfully ');
});

app.use('/', songRoutes);

module.exports = app;

