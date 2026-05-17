const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const { createAOrder, getOrderByEmail, getAllOrders, updateOrderStatus } = require("./order.controller");
const verifyAdminToken = require('../middleware/verifyAdminToken');
const { logIpsBlock } = require('../middleware/idsMiddleware');

// IPS: Prevent fake/spam order submission — max 5 orders per IP per 10 minutes
const orderSubmitLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 5,                    // 5 orders max per IP per window
    standardHeaders: true,
    legacyHeaders: false,
    handler: async (req, res, next, options) => {
        await logIpsBlock(req, "Customer order-spam lockout (5 orders/10min exceeded)");
        res.status(429).json({ message: "Too many orders submitted from your IP. Please wait 10 minutes." });
    }
});

// IPS: Prevent email enumeration scraping — max 20 lookups per IP per 10 minutes
const emailLookupLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 20,                   // 20 lookups max per IP per window
    standardHeaders: true,
    legacyHeaders: false,
    handler: async (req, res, next, options) => {
        await logIpsBlock(req, "Customer email-enumeration lockout (20 lookups/10min exceeded)");
        res.status(429).json({ message: "Too many requests. Please slow down." });
    }
});

router.get("/test", (req, res) => {
  res.json({ message: "Orders API working ✅" });
});

// Customer routes — rate-limited for IP protection
router.post("/", orderSubmitLimiter, createAOrder);
router.get("/email/:email", emailLookupLimiter, getOrderByEmail);

// Admin routes — protected by JWT
router.get("/", verifyAdminToken, getAllOrders);
router.patch("/:id", verifyAdminToken, updateOrderStatus);

module.exports = router;
