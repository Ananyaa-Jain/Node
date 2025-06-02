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
> app – Your Express application
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

### 2. Middleware: Intercept and manipulate requests before they reach handlers.

### 3. Template Engines: Render dynamic views.

### 4. Static File Serving: Serve static assets like images and stylesheets.

### 5. Error Handling: Manage errors in a structured way.
