# url module
The `url` module in Node.js provides utilities for parsing and formatting URLs. It's particularly useful when working with HTTP servers, where you need to:
- Extract pathname, query parameters, hostname, etc.
- Construct URLs
- Modify or analyze parts of a URL
  
## 🔹Types
There are **two main APIs** in the `url` module:
1. **Legacy API(older)** - `url.parse()`, `url.format()`
2. **WHATWG URL API(modern)** - `new URL()` constructor

## 🔹Importing the module
It's a core module, so you don’t need to install it — just require it.
```js
const url = require('url');
```
## 🔹Common Methods in url Module
### 1. `url.parse( url )`
The `url.parse()` mathod extracts different components from a given URL.
```js
const url = require("url");
const myUrl = url.parse("https://example.com:8080/path/page?name=John&age=30", true);

console.log(myUrl.protocol); //https:
console.log(myUrl.hostname); // "example.com"
console.log(myUrl.port); // "8080"
console.log(myUrl.pathname); // "/path/page"
console.log(myUrl.query); // { name: 'John', age: '30' }
```

### 2. Using the `new URL()` constructor
A modern way to work with **URLs** is using the **URL class**.
```js
const myUrl = new URL("https://example.com:8080/path/page?name=John&age=30");

console.log(myUrl.hostname); // "example.com"
console.log(myUrl.port); // "8080"
console.log(myUrl.pathname); // "/path/page"
console.log(myUrl.searchParams.get("name")); // "John"
```
> `searchParams.get()` simplifies retrieving query parameters.

### 3. `url.format()`
Converts an object into a properly formatted URL.
```js
const urlObject = {
    protocol: "https",
    hostname: "example.com",
    pathname: "/profile",
    query: { user: "Alice" },
};

console.log(url.format(urlObject)); // "https://example.com/profile?user=Alice"
```

### 3. `url.resolve()`
Use `url.resolve()` to **join relative paths** into absolute URLs.
```js
console.log(url.resolve("https://example.com/about", "contact")); 
// "https://example.com/contact"
```
> Helps in navigation when hadling relative paths.
