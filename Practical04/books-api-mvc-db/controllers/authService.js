const bcrypt = require("bcryptjs");
const User = require("../models/userModel"); // Adjust path as needed

async function register(userData) {
    const { username, email, password } = userData;

    try {
        // Validate required fields
        if (!username || !email || !password) {
            throw new Error("Username, email and password are required.");
        }

        // Check if username already exists
        const existingUsername = await User.getUserByUsername(username);
        if (existingUsername) {
            throw new Error("Username already exists.");
        }

        // Optional: Check if email already exists
        const existingEmail = await User.getUserByEmail(email);
        if (existingEmail) {
            throw new Error("Email already exists.");
        }

        // Hash password
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // Create user object
        const newUser = {
            username,
            email,
            passwordHash
        };

        // Save user to database
        const createdUser = await User.createUser(newUser);

        return {
            success: true,
            message: "User registered successfully.",
            userId: createdUser.id
        };

    } catch (error) {
        throw error;
    }
}

module.exports = {
    register
};