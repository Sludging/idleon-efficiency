const https = require('node:https');

const request = https.get('https://127.0.0.1:3000/', { rejectUnauthorized: false, timeout: 140_000 }, response => {
  response.resume();
  response.on('end', () => process.exit(response.statusCode >= 200 && response.statusCode < 400 ? 0 : 1));
  response.on('error', () => process.exit(1));
});
request.on('timeout', () => request.destroy(new Error('App HTTPS healthcheck timed out')));
request.on('error', () => process.exit(1));
