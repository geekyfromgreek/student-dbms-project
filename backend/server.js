const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const initDatabase = require('./config/initDB');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Main API Routes
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('Student DBMS API is running...');
});

// Initialize database tables, then start the server
initDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to initialize database. Server not started.', err.message);
    process.exit(1);
  });
