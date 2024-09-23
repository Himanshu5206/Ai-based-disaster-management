import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createServer } from 'http'; // Replace 'require' with 'import'

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Store disaster reports in memory for simplicity
let disasterReports = [];

// Handle form submission (POST request)
app.post('/report', (req, res) => {
  const { location, disaster, status, description } = req.body;
  const newReport = { location, disaster, status, description };
  disasterReports.push(newReport);

  // Send the new report as a response
  res.status(201).json(newReport);
});

// Route to fetch disaster reports (optional)
app.get('/reports', (req, res) => {
  res.json(disasterReports);
});

// Create HTTP server
const server = createServer(app); // Use 'createServer' from 'http' module

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle errors
server.on('error', (err) => {
  console.error('Server error:', err);
});

