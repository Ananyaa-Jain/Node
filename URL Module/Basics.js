const http = require('http');
const { URL } = require('url');

const server = http.createServer((req, res) => {
  // SYNTAX:- new URL(req.url, base)
  // req.url: /about?name=John
  // Base: http://localhost:3000
  
  // new URL('/about?name=John', 'http://localhost:3000')
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  
  console.log(parsedUrl.pathname);         // e.g., /about
  console.log(parsedUrl.searchParams);     // URLSearchParams object

  const name = parsedUrl.searchParams.get('name');
  // searchParams.get('key')
  res.end(`Hello ${name || 'World'}`);
});

server.listen(3000, () => console.log('Server running'));
