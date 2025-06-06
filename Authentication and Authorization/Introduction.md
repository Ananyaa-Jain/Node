# Authentication
**Authentication** is the process of **verifying the identity** of a user (e.g., login with username/password).

There are **two primary types:**
- **Session-based Authentication (Stateful)**
- **Token-based Authentication (Stateless)**


## 🔹Session-Based Authentication (Stateful)
**Session-based authentication** relies on storing user information in the ***server memory or a database*** after login. When a user logs in, the server **creates a session** and stores the **session ID**, which is then sent to the client via a **cookie**.

## 🔹Token-based Authentication (Stateless)
**Stateless authentication** eliminates server-side session storage. Instead, it relies on ***JSON Web Tokens (JWT)***, which contain user data and are **sent with each request**.
