# Security Mechanisms for Secure Authentication
Authentication is just the first step in securing an application. Multiple layers of security mechanisms must work together to protect against various attack vectors and ensure comprehensive protection.

## 1. Password Hashing (Using `bcrypt`)
**The Problem:** Storing passwords in plain text is one of the most critical security vulnerabilities. If a database is compromised, attackers immediately gain access to all user credentials.

**The Solution: Cryptographic Hashing**
- Password hashing transforms plain-text passwords into irreversible cryptographic digests using algorithms like bcrypt, scrypt, or Argon2.
- A hash is a one-way cryptographic function. You **can’t reverse** a hash to get the original password.
- `bcrypt` also adds a **salt** (random data) before hashing, which ensures **even the same passwords have different hashes**.

**Technical Implementation Flow:**
```
1. User Registration:
   Plain Password → bcrypt.hash(password, saltRounds) → Hashed Password → Database

2. User Login:
   Plain Password → bcrypt.compare(password, hashedFromDB) → Boolean Result
```
**Code Implementation:**
```js
const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    const saltRounds = 10;  // Higher value = stronger but slower hashing
    return await bcrypt.hash(password, saltRounds);
};

const verifyPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};
```
- `bcrypt.hash()` creates a secure hash.
- `bcrypt.compare()` verifies user input against stored hash.

## 2. Rate Limiting (Prevent Brute-Force Attacks)
**The Problem:** Attackers can use bots to guess credentials by sending thousands of login attempts (brute force or credential stuffing or dictionary attacks or distributed attacks leading to denial of service i.e. DOS attacks).

**The Solution:** **Rate limiting** restricts the **number of requests** a user can make in a given time window.

**Implementation Strategies:**
- **Time-Based Windows:** Track requests per IP address within specific time frames. **Ex:** 5 attempts per 15-minute window.
- **Progressive Penalties:** Increase lockout duration with repeated violations. **Ex:** First violation: 5 minutes → Second: 30 minutes → Third: 2 hours
- **Advance Techniques:**
  - CAPTCHA Integration: Human verification after threshold
  - Device Fingerprinting: Track suspicious device patterns
  - Geolocation Analysis: Flag login attempts from unusual locations

**Code Implementation:**
```js
const express = require("express");
const rateLimit = require("express-rate-limit");

const app = express();

// Define a rate limiter for authentication routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message:{
    error: "Too many login attempts. Please try again later.",
    retyrAfter:  Math.round(15 * 60 * 1000 / 1000) // seconds
  }
  standardHeaders: true, // Enable RateLimit headers
  legacyHeaders: false, // Disable X-RateLimit headers
});

app.use("/login", authLimiter); // Apply limiter to login route

app.post("/login", (req, res) => {
  res.send("Login attempt received.");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```
**Key Features:**
- **windowMs:** The time window in milliseconds for which requests are checked/remembered. (e.g., 15 minutes).
- **max:** Sets the maximum number of requests allowed per window. Can be a number or a function that returns a number based on the request.
- **message:** Custom response when the limit is exceeded. Can be a string, JSON object, or function.
- **standardHeaders:** Enables headers like `RateLimit-*` for better client-side handling. Whether to send standard rate limit headers (`X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`).
- **legacyHeaders:** Disables older headers (`X-RateLimit-*`). Whether to send deprecated rate limit headers for backward compatibility.
- **store:** Where to store request counts. Defaults to in-memory storage, but can use Redis, MongoDB, or other stores for production.

## 3. CORS Policy (Cross-Origin Resource Sharing)
- CORS, or **Cross-Origin Resource Sharing**, is a security feature implemented by web browsers to control how resources on a web page can be requested from another domain (origin) outside the domain from which the resource originated.
- By default, browsers enforce the Same-Origin Policy (SOP), which restricts web pages from making requests to a different domain than the one that served the web page.
- **Example:** A frontend hosted on `example.com` making API calls to a backend on `api.example.com`. That’s where CORS comes in.
> Origin is Combination of protocol + domain + port

***How CORS Works:***
When a browser makes a cross-origin HTTP request (like GET, POST, PUT, etc.), it includes an `Origin` header. The server can respond with specific CORS headers to tell the browser whether the request is allowed.

**Key Headers:**
- **Access-Control-Allow-Origin:** Specifies which origin(s) are allowed to access the resource.
- **Access-Control-Allow-Methods:** Lists the HTTP methods allowed (e.g., GET, POST).
- **Access-Control-Allow-Headers:** Lists the headers the client is allowed to use.
- **Access-Control-Allow-Credentials:** Indicates whether credentials (cookies, HTTP auth) can be sent.











