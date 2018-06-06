## Test locally
```
npm install
npm run start # to test http server
npm run start-https # to test https server
```

There are a few endpoints for testing using node http module or axios, you need to change the endpoint for different scenarios.

## Generate certificate for local testing

openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout privateKey.key -out certificate.crt

## Investigation of request hang
After a new deployment, we got many request time out from the upstream api. Requests took 1 minute to response even though we set timeout to 200ms.

After trying to reproduce the issue locally, I found that it's only hang when 
- Using http keep alive 
- Receiving response 204 No Content with header: content-length=non-zero value

Based on http RFC (https://tools.ietf.org/html/rfc7230#section-3.3.2), `A server MUST NOT send a Content-Length header field in any response with a status code of 1xx (Informational) or 204 (No Content).`

To quick demostrate the issue, I created a few test scripts:


Try to reproduce the issue locally in order to understand what's happening.

Setup express test server with
- res.status(200).end();
- res.status(204).end();
- res
    .set({'Cache-Control': 'max-age=60000'})
    .status(304)
    .end();
All the above endpoints works as expected.

Compared with the response from CloudFront, there's an extra Content-Length response header,
After add the same header to 204, we can reproduce the issue locally

  res
    .set({'Content-Length': 23})
    .status(204).end();

We get the respose after 1 minute when the server closed the connection after the keep alive timeout

