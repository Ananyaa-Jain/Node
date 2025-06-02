//to create custom server, use http module of node.js
//and define a port you want to listen on
const http = require("http");
const port = 3000

//create a server
// http.createServer(callback)
// const server = http.createServer((request, response) => {
//     //res.writeHead(statusCode, status message, headers)
//     //res.writeHead(200, {"Content-Type": "text/plain"});
//     //response.writeHead(200, "i am header")
//     response.writeHead(200, "Custom Message", {"Content-Type": "text/plain"});  // returns a response object

//     //it represents final additional chunk of data to be written immediately before closing the stream.
//     //res.end() [it takes a string or buffer or nothing at all]
//     //response.end("hello i am ending") 

//     //log after the response ends
//     response.on("finish", () => {
//         console.log(request.url)
//         console.log("response ended");
//     });

//     response.on("close", ()=>{
//         console.log("connection closed");
//     })
//     response.end("Hello, this is the end!");

// });

//create a server
const server = http.createServer((req, res)=>{
    //console.log(req)
    // console.log(req.method)
    // console.log("----------------------------------------------------------------------------------------")
    // console.log(req.url)
    // console.log("----------------------------------------------------------------------------------------")
    // console.log(req.headers)
    console.log("----------------------------------------------------------------------------------")
    if(req.url==='/'){
        res.writeHead(200, {"Content-Type": "text/plain"});
        console.log(req.url)
        res.end("Welcome to home page");
        //console.log(res)
    }
    else{
        res.writeHead(404, "file not found", {"content-type":"plain/text"})
        console.log(req.url)
        res.end("error");
    }
})

//listen on server
//server.listen(port, callback)
server.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})
