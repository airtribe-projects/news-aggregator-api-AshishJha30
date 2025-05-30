const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token missing' });

    // it'll verify the token and decode the user information if face any problem it'll return an error
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ text: 'Invalid token' });
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;

