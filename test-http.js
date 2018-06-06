
const HttpAgent = require('agentkeepalive');
const https = require('https');
const http = require('http');
const { HttpsAgent } = HttpAgent;

let hostname = '127.0.0.1';
let port = 8000;
let path = '/204-with-invalid-content-length';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const keepAliveOption = {
  freeSocketKeepAliveTimeout: 30 * 1000, // Should be less than server keep alive timeout
  socketActiveTTL: 50 * 1000 // Should be less than dns ttl
};

const keepaliveHttpsAgent = new HttpsAgent(keepAliveOption);
const keepaliveHttpAgent = new HttpAgent(keepAliveOption);

http
  .request({
    hostname,
    port,
    path,
    agent: keepaliveHttpAgent
  }, (res) => {
    console.log('received response', new Date());
    const { statusCode } = res;
    if (statusCode === 204) {
      console.log('received 204')
      // res.emit('end');
    }
    res.on('data', ()=> {
      console.log('received data', new Date());
    });
    res.on('end', () => {
      console.log('received all data', new Date());
    })
  })
  .on('error', e => {
    console.log('got error', e)
  })
  .end();
