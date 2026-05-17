const fs = require('fs/promises');
const path = require('path');

// Shared log path used by all IPS modules
const LOG_PATH = path.join(__dirname, '../../security-alerts.log');

// Regex tracking Command Injection / Path Traversal / XSS / NoSQL Injection
const cmdInjectionPattern = /(\b(rm|cat|ls|pwd|whoami|curl|wget|bash|sh|nc)\b\s+)|([;&|`]|(?:\$\())|(\.\.\/)|(<script>)|(\$[a-z]+)/i;

// IPS Feature: In-Memory Blacklist for Honeypot
const blacklist = new Set();

const logSecurityAlert = async (req, payload, alertType = "IDS ALERT") => {
    const timestamp = new Date().toISOString();
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const logEntry = `[${timestamp}] ! ${alertType} ! Source IP: ${ip} | Method: ${req.method} | URL: ${req.originalUrl} | Detected Payload: ${JSON.stringify(payload)}\n`;
    
    try {
        await fs.appendFile(LOG_PATH, logEntry);
        console.log(`\x1b[31m[${alertType} WARNING]\x1b[0m Attack logged from ${ip}`);
    } catch (err) {
        console.error("Failed to write to security-alerts.log", err);
    }
};

// Shared IPS block logger — used by route-level rate limiters across the app
const logIpsBlock = async (req, reason = "Rate limit exceeded") => {
    const timestamp = new Date().toISOString();
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const logEntry = `[${timestamp}] ! IPS BLOCK ! ${reason} | Source IP: ${ip} | Method: ${req.method} | URL: ${req.originalUrl}\n`;
    try {
        await fs.appendFile(LOG_PATH, logEntry);
        console.log(`\x1b[31m[IPS BLOCK]\x1b[0m ${reason} from ${ip}`);
    } catch (err) {
        console.error("Failed to write IPS block to security-alerts.log", err);
    }
};

const idsMiddleware = async (req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    // Evaluate against exact Honeypot Blacklist before processing
    if (blacklist.has(ip)) {
        return res.status(403).json({ status: "error", message: "IP has been permanently blacklisted." });
    }

    const checkTarget = (target) => {
        if (!target) return false;
        // Stringify the target specifically to scan entire nested JSONs
        const payloadString = typeof target === 'string' ? target : JSON.stringify(target);
        return cmdInjectionPattern.test(payloadString);
    };

    // Hunt for matching signatures in the body, query, and params
    if (checkTarget(req.body) || checkTarget(req.query) || checkTarget(req.params)) {
        await logSecurityAlert(req, { body: req.body, query: req.query, params: req.params });
        // Instead of continuing routing, return a generic blank standard
        return res.status(200).json({ status: "success", message: "Request received" });
    }

    next();
};

const honeypotTrap = async (req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    blacklist.add(ip); // Instant Permanent Ban
    await logSecurityAlert(req, { honeypot_trigger: 'Scraper attempted hidden route' }, "HONEYPOT BAN");
    return res.status(403).json({ status: "error", message: "Forbidden Access" });
};

module.exports = { idsMiddleware, honeypotTrap, logIpsBlock };
