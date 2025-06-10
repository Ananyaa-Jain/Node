import fs from 'fs';
import path from 'path';
import url from 'url';

// const { log } = require("console");
// const fs = require("fs");
// const path = require("path");

//__dirname
// import.meta.url refers to the current module's URL, which must be converted using fileURLToPath().
const filename = url.fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const filePath = path.join(dirname, '../data/users.json');

export function listAllUsers(req, res) {
  // console.log("sdfnsld");
  // console.log(filePath);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read user data' });
    }
    // console.log("after err");
    //console.log(typeof data)
    const usersData = data ? JSON.parse(data) : [];
    //console.log(typeof usersData)
    const users = usersData.filter((user) => user.isDeleted == false);
    res.render('users', { users });
  });
}

export function aboutUser(req, res) {
  const id = req.params.id;
  console.log('inside about');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read user data' });
    }
    const usersData = JSON.parse(data);
    const u = usersData.find((user) => user.id === parseInt(id));
    // console.log(typeof u)
    // console.log(u)
    res.render('info', { u });
  });
}

export function deleteUser(req, res) {
  const id = req.params.id;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read user data' });
    }
    const usersData = JSON.parse(data);
    //const newUsers = usersData.filter((user) => user.id !== parseInt(id))

    const user = usersData.find((u) => u.id === parseInt(id));
    user.isDeleted = true;

    const newUsers = usersData;

    fs.writeFile(filePath, JSON.stringify(newUsers), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to delete user data' });
      }
      //res.send("user deleted")
      const users = usersData.filter((user) => user.isDeleted == false);
      res.render('users', { users });
    });
  });
}

export function newUser(req, res) {
  const id = Date.now();
  let isDeleted = false;
  const { name, email } = req.body;
  let newUser = { id, name, email, isDeleted };

  // let prevUsers = [];

  let data = fs.readFileSync(filePath, 'utf8');
  let prevUsers = data ? JSON.parse(data) : [];
  //push new data in array
  prevUsers.push(newUser);

  //write array back in file
  fs.writeFile(filePath, JSON.stringify(prevUsers), (err) => {
    if (err) {
      console.error('Error writing file:', err);
    } else {
      console.log('User added successfully!');
    }
  });
  res.render('home');
}

//render for to add new user
export function addUser(req, res) {
  res.render('addUser');
}

//from to edit user
export function editForm(req, res) {
  const id = req.params.id;
  // console.log("Editing user with ID:", id);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      // console.error("File read error:", err);
      return res.status(500).json({ error: 'Failed to read user data' });
    }

    const users = JSON.parse(data || '[]');
    const u = users.find((user) => user.id === parseInt(id));
    if (u) {
      // console.log("User found:", u);
      res.render('editUserForm', { u });
    } else {
      // console.log("User not found");
      res.status(404).send('User not found');
    }
  });
}

export function editDetail(req, res) {
  const { id, email } = req.body;

  let data = fs.readFileSync(filePath, 'utf8');
  let prevUsers = [];
  prevUsers = JSON.parse(data);

  let u = prevUsers.find((u) => u.id === parseInt(id));
  u.email = email;
  // console.log(prevUsers)

  //write array back in file
  fs.writeFile(filePath, JSON.stringify(prevUsers), (err) => {
    if (err) {
      console.error('Error writing file:', err);
    } else {
      console.log('User Edited successfully!');
    }
  });
  res.render('info', { u });
}
