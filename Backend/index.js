//sugeshjr10_db_user -user
//aMwlGdYjBLhM0pIu -pass


const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

// ✅ middleware FIRST
app.use(express.json())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))

// ✅ routes SECOND
const bookRoutes = require('./src/books/book.route')
const orderRoutes = require("./src/orders/order.route")



app.use('/api/books', bookRoutes)
app.use('/api/orders', orderRoutes)

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
