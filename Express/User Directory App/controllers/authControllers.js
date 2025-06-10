import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';
//import { signToken } from "../middleware/tokenMiddleware.js";
import { signToken } from '../utils/jwtUtilities.js';
import dotenv from 'dotenv';

dotenv.config();

export function loginForm(req, res) {
  let message = req.query.message;
  res.render('loginForm', { message });
}

export function signUpForm(req, res) {
  res.render('signUpForm');
}

const filePath = path.join(process.cwd(), 'data/auth_users.json');

export async function authenticateUser(req, res) {
  const { username, password } = req.body;

  const data = fs.readFileSync(filePath, 'utf8');
  const users = data ? JSON.parse(data) : [];

  const user = users.find((u) => u.username === username);

  if (users.length == 0 || !user) {
    return res.redirect(
      '/?message=User does not exist. You may REGISTER user.'
    );
    // return res.send("User does not exist. You may REGISTER user.");
  }

  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    return res.redirect('/auth/login?message=Password is incorrect');
  }

  const token = signToken(username);
  res.cookie('token', token, {
    httpOnly: true,
  });
  // //if the token is sent as json, it can be set manually by client in req.headers.authorization
  // const token = jwt.sign({username: username}, secret, {expiresIn: "1m"});
  // console.log(token)

  // //if token is sent as cookie, it will only be available in cookie
  // res.cookie("token", token);
  // // {
  // //     httpOnly: true,
  // //     secure: false,
  // //     sameSite: "strict",
  // //     maxAge: 3600000
  // // }

  res.render('home');
}

export async function addUser(req, res) {
  const { username, password } = req.body;

  const data = fs.readFileSync(filePath, 'utf8');
  const users = data ? JSON.parse(data) : [];

  if (users.length !== 0 && users.find((u) => u.username === username)) {
    return res.send('User Already Exists');
  }
  //add to .env
  const saltRounds = parseInt(process.env.SALT_ROUNDS);
  const hash = await bcrypt.hash(password, saltRounds);
  console.log(hash);

  const newUser = {
    username, //instead of username: username
    password: hash,
  };

  users.push(newUser);

  fs.writeFile(filePath, JSON.stringify(users), (err) => {
    if (err) {
      res.send('Error Registering User');
    } else {
      console.log('User Registered successfully!');
      const token = signToken(username);

      //sending token as cookie
      res.cookie('token', token, {
        httpOnly: true,
      });
      res.render('home');
      // res.render("loginForm");
      //res.redirect("/?message=Login with username and password.")
    }
  });
}
