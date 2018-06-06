const app = require('./app');

const port = process.env.PORT || 8000;

app
  .listen(port)
  .keepAliveTimeout = 10 * 1000;

  console.log(`Listening on http://localhost:${port}`)
