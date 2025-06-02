const path = require('path');

console.log(path.join('/users', 'john', 'documents')); // /users/john/documents
console.log(path.extname('file.txt')); // .txt
console.log(path.basename('/users/john/file.txt')); // file.txt
console.log(path.dirname('/users/john/file.txt')); // /users/john
