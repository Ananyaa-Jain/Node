import express from 'express';
import {
  listAllUsers,
  aboutUser,
  deleteUser,
  addUser,
  newUser,
  editDetail,
  editForm,
} from '../controllers/userControllers.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

// const express = require("express");
// const userController = require("../controllers/userControllers");

const router = express.Router();

// list all users
router.get('/', listAllUsers);

// get a particular user
router.get('/about/:id', aboutUser);

// delete a particular user
router.get('/delete/:id', authenticateToken, deleteUser);

// add new user
router.get('/add-user', authenticateToken, addUser);
router.post('/users/new-user', authenticateToken, newUser);

//edit details of a user
router.get('/edit/:id', authenticateToken, editForm);
router.patch('/edit-user-detail', authenticateToken, editDetail);

//export the router
export default router;
