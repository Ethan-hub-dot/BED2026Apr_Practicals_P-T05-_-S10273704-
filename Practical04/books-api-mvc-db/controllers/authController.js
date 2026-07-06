const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerUser(req, res) {
  const { username, role, password } = req.body;

  try {
    // Validate user data
    const { username, role, password } = userData;

    try {
        // Validate required fields
        if (!username || !role || !password) {
            throw new Error("Username, role and password are required.");
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
            role,
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
        console.log("Error during user registration:", error.message);
        return {
            success: false,
            message: error.message
        };
    }


    // Check for existing username
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user in database
    const newUser = await userModel.createUser({ username, role, passwordHash: hashedPassword });

    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function login(req, res) {
  const { username, password } = req.body;

  try {
    // Validate user credentials
    const user = await getUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare password with hash
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const payload = {
      id: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, "your_secret_key", { expiresIn: "3600s" }); // Expires in 1 hour

    return res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

{}