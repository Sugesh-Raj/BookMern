const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcryptjs');
const { logIpsBlock } = require('../middleware/idsMiddleware');

// IPS Security: Rate limit admin authentication to prevent brute force attacks
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login attempts per windowMs
    message: { message: "Too many login attempts from this IP, please try again after 15 minutes" },
    standardHeaders: true,
    legacyHeaders: false,
    handler: async (req, res, next, options) => {
        await logIpsBlock(req, "Admin brute-force login lockout");
        res.status(options.statusCode).json(options.message);
    }
});

router.post("/", loginLimiter, async (req, res) => {
    try {
        const {username, password} = req.body;
        if(username === process.env.ADMIN_EMAIL) {
            const isPasswordValid = await bcrypt.compare(password, process.env.ADMIN_PASSWORD);
            if (isPasswordValid) {
                const token = jwt.sign(
                    {username, role: 'admin'}, 
                    process.env.JWT_SECRET, 
                    {expiresIn: '1d'}
                );
                return res.status(200).json({
                    message: "Authentication successful",
                    token: token,
                    user: { username, role: 'admin' }
                });
            }
        }
        return res.status(401).send({message: "Invalid credentials"});
    } catch(error) {
        console.error("Failed to login", error);
        res.status(500).send({message: "Failed to login"});
    }
});

module.exports = router;
