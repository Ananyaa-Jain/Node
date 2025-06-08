# HTTP
HTTP (**HyperText Transfer Protocol**) is the foundation of communication between clients (like browsers or mobile apps) and backend servers. 
It defines **how data is requested and exchanged** over the web.

When a client makes a request, the backend server processes it and sends a **response** — all using HTTP.

## 1. HTTP Requests: How the Client Talks to the Backend
In backend development, every interaction starts with an HTTP request. A request consists of:

 - **Method:** Defines what action is needed (GET, POST, PUT, DELETE).
 - **Headers:** Contain metadata like authentication tokens or content type.
 - **Body:** Holds data (for methods like POST and PUT).

**Example:** When a user logs in, the frontend sends a `POST` request with credentials. Your backend **validates the data**, processes authentication, and responds accordingly.
```json
POST /login
{
  "username": "Ananya",
  "password": "password123"
}
```
Your Express.js backend might handle this like:
```js
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (authenticateUser(username, password)) {
        res.json({ message: 'Login successful', token: generateJWT(username) });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});
```
## 2. HTTP Responses: How the Backend Talks Back
After processing the request, your backend **sends a response**, which includes:

- **Status Code** (200 OK, 404 Not Found, 500 Internal Server Error).
- **Headers** (content type, security headers).
- **Body** (the actual data).

**Example:** *Fetching User Profile* A `GET /profile` request might return:
```json
{
  "username": "Ananya",
  "role": "admin",
  "tasks_completed": 47
}
```
Your backend in Express.js could respond like this:
```js
app.get('/profile', (req, res) => {
    const userProfile = getUserProfile(req.user);
    res.json(userProfile);
});
```
## 3. Stateless Nature of HTTP
HTTP is called stateless because **each request from a client to a server is independent and does not retain any memory of past interactions**. This means:
- The server does **not store** any information about previous requests.
- The client must **send all necessary data** in each request for the server to process it.

**Example: Logging In**
Assume you log into a website:
1. You send a request with your username & password.
2. The server verifies your credentials and responds with a success message.

Now, when you visit the dashboard, HTTP **does not remember** that you logged in — each request is independent. 
To maintain user sessions, websites use **session management techniques** like:

- **Cookies-Based Sessions** (stored on the client and sent with each request)
Cookies are small pieces of data stored on the user's browser. They help maintain state by sending stored information with each request.
  - When a user logs in, the server **sends a session ID** in a cookie.
  - The browser **automatically sends this cookie** with each subsequent request.
  - The server **looks up the session ID** to retrieve user-related data.

**Example:** Online shopping carts use cookies so items remain in the cart even if the user navigates to another page.

- **JWT (JSON Web Tokens) Authentication** (sent in authorization headers)
JWT provides stateless session management by encoding user information inside a self-contained token.
  - After login, the server **generates a JWT**, which includes user details & a signature.
  - The client **stores the token** (usually in local storage or HTTP headers).
  - With every request, the client **sends the token**, allowing authentication **without storing session data on the server**.

**Example:** Authentication system for the task management project could use JWT to validate users without needing a database lookup for every request.



- **Server-Side Session Storage** (stored in the server with a reference to the user)
Instead of relying on client-side tokens, some applications store **session data on the server**.
  - After login, the server creates a **session object** (linked to a session ID).
  - The client **sends the session ID** in every request.
  - The server **retrieves session data** from memory or a database.
    
**Example:** Banking applications often use server-side sessions for security, preventing users from modifying authentication data.

## 4. Middleware & Security in HTTP Requests
Since HTTP allows **direct client-server interactions**, backend developers must secure requests:
- **Middleware** (`app.use()`) allow you to modify request objects, handle authentication, manage errors, and apply security measures.
  Like:
    1. Logging Incoming Requests - Middleware can capture details about incoming requests for debugging and monitoring.
    2. Authentication Middleware - Middleware ensures users are verified before accessing protected resources.
- **Rate Limiting** prevents excessive API requests (e.g., brute-force login attempts, API misuse). Rate limit can be applied using `express-rate-limit`
- CORS controls cross-origin requests. If an API needs to accept requests from different origins (domains), CORS middleware allows or restricts access
- HTTPS encrypts requests to prevent interception.

## 5. HTTP in RESTful APIs
***What is RESTful API Design?***

RESTful APIs follow a **structured** approach where every **URL (endpoint) represents a resource**. Clients interact via **HTTP methods**, ensuring consistency.

**REST API principles:**
- **Statelessness** → Each request is independent.
- **Uniform interface** → Standardized HTTP methods (`GET`, `POST`, etc.).
- **Resource-based URLs** → `/users`, `/tasks`, etc.

## Protocols in API
**Web APIs (HTTP APIs)** are the most common APIs used to connect frontend applications with backend servers over the internet. They follow protocols like REST, GraphQL, and SOAP.
- **REST APIs** → Use standard HTTP methods (`GET`, `POST`, `PUT`, `DELETE`) to exchange JSON or XML data.
- **GraphQL APIs** → Allow flexible queries to fetch specific data, reducing over-fetching or under-fetching.
- **SOAP APIs** → XML-based, often used in legacy enterprise applications.
