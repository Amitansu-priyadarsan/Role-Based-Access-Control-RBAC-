const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Role = require("./models/roleModel");
const User = require("./models/userModel");
const { sequelize } = require("./config/db");

const app = express();
const PORT = 5001;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send("Welcome to the RBAC Authentication System");
});


app.post("/api/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
   
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const userRole = await Role.findOne({ where: { name: role } });
    if (!userRole) return res.status(400).send("Role not found");

   
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      roleId: userRole.id,
    });

    res.status(201).send({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error registering user");
  }
});


app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).send("User not found");

    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).send("Invalid credentials");

    
    const token = jwt.sign({ userId: user.id, roleId: user.roleId }, "JWT_SECRET", { expiresIn: "1h" });


    res.send({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in");
  }
});

// Protected Route (Requires Authentication)
app.get("/api/protected", async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send("Access Denied: No token provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    res.send("This is the protected route, accessible only with a valid token!");
  } catch (error) {
    res.status(401).send("Invalid token");
  }
});

// Catch-All for Undefined Routes
app.all("*", (req, res) => {
  res.status(404).send("This route does not exist. Please check your URL.");
});

// Start Server
app.listen(PORT, async () => {
  try {
    // Authenticate database connection
    await sequelize.authenticate();
    console.log(`Server running on port ${PORT}`);
    console.log("MySQL Connected...");

    // Sync DB and seed roles
    await sequelize.sync({ alter: true });

    // Seed default roles if they don't exist
    const roles = ["Admin", "User", "Moderator"];
    for (const roleName of roles) {
      const role = await Role.findOne({ where: { name: roleName } });
      if (!role) {
        await Role.create({ name: roleName });
      }
    }
    console.log("Default roles seeded");

  } catch (err) {
    console.error("Database connection error:", err);
  }
});
