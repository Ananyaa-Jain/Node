const express = require("express");
const userRoutes = require("./routes/users");
const methodOverride = require("method-override");

//export value of port from ".env" file
const port = process.env.PORT || 3000;

// create an instance of express
const app = express();

// mount middleware for form data
app.use(express.urlencoded({ extended: true }))

//use method override on post methods
app.use(methodOverride("_method"));

//set ejs as view engine template
// app.set(settingName, value)
app.set("view engine", "ejs");

//mount middleware for "/users" route
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.render("home")
});

app.listen(3000, (req, res) => {
  console.log(`Server is running on ${port}`);
})
