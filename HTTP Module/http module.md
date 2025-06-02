# http module
The `http` module in Node.js is a core module that allows you to **create an HTTP server** and handle **HTTP requests and responses**.
## 🔹Importing the `http` Module
Since `http` is a built-in module, you can simply require it:
```js
const http = require("http");
```
This loads the module into your *Node.js* application.
## 🔹Creating the HTTP Server
```js
const server = http.createServer((request, response) => { ... });
```
- The callback function runs **whenever a request is received**.
- `request` contains details about the incoming request (method, headers, URL). Its an instance of `http.IncomingMessage`
- `response` allows sending data back to the client. Its an instance of `http.ServerResponse`
### 🔸1. The `IncomingMessage` Object (`request`)
Used to access the incoming request data.

***KEY PROPERTIES AND METHODS OF THE REQUEST OBJECT:***
- `req.query`: Contains the URL query parameters. Query parameters are the **key-value pairs** that come after the `?` in a URL.
- `req.params`: Contains route parameters. Route parameters are named segments in the URL path, **defined with colons** in the route.
- `req.body`: Contains data sent in the request body (requires body-parser middleware). Contains data sent in POST, PUT, PATCH requests. Requires middleware like `express.json()`.
- `req.method`: The HTTP method used (GET, POST, etc.). Indicates which HTTP method was used for the request.
- `req.url`: The URL of the request. Contains the URL path and query string of the request.
- `req.headers`: Contains the headers of the request. Contains all HTTP headers sent by the client.

***Example Combining All Properties***
```js
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all('/api/:resource/:id?', (req, res) => {
  const info = {
    method: req.method,           // 'GET', 'POST', etc.
    url: req.url,                // '/api/users/123?include=posts'
    params: req.params,          // { resource: 'users', id: '123' }
    query: req.query,            // { include: 'posts' }
    body: req.body,              // { name: 'John' } (for POST/PUT)
    headers: {
      userAgent: req.headers['user-agent'],
      contentType: req.headers['content-type'],
      host: req.headers.host
    }
  };
  
  res.json(info);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

//url: http://localhost:3000/api/users/123?include=posts
//JSON Body: {"name": "John"}
```

### 🔸2. The `ServerResponse` Object (`response`)
Used to send a response back to the client.

***KEY PROPERTIES AND METHODS OF THE RESPONSE OBJECT:***
* `res.send()`: Sends a response of various types. Send different types of data and automatically sets appropriate headers.
* `res.json()`: Sends a JSON response. Specifically designed for sending JSON data with proper content-type headers.
* `res.status()`: Sets the HTTP status for the response. Sets the status code for the response. Usually chained with other response methods.
* `res.redirect()`: Redirects to a specified URL. Redirects the client to a different URL.
* `res.render()`: Renders a view template. Renders templates using a template engine (like EJS, Pug, Handlebars).
* `res.sendFile()`: Sends a file as an octet stream. Sends files to the client as a download or for display.
* `response.writeHead(statusCode, statusMessage, headers)`: Defines HTTP status & headers. Status message is optional. Headers are sent as object.
* `response.write(data)`: Writes partial response data.
* `response.end(data)`: Sends final response & closes connection. It can contain string, buffer, encoding parameter, callback or nothing at all. Internally, `response.end()` also emits the `finish` event.

## 🔹Listening for Requests
After creating a server, you need to **bind it to a port** so that it listens for requests:
```js
//server.listen(port, callback);
server.listen(3030, () => {
    console.log("Server running at http://localhost:3030");
});
```
- This makes the server start listening on port `3030`.
- The callback runs *only once* — when the server starts.

## 🔹Handling Routing Manually
```js
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Home Page</h1>');  //HTML string
  } else if (req.url === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('About Page');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page Not Found');
  }
});

server.listen(3000);
```
## 🔹Parsing Request Body (POST)
To handle incoming POST data:
```js
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString(); // convert buffer to string
    });

    req.on('end', () => {
      console.log('Received data:', body);
      res.end('Data received');
    });
  } else {
    res.end('Send a POST request');
  }
});

server.listen(3000);

```
### 🔸Difference Between The Follwing:
| Feature            | Description                                                |
| ------------------ | ---------------------------------------------------------- |
| `res.end(data)`    | Ends the response, optionally sending final data           |
| `res.on("finish")` | Fires **after response ends successfully**                 |
| `res.on("close")`  | Fires **when connection closes**, even if not successfully |

```js
//create a server
//http.createServer(callback)
const server = http.createServer((request, response) => {
    //res.writeHead(statusCode, status message, headers)
    //res.writeHead(200, {"Content-Type": "text/plain"});
    //response.writeHead(200, "i am header")
    response.writeHead(200, "Custom Message", {"Content-Type": "text/plain"});  // returns a response object

    //it represents final additional chunk of data to be written immediately before closing the stream.
    //res.end() [it takes a string or buffer or nothing at all]
    //response.end("hello i am ending") 

    //log after the response ends
    response.on("finish", () => {
        console.log(request.url)
        console.log("response ended");
    });

    response.on("close", ()=>{
        console.log("connection closed");
    })
    response.end("Hello, this is the end!");

});
```


## 🔹Alternatives / Enhancements
- `express.js`: A wrapper around `http` for easier routing, middleware, and scalability.
- `https`: Like `http`, but supports SSL/TLS for secure communication.
