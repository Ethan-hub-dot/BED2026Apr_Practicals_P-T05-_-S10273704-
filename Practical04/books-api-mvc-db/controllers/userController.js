const User = require("../models/userModel");

// Get all users
async function getAllUsers(req, res) {
  try {
    const users = await User.getAllUsers();

    console.log("Users retrieved in controller:", users); // Debug log to check retrieved users
    res.json(users);
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ error: "Error retrieving users" });
  }
}

// Get user by ID
async function getUserById(req, res) {
  try {
    const id = parseInt(req.params.id);
    const user = await User.getUserById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ error: "Error retrieving user" });
  }
}

// Create new user
async function createUser(req, res) {
  try {
    const newUser = await User.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ error: "Error creating user" });
  }
}

async function updateUser(req, res) {
  try {
    const id = parseInt(req.params.id);
    const updatedUser = await User.updateUser(id, req.body);
    res.json(updatedUser);
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ error: "Error updating user" });
  }
}

async function deleteUser(req, res) {
  try {
    const id = parseInt(req.params.id);
    await User.deleteUser(id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ error: "Error deleting user" });
  }
}

async function searchUsers(req, res) {

  console.log("abc")
  console.log("Search request received with query:", req.query); // Debug log to check incoming query parameters
  const searchTerm = req.query.searchTerm; // Extract search term from query params

  console.log("Search term received in controller:", searchTerm); // Debug log 

  if (!searchTerm) {
    return res.status(400).json({ message: "Search term is required" });
  }

  try {
    const users = await User.searchUsers(searchTerm);
    res.json(users);
  } catch (error) {
    console.error("Controller error in searchUsers:", error);
    res.status(500).json({ message: "Error searching users" });
  }
}

async function getUsersWithBooks(req, res) {
  try {
    const users = await User.getUsersWithBooks();
    res.json(users);
  } catch (error) {
    console.error("Controller error in getUsersWithBooks:", error);
    res.status(500).json({ message: "Error fetching users with books" });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  searchUsers,
  getUsersWithBooks,
};