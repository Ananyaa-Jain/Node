# npm
It is the default package manager for **Node.js**.

**JavaScript library/package** - `A JavaScript library/package is a collection of pre-written code that you can reuse in your own application instead of writing everything from scratch.`

📘 Some popular JS Libraries (Packages) are:-
| Library        | Purpose                                     |
| -------------- | ------------------------------------------- |
| `express`      | Build **web servers** in Node.js                |
| `axios`        | Make **HTTP requests**                          |
| `react`        | Build **user interfaces**                       |
| `mongoose`     | Work with **MongoDB** easily                    |
| `moment`       | Work with **dates and times**                   |
| `chalk`        | Colorize console output                     |
| `jsonwebtoken` | Handle **JWT-based authentication**             |
| `bcrypt`       | **Hash passwords** securely                     |

### 📁 Key Concepts in npm

#### 1. `package.json` – The Project Manifest

##### 🧠 What it is:

A JSON file that contains **metadata** about your project and lists its **dependencies** (other packages it needs).

##### 📃 Includes:

* Project name, version
* Description, license, author
* Dependencies (packages you need)
* Dev dependencies (packages needed only in development)
* Custom scripts (to automate commands like starting a server)

##### 📌 Example:

```json
{
  "name": "ananya",
  "version": "1.0.0",
  "description": "A sample Node.js app",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
}
```

---

#### 2. `node_modules/` – Local Package Storage

##### 🧠 What it is:

A folder that npm creates to **store all the packages** (and their dependencies) you install.

* It's usually **excluded from version control** (like Git) by adding it to `.gitignore`.

---

#### 3. `package-lock.json` – Exact Dependency Tree

##### 🧠 What it is:

* Automatically generated when you install packages.
* **Locks exact versions** of every package (and sub-package) used in your project.
* Helps ensure that everyone who installs your project gets the **same setup**.

##### 👀 Partial Example:

```json
"express": {
  "version": "4.18.2",
  "resolved": "https://registry.npmjs.org/express/-/express-4.18.2.tgz",
  "integrity": "sha512-abc..."
}
```

---

#### 4. `dependencies` vs `devDependencies`

##### ✅ `dependencies`

Packages required for your app to run in **production**.

```json
"dependencies": {
  "express": "^4.18.2"
}
```

Install like:

```bash
npm install express
```

---

##### 🛠️ `devDependencies`

Packages only needed for **development**, like:

* Testing tools
* Linters
* Live-reload servers (e.g., `nodemon`)

```json
"devDependencies": {
  "nodemon": "^2.0.22"
}
```

Install like:

```bash
npm install nodemon --save-dev
```

---

#### 5. `scripts` – Automate Common Tasks

##### 🧠 What it is:

Custom terminal commands defined in `package.json`.

Run them with:

```bash
npm run <script-name>
```

##### 📘 Example:

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js",
  "test": "echo \"Running tests...\""
}
```
Run with:

```bash
npm run start
npm run dev
```

---

#### 6. Global vs Local Packages

##### 🧠 Local Installation

```bash
npm install express
```

* Stored in `node_modules` inside the current project.
* Only available to **that** project.

##### 🌍 Global Installation

```bash
npm install -g nodemon
```

* Installed in your system.
* Available in **all projects**.
---

#### ✅ Summary about Key Concepts in npm

| Concept             | Description                          | 
| ------------------- | ------------------------------------ | 
| `package.json`      | Project metadata and dependency list |
| `node_modules/`     | Folder containing installed packages |
| `package-lock.json` | Snapshot of exact package versions   |
| `dependencies`      | Needed in production                 |
| `devDependencies`   | Needed during development only       |
| `scripts`           | Automate tasks via npm               |
| Global vs Local     | Where packages are installed         |






 ## 🧠 Summary

| Term                             | Meaning                                    |
| -------------------------------- | ------------------------------------------ |
| **JavaScript Library / Package** | A collection of reusable JS code           |
| **npm**                          | Node Package Manager, used to get packages |
| **node\_modules/**               | Folder where packages are stored           |
| **package.json**                 | Lists the packages your project uses       |
