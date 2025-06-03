# dotenv module
- The `dotenv` module is a popular Node.js package that loads environment variables from a `.env` file into `process.env`. 
- Express.js applications often use `dotenv` to securely load environment variables from a `.env` file.
> `.env` file allow applications to **store sensitive information** (like API keys, database credentials, and configuration settings) outside the source code.


## 🔹Installing `dotenv` in Express
To use `dotenv`, first install it:
```bash
npm install dotenv
```
Then, require and configure it in your Express app:
```js
require("dotenv").config();
```

## 🔹Using `dotenv` in Express.js:
**1. Create a `.env` file in project root:**
```env
// 	Stores secret config like API keys, DB passwords
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=myapp
DB_USER=postgres
DB_PASSWORD=secretpassword

# API Keys
JWT_SECRET=your-super-secret-jwt-key
API_KEY=your-api-key-here
STRIPE_SECRET_KEY=sk_test_your_stripe_key

# Server Configuration
PORT=3000
NODE_ENV=development

# External Services
REDIS_URL=redis://localhost:6379
EMAIL_SERVICE_KEY=your-email-service-key
```
**2. Load Environment Variables**
```js
// Load at the very beginning of your app, so all config is available before it's used
require('dotenv').config();   // 	Loads env vars from .env into process.env

const express = require('express');
const app = express();

// Now you can access environment variables
const port = process.env.PORT || 3000;
const dbHost = process.env.DB_HOST;
const jwtSecret = process.env.JWT_SECRET;

console.log(`Server running on port ${port}`);
console.log(`Database host: ${dbHost}`);
```
> `process.env.KEY` →	Access any variable from the `.env` file





