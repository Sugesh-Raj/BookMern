const express = require('express')
const Book = require('./book.model');
const { postABook, getAllBooks, getSingleBook, updateBook, deleteBook } = require('./book.controller');

const router = express.Router();



//frontend => backend server => controller => book schema => database => send to server => back to frontend

//post a book
//post = when submit something frontend to db
//get = when get something back from db
//put/patch = when edit or update something
//delete = delete something 



// books addition new
router.post("/create-book",postABook)


// get all books from db
router.get("/",getAllBooks)


router.get("/:id",getSingleBook)


router.put("/edit/:id",updateBook)


router.delete("/:id",deleteBook)


module.exports = router;
