function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidPassword(password) {
  return typeof password === "string" && password.length >= 6;
}
function isValidPreferences(preferences) {
  if (typeof preferences !== "object" || preferences === null) return false;
  if (preferences.categories && !Array.isArray(preferences.categories)) return false;
  if (preferences.language && typeof preferences.language !== "string") return false;
  return true;
}

function validateRegister(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ text: "Missing required fields" });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ text: "Invalid email format" });
  }
  if (!isValidPassword(password)) {
    return res.status(400).json({ text: "Password must be at least 6 characters" });
  }
  next();
}

function validatePreferences(req, res, next) {
    const { preferences } = req.body;
  if (!isValidPreferences(preferences)) {
    return res.status(400).json({ text: "Invalid preferences format" });
  }
  next();
}

module.exports = {
  validateRegister,
  validatePreferences,
};