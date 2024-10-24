const express = require('express');
const path = require('path');
const https = require('https');
const http = require('http');
const fs = require('fs');

const app = express();
const httpPort = 8080; // The port Caddy will proxy to
const httpsPort = 443; // Port for HTTPS

// Load SSL certificate and key
const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/ajh.justlearning.net/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/ajh.justlearning.net/fullchain.pem')
};

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle root requests (optional)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Redirect HTTP to HTTPS
const redirectToHttps = (req, res, next) => {
  if (req.secure) {
    return next();
  }
  res.redirect(`https://${req.headers.host}${req.url}`);
};

// Apply redirection middleware
app.use(redirectToHttps);

// Start the HTTPS server
https.createServer(options, app).listen(httpsPort, '0.0.0.0', () => {
  console.log(`Secure server running at https://localhost:${httpsPort}/`);
});

// Start the HTTP server
http.createServer(app).listen(httpPort, '0.0.0.0', () => {
  console.log(`HTTP server running at http://localhost:${httpPort}/`);
});
