const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/users.json");

exports.listAllUsers = (req, res) => {
  fs.readFileSync(filePath, "utf8", (err, data) => {
    if(err){
      return res.status(500).json({ error: 'Failed to read user data' });
    }
    const usersData = JSON.parse(data);
    res.json(usersData);
  });
};
