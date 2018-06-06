
const axios = require('axios');
const HttpAgent = require('agentkeepalive');

const { HttpsAgent } = HttpAgent;

const keepAliveOption = {
  freeSocketKeepAliveTimeout: 30 * 1000, // Should be less than server keep alive timeout
  socketActiveTTL: 50 * 1000 // Should be less than dns ttl
};
const httpsAgent = new HttpsAgent(keepAliveOption);
const httpAgent = new HttpAgent(keepAliveOption);

const httpClient = axios.create({
  baseURL: 'http://localhost:8000/',
  timeout: 5000,
});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

httpClient.request({
  url: '/200-with-invalid-content-length',
  timeout: 50000,
  httpAgent,
  httpsAgent,
})
  .then(res => {
    console.log('finished received response', res.status, res.data);
  })
  .catch(e => {
    console.error('error occurred', e.message);
  })
