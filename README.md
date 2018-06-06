## Test locally
```
npm install
npm run start # to test http server
npm run start-https # to test https server
```

There are a few endpoints for testing using node http module or axios, you need to change the endpoint for different scenarios.

Run test client using http module `node test-http.js` or `node test-axios.js`

## Generate certificate for local testing

openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout privateKey.key -out certificate.crt

## Investigation of request hang (WIP)
After a new deployment, we got many request time out from the upstream api. Requests took 1 minute to response even though we set timeout to 200ms.

After trying to reproduce the issue locally, I found that it's only hang when 
- Using http keep alive 
- Receiving response 204 No Content with header: content-length=non-zero value

Based on http RFC (https://tools.ietf.org/html/rfc7230#section-3.3.2), `A server MUST NOT send a Content-Length header field in any response with a status code of 1xx (Informational) or 204 (No Content).`

To quick demostrate the issue, I created a few test scripts.
