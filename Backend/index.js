//sugeshjr10_db_user -user
//aMwlGdYjBLhM0pIu -pass

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const helmet = require('helmet')
const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')
const { idsMiddleware, honeypotTrap } = require('./src/middleware/idsMiddleware')
const rateLimit = require('express-rate-limit')
require('dotenv').config()

// IPS Feature: Global DDoS protection (150 logs per minute)
const globalLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, 
    max: 150, 
    message: { message: "Global rate limit exceeded. Please slow down." },
    standardHeaders: true,
    legacyHeaders: false,
})

// ✅ middleware FIRST
app.use(express.json())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))
app.use(helmet()) // Sets HTTP headers for security
app.use(globalLimiter) // Applies DDoS protection across the entire app
app.use(idsMiddleware) // Custom scanner and centralized logging

// HONEYPOT TRAP ROUTE (Invisible to users, instantly bans bots)
app.all('/api/auth/v1/debug', honeypotTrap)

// ✅ routes SECOND
const bookRoutes = require('./src/books/book.route')
const orderRoutes = require("./src/orders/order.route")
const adminRoutes = require("./src/users/user.route")

app.use('/api/books', bookRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/auth/admin', adminRoutes)

// ✅ test route
app.get('/', (req, res) => {
  res.send('welcome to myserver')
})

// ✅ connect DB LAST
mongoose.connect(process.env.DB_URL)
  .then(() => console.log('mongodb connected'))
  .catch(err => console.log(err))

// ✅ start server
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
