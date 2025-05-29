# fs Module
The fs (File System) module in Node.js is a core module that provides an API for interacting with the file system. You can perform various file 
operations, such as reading, writing, updating, and deleting files.

The fs module operates in two main modes:
- **Synchronous operations** - Block the execution thread until the operation completes. The synchronous versions end with *"Sync"* (e.g., *readFileSync*).
- **Asynchronous operations** - Non-blocking, use callbacks or promises

## 🔹Importing the fs Module
Using Common JS:
```js
const fs = require('fs');
const fsPromises = require('fs').promises;
```
Or using ES6 modules:
```js
import fs from 'fs';
import { promises as fsPromises } from 'fs';
```
## 🔹Syntax and Return Type
#### Syntax
- **Async:** `fs.readFile(path, options, callback)`
- **Sync:** `fs.readFile(path, options)`
> `path`: string or `Buffer` or `URL`

> `options`: (optional) encoding (`'utf8'`, `'base64'`) or `{ encoding, flag }`

> `callback`: `(err, data) => {}`

```js
const fs = require('fs');

// Async method (callback handles data)
fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data); // Returns file content
});

// Sync method (returns data directly)
const data = fs.readFileSync('example.txt', 'utf8');
console.log(data); // Returns file content
```
#### Return Types
- **Async:** `undefined`; the file data is passed to the callback.
- **Sync:** Returns file data as a `Buffer` or `string`.
  
## 🔹Key Methods 
