# What is Express.js?
Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. 
It's built on top of Node.js's built-in HTTP module and simplifies the process of building server-side applications and APIs.

## 🔹Understanding the Express Application Object (`app`)
The app object represents the Express application and provides methods for:
- Routing HTTP requests
- Configuring middleware
- Rendering HTML views
- Registering template engines
```js
const app = express();

// app is an instance of express application
// It has various methods like get, post, put, delete, use, listen, etc.
```

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

***Query Parameters (or Optional Route Parameters):***
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

***Difference Between Route and Query Parameters:***

 **Route Parameters** are used to identify a specific resource or resources, while **Query Parameters** are used to sort/filter those resources.
 
| Feature   | Route Parameter (`:userId`)     | Query Parameter (`?fields=name`)     |
| --------- | ------------------------------- | ------------------------------------ |
| Location  | In the URL path                 | After `?` in the URL                 |
| Required? | Typically required              | Optional                             |
| Used For  | Identifying a specific resource | Filtering, pagination, sorting, etc. |
| Example   | `/user/123`                     | `/user/123?fields=name,email`        |


## 🔹Understanding `app.use()`
- `app.use()` is the primary method for mounting middleware functions in Express.
- Middleware functions execute in the order they are defined
- Can be applied globally or to specific paths
- Each middleware has access to request (req), response (res), and next function
- Must call `next()` to pass control to the next middleware
```js
// Global middleware (applies to all routes)
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
    next(); // Must call next() to continue
});

// Path-specific middleware
app.use('/api', (req, res, next) => {
    console.log('API endpoint accessed');
    next();
});

// Multiple middleware functions
app.use('/admin', 
    authenticateUser, // Custom middleware
    checkAdminRole,   // Custom middleware
    (req, res, next) => {
        console.log('Admin area accessed');
        next();
    }
);

// Middleware with error handling
app.use((req, res, next) => {
    req.requestTime = Date.now();
    next();
});
```

### 2. Middleware: 
- Middleware functions in Express execute code before a request reaches its route handler.
- It is a helper function that can be used to extend the functionality of the Express app.
- They have access to the request and response objects, as well as the next middleware function in the application’s request-response cycle. These functions can perform various operations like:-
    - Executing code
    - Modifying the request and response Object
    - Terminating the request - response cycle
    - Handling cookies
    - Logging requests
    - Passing control to subsequent middleware function (Call `next()` to pass control)
- `app.use()` - the primary method for mounting middlewares.

***Types of Middlewares:***
1. **Application-Level Middleware:**
- Application-level middleware is bound to the Express app instance (`app`). It runs on every request that matches the specified route.
- Binds directly to `app` using `app.use()`.
- Used for tasks like authentication, logging, and request modifications.
```js
const express = require('express');
const app = express();

// Middleware function
app.use((req, res, next) => {
    console.log(`Request Method: ${req.method}, URL: ${req.url}`);
    next(); // Proceed to the next middleware or route handler
});

// Routes
app.get('/', (req, res) => {
    res.send('Home Page');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
```

2. **Router-Level Middleware:**
- Router-level middleware binds to an instance of `express.Router()`, not `app`, making it modular and reusable.
- Only applies to requests hitting routes within the router.
- Useful for separating concerns (e.g., authentication middleware in user routes).
```js
const express = require('express');
const router = express.Router();

// Middleware for logging in user routes only
router.use((req, res, next) => {
    console.log(`Router-Level Middleware: ${req.method}, ${req.url}`);
    next();
});

// Routes
router.get('/users', (req, res) => {
    res.send('User List');
});

router.post('/users', (req, res) => {
    res.send('User Created');
});

// Export router
module.exports = router;
```

3. **Error-Handling Middleware:**
- Error-handling middleware catches errors in the request lifecycle and provides a centralized way to manage them.
- Recognized by four parameters (err, req, res, next).
- Must be declared after all other middleware and routes (i.e. at the end).
- Handles unexpected errors, logging, and custom error responses.
```js
const express = require('express');
const app = express();

// Route with a simulated error
app.get('/error', (req, res, next) => {
    const err = new Error('Something went wrong!');
    err.status = 500;
    next(err); // Pass error to next middleware
});

// Error-handling middleware (Must have four parameters)
app.use((err, req, res, next) => {
    console.error(`Error: ${err.message}`);
    res.status(err.status || 500).json({ error: err.message });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
```

4. **Built-In Middleware:**
- Express provides built-in middleware for common tasks.
- **Key Built-in Middlewares:**
  - `express.json()` → Parses JSON request bodies to javascript objects.
  - `express.urlencoded( { extended : true } )` → Parses URL-encoded request bodies (usually for form data or input).
  - `express.static('folder')` → Serves static files.
```js
const express = require('express');
const app = express();

// JSON Parsing Middleware
app.use(express.json()); 

// Serving Static Files
app.use(express.static('public')); // Serves files from 'public' folder

app.post('/data', (req, res) => {
    res.json(req.body); // Sends parsed JSON request body
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
```

5. **Third-Party Middleware:**
- Third-party middleware extends Express functionality beyond built-in features. These packages are installed via `npm`.
- **Popular Third-Party Middleware:**
    - `morgan` → HTTP request logging.
    - `cors` → Handles cross-origin resource sharing.
    - `helmet` → Security enhancements for HTTP headers.
    - `compression` → Enables gzip compression for faster responses.
```js
const express = require('express');
const morgan = require('morgan');
const app = express();

// Use Morgan for logging HTTP requests
app.use(morgan('tiny')); // Logs requests in a concise format

app.get('/', (req, res) => {
    res.send('Home Page');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
```


### 3. Template Engines:
A **template engine** allows you to embed dynamic content into HTML pages and generate HTML views efficiently. Instead of manually constructing HTML strings in route handlers, template engines help render data dynamically using special syntax. Express.js supports various template engines, such as:
- EJS (Embedded JavaScript)
- Pug (formerly Jade)
- Handlebars
  
Let's understand **EJS (Embedded Javascript):**

EJS uses simple `<%= %>`syntax to inject data into HTML.
1. **Installation:**
```bash
npm install ejs
```
2. **Setting EJS in Express (`server.js`):**
```js
const express = require('express');
const app = express();

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Route to render EJS template
app.get('/profile', (req, res) => {
    const user = { name: "Ananya", age: 25 };
    res.render('profile', { user });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
```
3. **EJS Template (`views/profile.ejs`):**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Profile Page</title>
</head>
<body>
    <h1>Welcome, <%= user.name %></h1>
    <p>Age: <%= user.age %></p>
</body>
</html>
```
***Key Features:***
- `<%= variable %>` → Displays dynamic data.
- `<% %>` → Executes JavaScript inside templates.
- **Reusable Views** → Shared components like headers.


### 4. Static File Serving: 
- Express.js provides built-in middleware, `express.static()`, to serve static files like images, CSS, JavaScript, and HTML. Static files are essential for frontend assets in web applications.
- Serve static assets like images and stylesheets.
- The `express.static()` middleware allows you to serve static files by specifying a directory.

### 5. Error Handling: Manage errors in a structured way.
