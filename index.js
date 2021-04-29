const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 11111
const http = require('http');
const fs = require('fs');
const cors = require('cors')
var morgan = require('morgan')


morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
})

// CORS configuration: change origin to CORS lock to that domain
const corsOptions = {
  origin: 'http://cors-origin-domain',
  optionsSuccessStatus: 200
}

// Enables bodyParser middleware
app.use(
    bodyParser.json()
)
app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
    cors(corsOptions)
)

// Example GET root route
app.get('/', (request, response) => {
  response.json({ info: 'Welcome to the root route!' })
})

//  Example GET route to route /getroute
app.get('/getroute', function(request, response, next) {
 
})

// Example OPTIONS and POST routes with CORS enabled
// Extract variable_a and variable_b from the request body
app.options('/postroute', cors(corsOptions))
app.post('/postroute', cors(corsOptions), function(request, response, next) {
  const variable_a = request.body.variable_a
  const variable_b = request.body.variable_b
})

// Example PUT route with CORS enabled
// Extract variable_a and variable_b from the request body
app.put('/putroute', cors(corsOptions), function(request, response, next) {
  const variable_a = request.body.variable_a
  const variable_b = request.body.variable_b
})

// Example DELETE route for route /deleteroute
app.delete('/deleteroute', cors(corsOptions), function(request, response, next) {
})

// Tell the Express server app to listen to defined port (listed at top of page as port 11111)
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

// Example handler function for the HTTP server
let handleRequest = (request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/html'
  });
  fs.readFile('index.html', null, function (error, data) {
    if (error) {
      response.writeHead(404);
      response.write('Something went wrong, Dave!');
    } else {
      response.write(data);
    }
    response.end();
  });
};

// HTTP Server Listening on Port 80
http.createServer(handleRequest).listen(80);
