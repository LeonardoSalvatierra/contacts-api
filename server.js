// Load environment variables before initializing the database.
require('dotenv').config();
const contactsRoutes = require('./routes/contacts');
const express = require('express');
const { connectDB } = require('./db/connect');

const app = express();
app.use('/contacts', contactsRoutes);
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Start the server only after the database connection succeeds.
async function startServer() {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exitCode = 1;
  }
}

startServer();