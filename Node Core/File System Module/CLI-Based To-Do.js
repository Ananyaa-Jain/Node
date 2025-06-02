//CLI-Based To-Do

const fs = require("fs")
const filePath = "./todo.json"

//get command and arguments from cli using process and argv in node
//node /todo/todo.js add "buy milk"
// 0         1        2       3
//process.argv[index] - returns an array
let command = process.argv[2]
let task = process.argv[3]
// console.log(typeof command, typeof task)
// console.log(command, task)

let loadTasks = () =>{
    try {
        let dataBuffer = fs.readFileSync(filePath) //read file returns a data buffer
        // Buffer in Node.js is a low-level representation of binary data (like raw bytes).
        // console.log(typeof dataBuffer);  // object
        // console.log(dataBuffer);     // <Buffer ...>

        let dataString = dataBuffer.toString() //convert buffer to string
        // This converts the raw bytes into a readable string.
        // console.log(typeof dataString); // string
        // console.log(dataString); // '[ "Buy milk", "Clean room" ]'

        let tasks = JSON.parse(dataString);
        // Now you're turning the JSON string into a JavaScript array or object.
        // After this, you can use it in your code like a normal array/object.
        return tasks  //tasks is an array 

    } catch (error) {
        return[]
    }

}
//JSON.parse() => Converts a JSON string back into a "JavaScript object".
// const jsonString = '{"name":"Alice","age":25}';
// const user = JSON.parse(jsonString);
// console.log(user.name); // Alice

let saveTasks = (tasks) => {
    let dataString = JSON.stringify(tasks);  // This converts the JavaScript array or object into a JSON string.
    fs.writeFileSync(filePath, dataString);  // This writes the JSON string to the file.   
}
//JSON.stringfy()  => Converts a JavaScript object or array to a "JSON string".
// const data = { message: 'Hello' };
// res.end(JSON.stringify(data)); // Send JSON string to client

let addTask = (task_input) =>{
    //to add new task, firstly read file to get previous tasks or load prev tasks
    let tasks = loadTasks()

    //check if task already exist
    if((tasks.some((task) => task.name === task_input))){
        console.log("Task already exist")
    }
    else{
        tasks.push({name: task_input, id: Date.now()});
        //save the tasks array after the update
        saveTasks(tasks)
        console.log("Task Added")
    }
}

let listTasks = () => {
    let tasks = loadTasks();
    if(tasks.length < 1){
        console.log("No tasks to show");
    }
    else{
        console.log("Your Tasks are :-");
        tasks.forEach((task, index) => {
            console.log(`${index+1} - ${task.name}`);
            //console.log(`${index+1} - ${task.task} + ${task.id}`);
        });
    }
}

let deleteTask = (task_input) => {
    //console.log(typeof task_input)
    let tasks = loadTasks()

    //check if task exist or not
    if( !(tasks.some((task) => task.name === task_input))){    //tasks.some((task) => task.name === task_input)  return a BOOLEAN value
        console.log("Task not found")
    }
    else{
        let updatedTasks = tasks.filter((task) => task.name !== task_input); // remove matching task  //tasks.filter returns an array
        saveTasks(updatedTasks); // save updated list
        console.log("Task deleted")
    }

}

//tasks
if(command==="add"){
    addTask(task)
}
else if(command === "list"){
    listTasks()
}
else if(command === "delete"){
    deleteTask(task)
}
else{
    console.log("Invalid command")
}

