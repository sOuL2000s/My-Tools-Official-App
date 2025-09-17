// server/index.js
const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes (important for development)
app.use(express.json()); // Parse JSON request bodies

// --- API Routes (Example - you can add more as your tools need server-side logic) ---
app.get('/api', (req, res) => {
    res.json({ message: 'Hello from Express API!' });
});

// --- Serve React App in production ---
// This section ensures Express serves the React app's build files
// when the server is deployed. During development, React's dev server
// handles the frontend.
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '../client/build')));

    // Handle React routing, return all requests to React app
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
});