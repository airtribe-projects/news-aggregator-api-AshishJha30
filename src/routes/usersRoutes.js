const express = require("express");
const router = express.Router();
const {
  validateRegister,
  validatePreferences,
} = require("../middlewares/validateUser");

const authenticateToken = require("../middlewares/auth");
const {
  register,
  login,
  getPreferences,
  updatePreferences,
} = require("../controllers/usersController");

router.use(express.json());

// Registration
router.post("/signup", validateRegister, register);

// Login
router.post("/login", login);

// Preferences
router.get("/preferences", authenticateToken, getPreferences);
router.put(
  "/preferences",
  authenticateToken,
  validatePreferences,
  updatePreferences
);


module.exports = router;
