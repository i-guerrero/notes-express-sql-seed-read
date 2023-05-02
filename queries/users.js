const db = require("../db/dbConfig.js");

const getAllUsers = async () => {
  try {
    const allUsers = await db.any("SELECT * FROM users");

    return allUsers;
  } catch (err) {
    return err;
  }
};

const getUser = async (id) => {
  try {
    const oneUser = await db.any("SELECT * FROM users WHERE id=$1", id);
    return oneUser;
  } catch (err) {
    return err;
  }
};

const newUser = async (user) => {
  try {
    const newUser = await db.one(
      "INSERT INTO users (username, verified, admin) VALUES($1, $2, $3) RETURNING *",
      [user.username, user.verified, user.admin]
    );
    return newUser;
  } catch (err) {
    return err;
  }
};

const deleteUser = async (id) => {
  try {
    const deletedUser = await db.one(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      id
    );
    return deletedUser;
  } catch (err) {
    return err;
  }
};

const updateUser = async (user, id) => {
  try {
    const updatedUser = await db.one(
      "UPDATE users SET username=$1, verified=$2, admin=$3 where id=$4 RETURNING *",
      [user.username, user.verified, user.admin, id]
    );
    return updatedUser;
  } catch (err) {
    return err;
  }
};
module.exports = {
  getAllUsers,
  getUser,
  newUser,
  deleteUser,
  updateUser,
};
