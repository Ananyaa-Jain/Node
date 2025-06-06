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

## 🔹Token-based Authentication (Stateless)
**Stateless authentication** eliminates server-side session storage (no session data is stored on server). Instead, it relies on ***JSON Web Tokens (JWT)***, which contain user data and are **sent with each request**.

### Flow:
1. User logs in → credentials verified.
2. After login, **server** generates a **JWT (JSON Web Token)**.
3. JWT is sent to the client and stored(usually in `localStorage` or an `HTTP-only cookie`).
4. On subsequent requests, the client sends the JWT in the `Authorization` header.
5. Server verifies the token(doesn't need to store anything) and grants access.
