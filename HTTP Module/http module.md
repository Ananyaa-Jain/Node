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
