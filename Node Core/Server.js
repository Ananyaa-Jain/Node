// Without Express (Pure Node.js)

// http -> Create Server
const http = require("http");
// path -> Safely resolve file paths (cross-platform)
const path = require("path")
// fs -> Read Files(HTML, CSS, JS)
const fs = require("fs")

const mimeTypes = {
    '.html': 'text/html',
    '.css':  'text/css',
    '.js':   'text/javascript',
    '.png':  'image/png',
    '.jpg':  'image/jpeg',
    '.ico':  'image/x-icon'
};

const port = 3030
let body = ""

//path of the public folder/directory
// __dirname → returns the full absolute path to the current file (i.e., server.js). This ensures paths are correct regardless of where your script is run from
// path.join() → It safely joins paths with correct slashes for Windows (\) and Linux/Mac (/)
const publicDir = path.join(__dirname, "public")
console.log("PUBLIC FOLDER PATH")
console.log(publicDir)  // /Users/.../project/public


const server = http.createServer((req, res) => {
    //to get the path of the files requested by the client(like the files inside the public folder)
    let filePath = path.join(publicDir, req.url === '/' ? "index.html" : req.url)
    console.log("REQUESTED FOLDER PATH")
    console.log(filePath)
    //get the extension name of the file (like ".css", ".html")
    // helps to determine what Content-Type header to send 
    let ext = path.extname(filePath)
    console.log("EXTENSION")
    if(!ext){
        filePath += ".html"
        ext = ".html"
    }
    console.log(ext)
    console.log("NEW FOLDER PATH")
    console.log(filePath)
    //get the content type of the extension (like "text/css", "text/html")
    const contentType = mimeTypes[ext] || 'application/octet-stream';
  //MIME Types → Tells the browser how to render the file (as HTML, CSS, JS, etc.)
  // application/octet-stream = default (downloadable binary)
    console.log("CONTENT TYPE")
    console.log(contentType)

// Check If File Exists and Serve It
    fs.readFile(filePath, (err, content) => {
        if(err){
            res.writeHead(404, {"Content-Type":"text/plain"})
            res.end("404 Not Found BROOOOOO!!")
        }
        else{
            res.writeHead(200, {"Content-Type":contentType})
            res.end(content)
        }
    })
})

server.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})
