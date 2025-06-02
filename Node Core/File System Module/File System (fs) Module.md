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
| **Task**           | **Async Method** | **Use (Async)**                                                                | **Sync Method**     | **Use (Sync)**                                                         |
| ------------------ | ---------------- | ------------------------------------------------------------------------------ | ------------------- | ---------------------------------------------------------------------- |
| Read file          | `fs.readFile`    | Reads file content without blocking; ideal for web servers                     | `fs.readFileSync`   | Reads content synchronously; good for config files or startup scripts  |
| Write file         | `fs.writeFile`   | Writes or overwrites file asynchronously; scalable                             | `fs.writeFileSync`  | Writes content immediately; good for small data or logging in scripts  |
| Append to file     | `fs.appendFile`  | Adds data to end of file; ideal for logs or audit trails                       | `fs.appendFileSync` | Immediate appending; useful for quick debug logs                       |
| Delete file        | `fs.unlink`      | Deletes files without blocking; used in async workflows                        | `fs.unlinkSync`     | Deletes instantly; suitable for cleanup in short-lived scripts         |
| Make directory     | `fs.mkdir`       | Creates folders without blocking; use in scalable applications                 | `fs.mkdirSync`      | Creates folders instantly; great for bootstrapping folders at startup  |
| Read directory     | `fs.readdir`     | Reads folder contents non-blockingly; useful for listing or processing files   | `fs.readdirSync`    | Reads folder contents instantly; good for file iteration in CLI tools  |
| Get file stats     | `fs.stat`        | Gets file metadata; used to validate or inspect files                          | `fs.statSync`       | Immediate metadata access; used in scripts or checks                   |
| Rename / Move file | `fs.rename`      | Renames or moves file async; ideal for user uploads or file management systems | `fs.renameSync`     | Immediate rename/move; helpful in small utility tools or admin scripts |

## 🔹Async and Sync Decision Chart
| When to Use           | Prefer `Async` Methods             | Prefer `Sync` Methods                  |
| --------------------- | ---------------------------------- | -------------------------------------- |
| Web servers (Express) | ✅ Prevents blocking other requests | ❌ Avoid blocking event loop            |
| Scripts / CLI Tools   | ❌ Not critical                     | ✅ Simple to write, no callbacks needed |
| High Performance      | ✅ Non-blocking                     | ❌ Bad for performance under load       |
| Quick Dev Prototypes  | ❌ Overhead of callbacks            | ✅ Easy and fast development            |



## 🔹Example 
```js
// ============================================
// READING FILES
// ============================================

// Asynchronous file reading with callback
fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log('File content:', data);
});

// Synchronous file reading (blocks execution)
try {
    const data = fs.readFileSync('example.txt', 'utf8');
    console.log('Sync file content:', data);
} catch (err) {
    console.error('Error reading file sync:', err);
}

// Promise-based file reading (modern approach)
async function readFileAsync() {
    try {
        const data = await fsPromises.readFile('example.txt', 'utf8');
        console.log('Promise-based content:', data);
    } catch (err) {
        console.error('Error reading file with promises:', err);
    }
}
```
## 🔹File Encoding
When **reading text files**, always specify encoding (usually 'utf8') to get strings instead of raw buffers. **Without encoding**, you'll receive a ***Buffer object*** that needs to be converted to a **string**.

## 🔹Using Streams for Efficient Data Processing
**Streams** are crucial when working with large files because they process data in **chunks** rather than loading everything into memory. This prevents memory overflow and improves performance.

**There are 4 types of streams:**
1. **Readable** - to read data (ex: reading from a file)
2. **Writable** - to write data (ex: writing to a file)
3. **Duplex (or pipe)** - both readable and writable (ex: a TCP socket)
4. **Transform** - a duplex stram that can modify or transform the data (ex: compression)
> Use `createReadStream()` and `createWriteStream()` for handling large files.

> `pipe()`: Automatically reads from input.txt and passes each chunk to output.txt, allows chaining for better performance

#### Stream Events
| **Event** | **Description**                                              |
| --------- | ------------------------------------------------------------ |
| `data`    | Emitted when a chunk of data is available                    |
| `end`     | Emitted when there is no more data to read                   |
| `error`   | Emitted on any read/write error                              |
| `finish`  | Emitted when all data is flushed to the file (write streams) |
| `close`   | Emitted when the stream is closed                            |

## 🔹Example 
```js
// ============================================
// WORKING WITH STREAMS (for large files)
// ============================================

// Create readable stream
const readStream = fs.createReadStream('large-file.txt', {
    encoding: 'utf8',
    highWaterMark: 1024 // Read 1KB at a time
});

readStream.on('data', (chunk) => {
    console.log('Received chunk:', chunk.length, 'characters');
});

readStream.on('end', () => {
    console.log('Finished reading file');
});

readStream.on('error', (err) => {
    console.error('Stream error:', err);
});
```
We can perform other operations as well like watch file/directory for any changes.
- For files: `fs.watchFile('watched-file.txt', (curr, prev) =>{});`
- For directories: `fs.watch('.', (eventType, filename) => {});`

**Common error codes:**
---
- ENOENT - File or directory doesn't exist
- EACCES - Permission denied
- ISDIR - Expected file but found directory
- OTDIR - Expected directory but found file
- EEXIST - File already exists
