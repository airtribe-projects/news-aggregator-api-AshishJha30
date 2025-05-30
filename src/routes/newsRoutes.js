const express = require('express');
const router = express.Router();
const { getNews } = require('../controllers/newsController');
const authenticateToken = require('../middlewares/auth');


router.get("/", authenticateToken, getNews);

module.exports = router;