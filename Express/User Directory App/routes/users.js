const express = require("express");
const userController = require("../controllers/userControllers.js");

const router = express.Router();

// list all users
router.get("/", userController.listAllUsers);

// get a particular user
// router.get("/:id", userController.aboutUser);

//export the router
module.exports = router;
