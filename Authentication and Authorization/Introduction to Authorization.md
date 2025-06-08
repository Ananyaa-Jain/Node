# Authorization
Authorization is the process of **determining what actions or resources an authenticated user is allowed to access**.
Once the user is authenticated (i.e., identity verified), authorization decides:
- What **routes, data, functions, or APIs** the user can access.
- What **operations** (read, write, delete) the user can perform.

## Key Concepts of Authorization
| Concept            | Meaning                                                                 |
| ------------------ | ----------------------------------------------------------------------- |
| **User Role**      | The user's level or position (e.g., `admin`, `editor`, `user`)          |
| **Permission**     | The specific actions a user can take (e.g., `createPost`, `deleteUser`) |
| **Access Control** | The logic that restricts access to routes/data based on role/permission |
| **Resource**       | The item being protected (e.g., a route, file, or database entry)       |

## Types of Authorization Models or Methods
1. **Role-Based Access Control (RBAC)**

RBAC assigns roles to users, and each role has predefined permissions.

**Example:** An `admin` can create and delete users, while a `viewer` can only read data
```js
// allowed roles is an array which contains the roles which are allowed to perfom the following task
function authorizeRoles(...allowedRoles){
  return (req, res, next) => {
    if(!req.user || !allowedRoles.includes(req.user.roles)){
      return res.status(403).json({message: "Forbidden: Access Denied"});
    }
    next();
  };
}

// user is already authenticated
// once authenticated, user info is stored in "req.user"

// here only "admin" and "moderator" roles are allowed to access the dashboard
app.get("/dashboard", authorizeRole("admin", "moderator"), (req, res) => {
  res.json({message: "Welcome to Dashboard!!"})
});
```

2. **Attribute-Based Access Control (ABAC)**

Access is determined by a set of attributes (ex: user department, location, time, device type).

**Example:** 
- A doctor can access patient records only if their `department==cardiology`
- Users can access a resource **only during business hours**.


3. **Ownership-Based Access Control**

Users can only access their own data (e.g., update their profile).

**Example:** Restricting access to own profile
```js
app.get("/profile/:id", (req, res) => {
  if(req.user.id !== req.params.id){   // check the id of the authenticated user (req.user.id) with the id of the profile requested (req.params.id)
    return res.status(403).json({message: "Access Denied."})
  }
  res.json({message: "Your profile data."});
});
```

4. **Permission-Based Access Control**

Users are assigned **specific permissions**, not just roles.

**Example:**
```js
{
  username: "ananya",
  role: "admin",
  permissions: ["createUser", "deleteUser", "viewReports"]
}
```
Then, in middleware:
```js
if(req.user.permissions.includes("deleteUsers")){
  // allow
} else{
  res.status(403).json({message: "Access Denied."});
}
```

5. **Access Control Lists (ACLs)**

A list that defines which users or roles can access specific resources.

## HTTP Status Codes in Authorization
| Code  | Meaning                                    |
| ----- | ------------------------------------------ |
| `401` | Not Authenticated (No token or invalid)    |
| `403` | Forbidden (Authenticated, but not allowed) |



