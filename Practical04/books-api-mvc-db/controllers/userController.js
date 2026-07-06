const User = require("../models/userModel");
const bcrypt = require("bcrypt");

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



//Register user
async function registerUser(req, res) {
  try {
    const { username, role, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.createUser({ username, role, password: hashedPassword });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ error: "Error registering user" });
  }
}

async function loginUser(req, res) {
  try{
    const { username, password } = req.body;
    const user = await User.getUserByUsername(username);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log("User retrieved in controller:", user); // Debug log to check retrieved user
    const passwordMatch = await bcrypt.compare(password, user.passwordhash);


    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }
    res.json({ message: "Login successful" });
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ error: "Error logging in" });
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
  registerUser,
  createUser,
  updateUser,
  deleteUser,
  searchUsers,
  getUsersWithBooks,
  loginUser, // Export loginUser function
};