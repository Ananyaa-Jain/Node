import { User } from '../models/user.js';

export async function listAllUsers(req, res) {
  try {
    // const result = await pool.query(
    //   'SELECT * FROM users WHERE is_deleted = FALSE'
    // );
    // const users = result.rows;
    // // console.log(users);
    const users = await User.findAll({ where: { is_deleted: false } });
    res.render('users', { users });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
}

export async function aboutUser(req, res) {
  const id = req.params.id;

  try {
    const u = await User.findByPk(id);
    // const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    // // console.log(result);
    // const u = result.rows[0];
    if (!u) return res.status(404).send('User not found');
    res.render('info', { u });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
}

export async function deleteUser(req, res) {
  const id = req.params.id;

  try {
    await User.update({ is_deleted: true }, { where: { id } });
    const users = await User.findAll({ where: { is_deleted: false } });
    // await pool.query('UPDATE users SET is_deleted = TRUE WHERE id = $1', [id]);
    // const result = await pool.query(
    //   'SELECT * FROM users WHERE is_deleted = FALSE'
    // );
    // // console.log(result);
    // const users = result.rows;
    res.render('users', { users });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
}

export async function newUser(req, res) {
  const { name, email } = req.body;

  try {
    // Check if user already exists
    const existing = await User.findOne({
      where: { email, is_deleted: false },
    });

    if (existing) {
      return res.redirect(
        '/home?message=Mail already exists. Please use another one.'
      );
    }

    await User.create({ name, email });
    res.redirect('/home?message=User added successfully!');
  } catch (err) {
    console.error('Error adding user:', err);
    res.status(500).json({ error: 'Failed to add user' });
  }
}

export function addUser(req, res) {
  res.render('addUser');
}

export async function editForm(req, res) {
  const id = req.params.id;

  try {
    const u = await User.findByPk(id);
    // const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    // const u = result.rows[0];
    if (u) {
      res.render('editUserForm', { u });
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to load user' });
  }
}

export async function editDetail(req, res) {
  const { id, email } = req.body;

  try {
    // [no. of rows updated, updated row] -> ARRAY DESTRUCTURING
    const [_, [u]] = await User.update(
      { email, updated_at: new Date() }, // FIELDS TO UPDATE:- email: email, updated_at: new Date()
      {
        where: { id }, // which rows to update
        returning: true,
      }
    );
    // u = updated user object
    res.render('info', { u });
  } catch (err) {
    res.status(500).json({ error: 'Failed to edit user' });
  }
}

/////////////////////////////////////////////////////
// import fs from 'fs';
// import path from 'path';
// import url from 'url';

// // const filename = url.fileURLToPath(import.meta.url);
// // const dirname = path.dirname(filename);

// // const filePath = path.join(dirname, '../data/users.json');

// export function listAllUsers(req, res) {
//   fs.readFile(filePath, 'utf8', (err, data) => {
//     if (err) {
//       return res.status(500).json({ error: 'Failed to read user data' });
//     }
//     const usersData = data ? JSON.parse(data) : [];
//     const users = usersData.filter((user) => user.isDeleted == false);
//     res.render('users', { users });
//   });
// }

// export function aboutUser(req, res) {
//   const id = req.params.id;
//   console.log('inside about');

//   fs.readFile(filePath, 'utf8', (err, data) => {
//     if (err) {
//       return res.status(500).json({ error: 'Failed to read user data' });
//     }
//     const usersData = JSON.parse(data);
//     const u = usersData.find((user) => user.id === parseInt(id));
//     res.render('info', { u });
//   });
// }

// export function deleteUser(req, res) {
//   const id = req.params.id;

//   fs.readFile(filePath, 'utf8', (err, data) => {
//     if (err) {
//       return res.status(500).json({ error: 'Failed to read user data' });
//     }
//     const usersData = JSON.parse(data);

//     const user = usersData.find((u) => u.id === parseInt(id));
//     user.isDeleted = true;

//     const newUsers = usersData;

//     fs.writeFile(filePath, JSON.stringify(newUsers), (err) => {
//       if (err) {
//         return res.status(500).json({ error: 'Failed to delete user data' });
//       }
//       const users = usersData.filter((user) => user.isDeleted == false);
//       res.render('users', { users });
//     });
//   });
// }

// export function newUser(req, res) {
//   const id = Date.now();
//   let isDeleted = false;
//   const { name, email } = req.body;
//   let newUser = { id, name, email, isDeleted };

//   let data = fs.readFileSync(filePath, 'utf8');
//   let prevUsers = data ? JSON.parse(data) : [];
//   prevUsers.push(newUser);

//   //write array back in file
//   fs.writeFile(filePath, JSON.stringify(prevUsers), (err) => {
//     if (err) {
//       console.error('Error writing file:', err);
//     } else {
//       console.log('User added successfully!');
//     }
//   });
//   res.render('home');
// }

// //render for to add new user
// export function addUser(req, res) {
//   res.render('addUser');
// }

// //from to edit user
// export function editForm(req, res) {
//   const id = req.params.id;

//   fs.readFile(filePath, 'utf8', (err, data) => {
//     if (err) {
//       return res.status(500).json({ error: 'Failed to read user data' });
//     }

//     const users = JSON.parse(data || '[]');
//     const u = users.find((user) => user.id === parseInt(id));
//     if (u) {
//       res.render('editUserForm', { u });
//     } else {
//       res.status(404).send('User not found');
//     }
//   });
// }

// export function editDetail(req, res) {
//   const { id, email } = req.body;

//   let data = fs.readFileSync(filePath, 'utf8');
//   let prevUsers = [];
//   prevUsers = JSON.parse(data);

//   let u = prevUsers.find((u) => u.id === parseInt(id));
//   u.email = email;

//   //write array back in file
//   fs.writeFile(filePath, JSON.stringify(prevUsers), (err) => {
//     if (err) {
//       console.error('Error writing file:', err);
//     } else {
//       console.log('User Edited successfully!');
//     }
//   });
//   res.render('info', { u });
// }
