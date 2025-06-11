import { AuthUser } from '../models/authUser.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { signToken } from '../utils/jwtUtilities.js';

dotenv.config();

export function loginForm(req, res) {
  let message = req.query.message;
  res.render('loginForm', { message });
}

export function signUpForm(req, res) {
  let message = req.query.message;
  res.render('signUpForm', { message });
}

// LOGIN
export async function authenticateUser(req, res) {
  const { username, password } = req.body;

  try {
    // const result = await pool.query(
    //   'SELECT * FROM auth_users WHERE username = $1',
    //   [username]
    // );
    // const user = result.rows[0];
    const user = await AuthUser.findOne({ where: { username } });

    if (!user) {
      return res.redirect(
        '/?message=User does not exist. You may REGISTER user.'
      );
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.redirect('/auth/login?message=Password is incorrect');
    }

    const token = signToken(username);
    res.cookie('token', token, { httpOnly: true });
    res.render('home');
  } catch (err) {
    // console.error(err);
    res.status(500).send('Login failed.');
  }
}

// SIGNUP
export async function addUser(req, res) {
  const { username, password, email } = req.body;

  try {
    // Check for existing username
    const existingUser = await AuthUser.findOne({ where: { username } });
    if (existingUser) {
      return res.redirect(
        '/auth/sign-up?message=Username already taken. Choose Another'
      );
    }
    // const userResult = await pool.query(
    //   'SELECT * FROM auth_users WHERE username = $1',
    //   [username]
    // );
    // // console.log(userResult);
    // if (userResult.rows.length > 0) {
    //   //if (userResult.rows[0].email == email) {
    //   return res.redirect(
    //     '/auth/sign-up?message=Username already taken. Choose Another'
    //   ); //res.send('Username already taken. Choose another.');
    // }

    // Check for existing email
    const existingEmail = await AuthUser.findOne({ where: { email } });
    if (existingEmail) {
      return res.redirect(
        '/auth/login?message=Email already registered. Kindly login.'
      );
    }
    // const emailResult = await pool.query(
    //   'SELECT * FROM auth_users WHERE email = $1',
    //   [email]
    // );
    // if (emailResult.rows.length > 0) {
    //   return res.redirect(
    //     '/auth/login?message=Email already registered. Kindly login.'
    //   ); // send('Email already registered. Kindly login.');
    // }

    const saltRounds = parseInt(process.env.SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert into DB

    // await pool.query(
    //   'INSERT INTO auth_users (username, email, password, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW())',
    //   [username, email, hashedPassword]
    // );

    // Create new user
    await AuthUser.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = signToken(username);
    res.cookie('token', token, { httpOnly: true });
    res.render('home');
  } catch (err) {
    console.error(err);
    res.status(500).send('Registration failed.');
  }
}

// import fs from 'fs';
// import path from 'path';
// import bcrypt from 'bcrypt';
// //import { signToken } from "../middleware/tokenMiddleware.js";
// import { signToken } from '../utils/jwtUtilities.js';
// import dotenv from 'dotenv';

// dotenv.config();

// export function loginForm(req, res) {
//   let message = req.query.message;
//   res.render('loginForm', { message });
// }

// export function signUpForm(req, res) {
//   res.render('signUpForm');
// }

// const filePath = path.join(process.cwd(), 'data/auth_users.json');

// export async function authenticateUser(req, res) {
//   const { username, password } = req.body;

//   const data = fs.readFileSync(filePath, 'utf8');
//   const users = data ? JSON.parse(data) : [];

//   const user = users.find((u) => u.username === username);

//   if (users.length == 0 || !user) {
//     return res.redirect(
//       '/?message=User does not exist. You may REGISTER user.'
//     );
//     // return res.send("User does not exist. You may REGISTER user.");
//   }

//   const isMatched = await bcrypt.compare(password, user.password);

//   if (!isMatched) {
//     return res.redirect('/auth/login?message=Password is incorrect');
//   }

//   const token = signToken(username);
//   res.cookie('token', token, {
//     httpOnly: true,
//   });
//   // //if the token is sent as json, it can be set manually by client in req.headers.authorization
//   // const token = jwt.sign({username: username}, secret, {expiresIn: "1m"});
//   // console.log(token)

//   // //if token is sent as cookie, it will only be available in cookie
//   // res.cookie("token", token);
//   // // {
//   // //     httpOnly: true,
//   // //     secure: false,
//   // //     sameSite: "strict",
//   // //     maxAge: 3600000
//   // // }

//   res.render('home');
// }

// export async function addUser(req, res) {
//   const { username, password } = req.body;

//   const data = fs.readFileSync(filePath, 'utf8');
//   const users = data ? JSON.parse(data) : [];

//   if (users.length !== 0 && users.find((u) => u.username === username)) {
//     return res.send('User Already Exists');
//   }
//   //add to .env
//   const saltRounds = parseInt(process.env.SALT_ROUNDS);
//   const hash = await bcrypt.hash(password, saltRounds);
//   console.log(hash);

//   const newUser = {
//     username, //instead of username: username
//     password: hash,
//   };

//   users.push(newUser);

//   fs.writeFile(filePath, JSON.stringify(users), (err) => {
//     if (err) {
//       res.send('Error Registering User');
//     } else {
//       console.log('User Registered successfully!');
//       const token = signToken(username);

//       //sending token as cookie
//       res.cookie('token', token, {
//         httpOnly: true,
//       });
//       res.render('home');
//       // res.render("loginForm");
//       //res.redirect("/?message=Login with username and password.")
//     }
//   });
// }
