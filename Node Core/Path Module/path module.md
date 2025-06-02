# path Module
The `path` module in Node.js is a core module used to work with file and directory paths in a way that is **platform-independent** (i.e., it works on both Windows and POSIX-based systems like Linux and macOS). 
It provides utilities to manipulate, resolve, normalize, and parse paths.

## 🔹Importing the module:
```js
const path = require('path');
```
## 🔹Common Methods in `path` Module:
### 1. `path.join ( [...paths] )`
Joins all given path segments using the correct separator (`/` or `\`).
```js
const fullPath = path.join(__dirname, 'public', 'index.html');
console.log(fullPath);

// Output on Linux: /Users/john/project/public/index.html
```
> Automatically normalizes the path and removes redundant slashes

### 2. `path.resolve ( [...paths] )`
Resolves a sequence of paths into an **absolute path**, starting from **right to left**.
```js
const resolvedPath = path.resolve('folder', 'file.txt');
console.log(resolvedPath);

// Output: /current/working/dir/folder/file.txt
```
> Useful when building absolute paths relative to the working directory.
 ### 3. `path.basename ( path, [ext] )`
 - Returns the **filename** from the full path.
 - `ext` is optional
```js
const filename = path.basename('/home/user/file.txt');
console.log(filename); // file.txt

const noExt = path.basename('/home/user/file.txt', '.txt');
console.log(noExt);    // file
```

 ### 4. `path.dirname (path)`
 Returns the directory part of the path
 ```js
const dir = path.dirname('/home/user/file.txt');
console.log(dir); // /home/user
```

### 5. `path.extname (path)`
Returns the file **extension** ***(including the dot)***.
```js
const ext = path.extname('index.html');
console.log(ext); // .html
```

### 6. `path.parse(path)`
Parses a path into an object with properties: `root`, `dir`, `base`, `ext`, `name`.
```js
const parsed = path.parse('/home/user/file.txt');
console.log(parsed);
/*
{
  root: '/',
  dir: '/home/user',
  base: 'file.txt',
  ext: '.txt',
  name: 'file'
}
*/
```

### 7. `path.format(pathObject)`
The opposite of `path.parse()`, it builds a path string from an object
```js
const formatted = path.format({
  dir: '/home/user',
  name: 'file',
  ext: '.txt'
});
console.log(formatted); // /home/user/file.txt
```
### 8. `path.isAbsolute(path)`
Checks if a path is **absolute**.
```js
console.log(path.isAbsolute('/home/user')); // true
console.log(path.isAbsolute('user/file.txt')); // false
```
