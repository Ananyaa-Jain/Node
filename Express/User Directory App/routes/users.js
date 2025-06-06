const express = require("express");
const userController = require("../controllers/userControllers");

const router = express.Router();

// list all users
router.get("/", userController.listAllUsers);

// get a particular user
router.get("/about/:id", userController.aboutUser);

// delete a particular user
router.get("/delete/:id", userController.deleteUser);

// add new user
router.get("/add-user", userController.addUser)
router.post("/users/new-user", userController.newUser);

//edit details of a user
router.get("/edit/:id", userController.editForm);
router.patch("/edit-user-detail", userController.editDetail);

//export the router
module.exports = router;
