import express from 'express';
// import { loginForm, authenticateUser } from "../controllers/loginControllers.js";
// import { signUpForm, addUser } from "../controllers/signUpControllers.js";
import {
  loginForm,
  authenticateUser,
  signUpForm,
  addUser,
} from '../controllers/authControllers.js';

const router = express.Router();

// /auth/login
router.get('/login', loginForm);

// /auth/authenticate-user
router.post('/authenticate-user', authenticateUser);

// /auth/sign-up
router.get('/sign-up', signUpForm);

router.post('/add-user', addUser);

export default router;
