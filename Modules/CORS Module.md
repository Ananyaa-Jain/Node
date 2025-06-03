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
