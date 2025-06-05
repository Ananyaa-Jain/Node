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
## 🔹Hight-Level Principle: Seperation Of Concerns
Each file or folder should have **one clear responsibility**. This makes your app easier to maintain, test, and scale.

## 🔹Understanding responsibility of each file and folder
**1. app.js - Main application entry point**

It contains:
- Express app setup
- Middleware configuration (eg: express.json())
- Route mounting (eg: app.use("/users", userRoutes ) )
- Server startup logic (app.listen(...))


**2. routes/users.js - Routing layer**

It contains:
- Route definitions like:
  ```js
  router.get("/users", userController.listUsers);
  ```
- only map URLs to controller functions.
- this file does not contain logic


**3. controllers/userController.js - Business logic layer**

It contains:
- Functions that control requests and responses
- Reads from and write to data sources (eg: JSON file or DB)
- Example:
  ```js
  exports.listUsers = (req, res) => {
    //read users.json and return data
  }
  ```
- This is where the actual work happens. It’s responsible for processing data, handling errors, and sending responses. Keeping logic here makes it reusable and testable.

**4. models/user.js - Data Model**

It contains:
- A class or schema that defines what a **User** is
- Example:
  ```js
  class User{
    constructor (id, name, email){
      this.id = id;
      this.name = name;
      this.email = email;
    }
  }
  ```
- If you later switch to a database (like MongoDB), this file will define the **structure of your data**. Even with JSON, it helps enforce consistency and clarity.


**5. data/users.js - Static Data Source**

It contains:
- A JSON array of user objects
- Example:
  ```json
  [
    {"id" : 1, "name" : "Ananya", "email" : "ananya@example.com"}
  ]
  ```
- This acts as a **mock database**. It’s great for prototyping or small apps. You can later replace it with a real database without changing your controller logic much.


**5. views/users.ejs - View Template**

It contains:
- HTML with embedded Javascript (EJS Syntax)
- Example:
  ```HTML
  <ul>
    <% users.forEach((user) => { %>
      <li> <%= user.name %> </li>
    <% }) %>
  </ul>
  ```
- If you’re using **server-side rendering**, this is where you generate HTML pages dynamically. If you're building a frontend separately (e.g., React), you might not need this.


**6. package.json - Project metadata and dependencies**

It contains:
- Project name, version, description
- Scripts like **"start"**: **"node app.js"**
- Dependencies like express, ejs  


## 🔹Summary

| File/Folder                | Responsibility                          | Why It Exists                                           |
|----------------------------|------------------------------------------|---------------------------------------------------------|
| app.js                     | App setup and server start               | Central hub of the app                                  |
| routes/users.js            | URL-to-controller mapping                | Keeps routing clean and separate                        |
| controllers/userController.js | Handles logic and data processing       | Modular, testable business logic                        |
| models/user.js             | Defines data structure (optional)        | Useful for consistency and future DB integration        |
| data/users.json            | Stores user data                         | Simple mock database                                    |
| views/users.ejs            | Renders HTML (if using EJS)              | Server-side rendering of UI                             |
| package.json               | Project config and dependencies          | Required for Node.js to manage the app                  |
