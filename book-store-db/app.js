var createError = require('http-errors');
var express = require('express');
var path = require('path');
const PORT = 8000;
const book_router = require('./routes/book_route');

var app = express();

//Make connection to mongodb
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/Bookstore");
var db = mongoose.connection;
db
  .once("open", function(){
    console.log("Connected to MongoDB");
  })
  .on('error', function(err){
    console.log(err);
  })

//Import Book mongoose schema (model):
var Book = require('./models/book_scheme');

// Pug view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//app.use(........)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//All book information
app.get('/', function(req,res){
  Book.find({},function(err,books){
    if(err){
      console.log("error!")
    }else{
      res.render("index",{
        title: "Books",
        books: books
      })
    }
  })
});

//Use "book_router"
app.use("/books",book_router);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, () => console.log(`IT'S WORKING on http://localhost:${PORT}`));
module.exports = app;
