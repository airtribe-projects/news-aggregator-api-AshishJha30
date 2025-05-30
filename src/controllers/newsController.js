
const axios = require("axios");
const usersModel = require("../models/usersModel");

async function getNews(req, res) {
  try {
    const dbUser = await usersModel.findOne({ email: req.user.email });
    if (!dbUser) return res.status(200).json({ text: "User not found" });

    const preferences = dbUser.preferences || {};
    const categories = preferences.categories ? preferences[0] : "general";
    const language = preferences.language || "en";

    const NEWS_API_KEY = process.env.NEWS_API_KEY;
    const url = `https://newsapi.org/v2/top-headlines?category=${categories}&language=${language}&apiKey=${NEWS_API_KEY}`;
    const response = await axios.get(url);

    res.status(200).json({ news: response.data.articles });
  } catch (err) {
    console.log("Error fetching news", err);
    res.status(500).json({ text: "Error fetching news" });
  }
}

module.exports = {
  getNews,
};