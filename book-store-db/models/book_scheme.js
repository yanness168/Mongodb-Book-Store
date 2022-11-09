// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    required: [true,"Need a title!"]
  },
  author:{
    type: String,
    required: [true,"Need a author!"]
  },
  pages:{
    type: Number,
    min: 0,
    required: [true,"Need a page number!"]
  },
  genres:{
    type: [String],
    required: [true, "Need a genre!"]
  },
  rating:{
    type: Number,
    required: [true,"Need a rating!"]
  }
},{
    versionKey: false // You should be aware of the outcome after set to false
});

/* const userSchema = mongoose.Schema({
    email: String
  });
// Create a virtual property `domain` that's computed from `email`.

userSchema.virtual('domain').get(function() {
        return this.email.slice(this.email.indexOf('@') + 1);
    });
const User = mongoose.model('User', userSchema);
let doc = await User.create({ email: 'test@gmail.com' });
doc.domain; //return 'gmail.com' */
  
// Compile model from schema, use the singular name of your collection "Books"
const Book = module.exports = mongoose.model("Book", bookSchema);