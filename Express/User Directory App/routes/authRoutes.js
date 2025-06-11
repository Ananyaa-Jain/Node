import express from 'express';
import {
  loginForm,
  authenticateUser,
  signUpForm,
  addUser,
} from '../controllers/authControllers.js';
import { validateMiddleware } from '../middleware/validateMiddleware.js';
import { signupSchema, loginSchema } from '../schema/validator.js';
// import { asyncHandler } from '../middleware/asyncHandler.js';

const router = express.Router();

// /auth/login
router.get('/login', loginForm);

// /auth/authenticate-user
// router.post('/authenticate-user', validateLogin, (req, res) => {
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     return res.render('loginForm', { message: errors.array()[0].msg });
//   }

//   authenticateUser(req, res);
// });
router.post(
  '/authenticate-user',
  loginSchema,
  validateMiddleware('loginForm'),
  //asyncHandler(authenticateUser)
  authenticateUser
);

// /auth/sign-up
router.get('/sign-up', signUpForm);

// POST: /auth/add-user (signup)
router.post(
  '/add-user',
  signupSchema,
  validateMiddleware('signUpForm'),
  // asyncHandler(addUser)
  addUser
);
// router.post('/add-user', validateSignup, (req, res) => {
//   const errors = validationResult(req);
//   // console.log(errors);
//   if (!errors.isEmpty()) {
//     return res.render('signUpForm', { message: errors.array()[0].msg });
//   }

//   addUser(req, res);
// });

export default router;
