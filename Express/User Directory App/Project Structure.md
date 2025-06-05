# Project Sturcture
```
user-directory-app/
│
├── app.js                  # Main entry point
├── package.json            # Project metadata and dependencies
│
├── routes/
│   └── users.js            # Route definitions for user-related endpoints
│
├── controllers/
│   └── userController.js   # Logic for handling user routes
│
├── models/
│   └── user.js             # Optional user model (for future DB use)
│
├── data/
│   └── users.json          # Sample user data in JSON format
│
├── views/
│   └── users.ejs           # Sample EJS template for rendering users
```



## Summary

| File/Folder                | Responsibility                          | Why It Exists                                           |
|----------------------------|------------------------------------------|---------------------------------------------------------|
| app.js                     | App setup and server start               | Central hub of the app                                  |
| routes/users.js            | URL-to-controller mapping                | Keeps routing clean and separate                        |
| controllers/userController.js | Handles logic and data processing       | Modular, testable business logic                        |
| models/user.js             | Defines data structure (optional)        | Useful for consistency and future DB integration        |
| data/users.json            | Stores user data                         | Simple mock database                                    |
| views/users.ejs            | Renders HTML (if using EJS)              | Server-side rendering of UI                             |
| package.json               | Project config and dependencies          | Required for Node.js to manage the app                  |
