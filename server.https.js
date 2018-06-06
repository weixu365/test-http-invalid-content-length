const https = require('https');
const fs = require('fs');
const app = require('./app');

const httpsOptions = {
  key: fs.readFileSync('keys/privateKey.key'),
  cert: fs.readFileSync('keys/certificate.crt')
};

const port = process.env.PORT || 8443;
https
  .createServer(httpsOptions, app)
  .listen(port)
  .keepAliveTimeout = 10 * 1000;
console.log(`Listening on https://localhost:${port}`)
