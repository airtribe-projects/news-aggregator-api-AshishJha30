const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String, 
    email: {
        type: String,
        min: [6, 'Email must be at least 6 characters'],
        max: [50, 'Email must be at most 50 characters'],
        required: [true, 'Email is required'],
        unique: true,
    },
    password: String,
    role: String,
    preferences: [
        {
            type: String,
            enum: ['sports', 'politics', 'technology', 'entertainment', 'health', 'business'],
            default: 'general',
        }
    ],
    language: [
        {
            type: String,
            enum: ['en', 'es', 'fr', 'de', 'zh'],
            default: 'en',
        }
    ],
});



const User = mongoose.model('User', userSchema);

module.exports = User;