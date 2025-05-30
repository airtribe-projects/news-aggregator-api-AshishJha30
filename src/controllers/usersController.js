const usersModel = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const JWT_SECRET = process.env.JWT_SECRET;
const saltRounds = 10;

async function register(req, res) {
  const { email, password, name } = req.body;

  req.body.password = bcrypt.hashSync(password, saltRounds);
  try {
    const dbUser = await usersModel.create(req.body);
    res.status(200).send(dbUser);
  } catch (err) {
    console.log("Error creating user", err);
    res.status(500).send({ text: "Error creating user" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ text: "Email and password are required" });
  }
  const dbUser = await usersModel.findOne({ email: email });
  if (!dbUser) {
    return res.status(401).send({ text: "Invalid email" });
  }
  const isPasswordValid = bcrypt.compareSync(password, dbUser.password);
  if (!isPasswordValid) {
    return res.status(401).send({ text: "Invalid password" });
  }
  const resUser = {
    name: dbUser.name,
    email: dbUser.email,
    role: dbUser.role,
  };
  const token = jwt.sign(resUser, JWT_SECRET, { expiresIn: "1h" });
  return res.status(200).send({ token });
}

async function getPreferences(req, res) {
  try {
    const dbUser = await usersModel.findOne({ email: req.user.email });

    if (!dbUser) return res.status(404).json({ text: "User not found" });

    res.status(200).json({ preferences: dbUser.preferences || {} });
  } catch (err) {
    console.log("Error fetching preferences", err);
    res.status(500).json({ text: "Error fetching preferences" });
  }
}

async function updatePreferences(req, res) {
  try {
    const updated = await usersModel.findOneAndUpdate(
      { email: req.user.email },
      { preferences: req.body.preferences },
      { new: true }
    );
    if (!updated) return res.status(404).json({ text: "User not found" });
    res.status(200).json({ preferences: updated.preferences });
  } catch (err) {
    console.log("Error updating preferences", err);
    res.status(500).json({ text: "Error updating preferences" });
  }
}


module.exports = {
  register,
  login,
  getPreferences,
  updatePreferences,
};
