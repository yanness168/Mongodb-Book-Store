const express = require('express');
const bookRouter = express.Router();
const Book = require('../models/book_scheme');

bookRouter.get("/add", function (req, res) {
    res.render("add_book",{
        "genres": ["fantasy","adventure","sci-fi",
                    "horror","Self-help","Mystery",
                    "Detective","Biography"],
        title: "Add Book",
    });
})

bookRouter.post("/add", function (req, res) {
    //Create a new book object
    let book = new Book();

    //Save book propertities according to the response of the form submitted
    book.title = req.body.title;
    book.author = req.body.author;
    book.pages = req.body.pages;
    book.genres = req.body.genres;
    book.rating = req.body.rating;

    //Save the new book to the database
    book.save(function (err){
        if(err){
            console.log(err)
            return;
        }else{
            //Route to the home page
            res.redirect("/")
        }
    })
})

module.exports = bookRouter