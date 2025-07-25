# Authentication
**Authentication** is the process of **verifying the identity** of a user (e.g., login with username/password).

There are **two primary types:**
- **Session-based Authentication (Stateful)**
- **Token-based Authentication (Stateless)**


## 🔹Session-Based Authentication (Stateful)
**Session-based authentication** relies on storing user information in the ***server memory or a database*** after login. When a user logs in, the server **creates a session** and stores the **session ID**, which is then sent to the client via a **cookie**.

### Flow:
1. User logs in → credentials verified.
2. **Server** creates a session and stores **user session data** (like user ID) in **server-side memory or DB**.
3. **Server** sends a `Set-Cookie` header to client with **session ID**.
4. On **every next request**, browser sends that **cookie back**.
5. Server **matches session ID** and returns appropriate response.

### Dependency:
```bash
npm install express-session
```
`express-session` is a middleware for Express that allows you to manage user sessions on the server side.
It helps you store and retrieve data across multiple requests from the same user.


### Example:
```js
const express = require("express");
const session =  require("express-session");

const app = express();

app.use(express.urlencoded({extended: false}));

// Configure session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set true if HTTPS
}))

//Dummy User
const USER = {username: "ananya", password: "1234"};

// login request
app.post("/login", (req. res) => {
  const {username, password} = req.body;

  // verfiy from the database
  if(username === USER.username && password === USER.password){
    req.session.user = username;
    res.send("Login Successful!!");
  }else{
    res.send("Invalid Credentials")
  }
});

// dashboard request
app.get("/dashboard", (req, res) => {
  if(req.session.user){
    res.send(`Welcome ${req.session.user}`);
  }else{
    res.status(401).send("Unauthorized")
  }
});

// logout request
app.post("/logout", (req, res)=> {
  req.session.destory();
  res.send("Logged out")
});

app.listen(3000, () => { console.log("Server is running on port 3000") } );
```

## 🔹Token-based Authentication (Stateless)
**Stateless authentication** eliminates server-side session storage (no session data is stored on server). Instead, it relies on ***JSON Web Tokens (JWT)***, which contain user data and are **sent with each request**.

### Key Components of a JWT Token:
A JWT token has three parts:
- **Header:** Specifies the type (JWT) and signing algorithm (`HS256`).
- **Payload:** Contains user data (`id`, `role`, `expiry`).
- **Signature:** Ensures token integrity.


### Flow:
1. User logs in → credentials verified.
2. After login, **server** generates a **JWT (JSON Web Token)**.
3. JWT is sent to the client and stored(usually in `localStorage` or an `HTTP-only cookie`).
4. On subsequent requests, the client sends the JWT in the `Authorization` header.
5. Server verifies the token(doesn't need to store anything) and grants access.

### Dependency:
```bash
npm install jsonwebtoken
```
### Example:
```js
const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

//Dummy user
const USER = {username: "ananya", password: "1234"};
const SECRET_KEY = "jwt-secret-key"

// login request
app.post("/login", (req, res) => {
  const {username, password} = req.body;

//verify from DB
  if(username === USER.username && password === USER.password){
    // create JWT
    // jwt.sign(payload, secretOrPrivateKey, [options, callback])
    const token = jwt.sign({username}, SECRET_KEY, {expiresIn: "1h"});
    res.json({token});
  }else{
    res.status(401).send("Invalid Credentials");
  } 
});

// middleware to verify token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];   // Bearer <token>
  const token = authHeader ? authHeader.split(" ")[1] : undefined;
  // const toeken = req.headers.authorization?.split(" ")[1];

  if(!token) return res.status(401).send("No Token");

  //verify token
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if(err) return res.status(403);
    req.user = user;  // Add user to request
    next();
  });
}

app.get("/dashboard", authenticateToken, (req, res) => {
  res.send(`Welcome ${req.user.username}`)
}); 

app.listen(3000, () => {
  console.log("JWT auth server running at port 3000")
})

```

## 🔹Comparision Table for Stateful and Stateless Authentication

| Feature             | Session-Based                       | Token-Based (JWT)        |
| ------------------- | ----------------------------------- | ------------------------ |
| Server-side storage | Required (memory/DB)                | Not required             |
| Stateless           |  No                                |  Yes                    |
| Scalability         | Harder (needs shared session store) | Easier (no shared state) |
| Token invalidation  | Easy (destroy session)              | Hard (need blacklist)    |
| Storage on client   | Cookie (browser-managed)            | LocalStorage / Cookie    |
| Suitable for        | Web apps                            | SPA, mobile apps, APIs   |





