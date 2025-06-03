# CORS Module
CORS (Cross-Origin Resource Sharing) is a security feature in web browsers that controls how resources are shared across different origins. By default, browsers **restrict requests** between different domains to protect users from malicious attacks.

## 🔹Problem It Solves:
By default, **browsers block cross-origin HTTP requests** (for security reasons).
This means a web app running at:
```
http://example-client.com
```
cannot make requests to:
```
http//api.myserver.com
```
unless the server explicitly allows it.

## 🔹Why CORS Matters in Express?
If you're building an API or backend with Express that's consumed by a frontend hosted on another domain, you need to enable CORS.
- Frontend on `localhost:3000`
- Backend (Express API) on `localhost:5000`

You’ll face errors like:
> Access to fetch at `http://localhost:5000/api` from origin `http://localhost:3000` has been blocked by CORS policy.

## 🔹Installing CORS
To use CORS in Express, install the module first:
```
npm install cors
```
Then, require it and use it in your Express app:
```js
const express = require("express);
const cors = require ("cors");
const app = express();

//Enable CORS
app.use(cors())

app.get('/', (re, res)=>{
  res.send("CORS Enabled!!");
});

app.listen(3000, ()=>{
  console.log("Server is running on port 3000")
});
```
This allows **all origins** to make requests.

## 🔹Restricting CORS to Specific Origins
Instead of allowing every origin, you can define which domains are permitted:
```js
app.use(cors({
  origin: 'https://example.com' // Only requests from 'example.com' will be allowed
}))
```
For multiple origins:
```js
const allowedOrigins = ['https://example.com', 'https://anotherdomain.com'];

app.use(cors({
    origin: allowedOrigins
}));
```
## 🔹Handling CORS for Specific HTTP Methods
You can restrict which HTTP methods are permitted:
```js
app.use(cors({
    origin: 'https://example.com',
    methods: ['GET', 'POST']
}));
```

## 🔹Handling CORS with Credentials
If your API requires authentication (cookies, tokens), enable credentials:

***Backend (Server.js)***
```js
app.use(cors({
    origin: 'https://example.com',  // must be explicit, cannot use '*'
    credentials: true   // allow cookies, auth headers
}));
```
This allows the browser to send **cookies, authorization headers, and credentials** in cross-origin requests.

By default, CORS **blocks** credentials like:
- **Cookies** (session-based authentication)
- **Authorization headers** (`Authorization: Bearer <token>`)
- **TLS client certificates**
  
Setting `credentials: true` ensures the server **accepts** these authentication details.

***Frontend Request with Credentials***

When making a request **from the frontend**, ensure `credentials: 'include'` is set:
```js
fetch('http://api.example.com/data', {
    method: 'GET',
    credentials: 'include' // Ensures cookies and auth headers are sent
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));
```
**Key points:**
- `credentials: 'include'` → Sends cookies in cross-origin requests.
- Works only if the backend has `credentials: true.`
