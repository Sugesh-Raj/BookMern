const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    trending:{
        type:Boolean,
        required:true,
    },
    coverImage:{
        type:String,
        required:true,
    },
    oldPrice:Number,
    newPrice:Number,

    createdAt:{
        type:Date,
        default: Date.now,
    }

},{
    timestamps:true,
});


const Book = mongoose.model('Book',bookSchema); // 'book' is name inside bookstore in env database name is stored

module.exports = Book;