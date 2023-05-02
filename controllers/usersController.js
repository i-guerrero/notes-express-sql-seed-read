const express = require("express");

const { getBookmark } = require("../queries/bookmarks.js");
const users = express.Router({ mergeParams: true });
const {
  getAllUsers,
  getUser,
  newUser,
  deleteUser,
  updateUser,
} = require("../queries/users");

users.get("/", async (req, res) => {
  try {
    const allUsers = await getAllUsers();

    res.json(allUsers);
  } catch (err) {
    res.json(err);
  }
});

// SHOW
users.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await getUser(id);
  if (user.length > 0) {
    res.json(user[0]);
  } else {
    res.status(404).json({ error: "not found" });
  }
});

// UPDATE
users.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedUser = await updateUser(req.body, id);
  res.status(200).json(updatedUser);
});

users.post("/", async (req, res) => {
  const user = await newUser(req.body);
  res.json(user);
});

// DELETE
users.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedUser = await deleteUser(id);
  res.status(200).json(deletedUser);
});

// TEST JSON NEW
// {
// "reviewer":"Lou",
// "title": "Fryin Better",
// "content": "With the great tips and tricks I found here",
// "bookmark_id": "2",
// "rating": "4"
// }
module.exports = users;
