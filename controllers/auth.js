import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/User.js';
import bcrypt from 'bcryptjs'
dotenv.config()

export const generateToken = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ 'credentials.email': email, role: 'Admin' })
        if(!user) res.status(404).json({ message: 'Unauthorized' });

        const isMatched = await bcrypt.compare(password, user.credentials.password)
        if(!isMatched) res.status(400).json({ message: 'Password Incorrect' });

        // If authentication is successful, generate and send the token
        const token = jwt.sign(
            { id: user.id }, // Payload (user info)
            process.env.JWT_SECRET, // Secret key
            { expiresIn: '1h' } // Expiration time (optional)
        );
        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: error })
    }
};



