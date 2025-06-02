# What is Express.js?
Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. 
It's built on top of Node.js's built-in HTTP module and simplifies the process of building server-side applications and APIs.
## 🔹Key Features of Express.js 

### 1. Routing: 
- **Routing** is the process of defining how your application responds to different **HTTP requests** (like GET, POST, PUT, DELETE) made to specific **URLs** (or paths).
- Define multiple routes and handle requests.
- You can define as many routes as needed for different parts of your site.
- Basic Structure of a Route:
`app.METHOD(PATH, HANDLER)`
> app – Your Express application; an instance of Express
> 
> METHOD – HTTP method (GET, POST, etc.)
> 
> PATH – URL path (e.g., /, /about)
> 
> HANDLER – Function that runs when the route is matched

```js
const express = require('express');
const app = express();

// Home page
app.get('/', (req, res) => {
  res.send('Welcome to the Home Page');
});

// About page
app.get('/about', (req, res) => {
  res.send('About Us');
});

// Contact form submission
app.post('/contact', (req, res) => {
  res.send('Form submitted');
});
```

***Types of Routes:***
1. **Static Routes:** Fixed paths like `/home`, `/about`.
   ```js
    app.get('/about', (req, res) => {
      res.send('About Page');
    });
   ```
2. **Dynamic Routes:** Use *parameters* to handle variable data.
   ```js
    app.get('/users/:id', (req, res) => {
    res.send(`User ID: ${req.params.id}`);
    });
   ```
   > Visiting `/users/123` will show: **User ID: 123**

***Route Parameters:***
- Used to pass values through the URLs.
- Route parameters are defined using a colon `:` followed by the parameter name.
- Route parameters are accessed through the `req.params` object
```js
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User ID: ${userId}`);
});
```
> When a client requests `/users/123`, the value `123` is captured as the `id` parameter.
- You can define multiple parameters in a single route:
```js
app.get('/users/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  
  res.json({
    message: `User ${userId}, Post ${postId}`,
    user: userId,
    post: postId
  });
});

// GET /users/456/posts/789
// req.params = { userId: '456', postId: '789' }
```

***Query Parameters:***
- Used to pass key-value data in the **URL after** `?`.
- These are passed in the URL like `/search?term=book&page=2`.
- Query parameters are accessed through the `req.query.key`
```js
app.get('/search', (req, res) => {
  const keyword = req.query.q;
  res.send(`Searching for: ${keyword}`);
});
```
> Request to `/search?q=nodejs` gives `Searching for: nodejs`


### 2. Middleware: Intercept and manipulate requests before they reach handlers.

### 3. Template Engines: Render dynamic views.

### 4. Static File Serving: Serve static assets like images and stylesheets.

### 5. Error Handling: Manage errors in a structured way.
