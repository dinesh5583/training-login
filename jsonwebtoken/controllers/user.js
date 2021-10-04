const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/generateToken');

exports.createUser = async (req, res) => {
  try {
    const { user_name, user_email, user_password } = req.body;
    const userExist = await pool.query(
      `select * from users where user_email=$1`,
      [user_email]
    );

    if (userExist.rows.length !== 0) {
      return res.status(401).send({ message: 'user already exist' });
    }

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(user_password, salt);

    const user = await pool.query(
      `insert into users(user_name,user_email,
        user_password) values($1,$2,$3) returning *`,
      [user_name, user_email, bcryptPassword]
    );

    const token = jwtGenerator(user.rows[0].user_id);
    res.status(200).json({ token: token, name: user.rows[0].user_name });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await pool.query(
      `select * from users where user_email=$1`,
      [email]
    );

    if (userExist.rows.length === 0) {
      return res
        .status(401)
        .json({ message: 'Passowrd or email is incorrect' });
    }

    const validPassowrd = await bcrypt.compare(
      password,
      userExist.rows[0].user_password
    );
    if (!validPassowrd) {
      return res
        .status(401)
        .json({ message: 'Passowrd or email is incorrect' });
    }
    const token = jwtGenerator(userExist.rows[0].user_id);
    res.status(200).json({ token: token, name: userExist.rows[0].user_name });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
};
exports.getAllUser = async (req, res) => {
  try {
    const user = await pool.query(`select * from users`);
    res.json(user.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query(`select * from users where user_id=$1`, [id]);
    res.json(user.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('server error');
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query(`select * from users where user_id=$1`, [id]);
    if (!user) {
      return res.status(401).send('user does not exist');
    }
    const deleteUser = await pool.query(`delete from users where user_id=$1`, [
      id,
    ]);
    res.status(200).json('user deleted');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
};

exports.updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_name, user_email, user_password } = req.body;
    const user = await pool.query(`select * from users where user_id=$1`, [id]);
    if (!user) {
      return res.status(401).send('user does not exist');
    }
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(user_password, salt);
    const updateUser = await pool.query(
      `update users set user_name=$1,user_email=$2,user_password=$3 where 
            user_id=$4 returning *`,
      [user_name, user_email, bcryptPassword, id]
    );
    res.status(200).send(updateUser.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
};
