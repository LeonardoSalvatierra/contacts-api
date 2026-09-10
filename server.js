const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

// Respond to requests at the root URL.
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Start listening for incoming requests.
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});