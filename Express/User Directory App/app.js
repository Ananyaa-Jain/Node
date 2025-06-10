import express from 'express';
import userRoutes from './routes/users.js';
// import signUpRoutes from "./routes/signUp.js";
// import loginRoutes from "./routes/login.js";
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import methodOverride from 'method-override';

// const express = require("express");
// const userRoutes = require("./routes/users");
// const methodOverride = require("method-override");
dotenv.config();

//export value of port from ".env" file
const port = process.env.PORT || 3000;

// create an instance of express
const app = express();

// mount middleware for form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// enable reading cookies
app.use(cookieParser());

//use method override on post methods
app.use(methodOverride('_method'));

//set ejs as view engine template
// app.set(settingName, value)
app.set('view engine', 'ejs');

//mount middleware for "/users" routes
app.use('/users', userRoutes);

// //mount middleware for "/sign-up" routes
// app.use("/auth/sign-up", signUpRoutes);

// //mount middleware for "/login" routes
// app.use("/auth/login", loginRoutes);
app.use('/auth', authRoutes);

app.get('/home', (req, res) => {
  //console.log(req.body);
  res.render('home');
});

app.post('/logout', (req, res) => {
  //if blacklisting token
  // if(token){
  //   blacklist.add(token);
  // }

  //when using httpOnly cookies
  res.clearCookie('token'); // remove the JWT cookie
  res.redirect('/?message=Logged out successfully');
});

app.get('/', (req, res) => {
  const message = req.query.message;
  res.render('userDirectoryApp', { message });
});

app.listen(3000, (req, res) => {
  console.log(`Server is running on ${port}`);
});
