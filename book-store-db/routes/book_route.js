const express = require('express');
const bookRouter = express.Router();
var {check, validationResult} = require('express-validator');

const Book = require('../models/book_scheme');
const genres = ["fantasy","adventure","sci-fi","horror","Self-help","Mystery","Detective","Biography"];

bookRouter.route('/add')
    .get(function (req, res) {
        res.render("add_book",{
            genres: genres,
            title: "Add Book",
        });
    })
    .post(async function (req, res) {
        await check('title','Need a Title!').notEmpty().run(req);
        await check('author','Need an Autor!').notEmpty().run(req);
        await check('pages','Need a Page Number!').notEmpty().run(req);
        await check('genres','Need a Genre!').notEmpty().run(req);
        await check('rating','Need a Rating!').notEmpty().run(req);

        const errors = validationResult(req);
        
        if(errors.isEmpty()){
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
        }else{
            res.render('add_book',{
                errors: errors.array(),
                genres: genres,
                title: "Add Book",
            })
        }
    })

bookRouter.route('/single/edit/:id')
    .get(function(req,res){
        Book.findById(req.params.id, function(err,book){
            res.render('edit_book', {book,
                genres: genres,
                        title: "Edit "+ book.title,
                    })
        })
    })
    .post(function(req,res){
         //Create an empty object to hold the updates fields
         let updates = {};
    
         //Save book propertities according to the response of the form submitted
         updates.author = req.body.author;
         updates.pages = req.body.pages;
         updates.genres = req.body.genres;
         updates.rating = req.body.rating;
        
         let filter = {_id:req.params.id}

         Book.updateOne(filter, updates, function(err,updatesDoc){
            if(err){
                console.log("Error in updating book");
            }else{
                console.log(updatesDoc)
                res.redirect('/')
            }
         })
    })

bookRouter.route('/single/:id')
    .get(function(req,res){
        Book.findById(req.params.id, function (err,book){
            res.render('requiredBook',{book, title: book.title})
        })
    })
    .delete(function(req,res){
        let deleteFilter = {_id:req.params.id}

        Book.deleteOne(deleteFilter, function(error){
            if(error){
                console.log("Delete book failed")
            }else{
                res.send("Success!");
            }
        })
    })
    
module.exports = bookRouter