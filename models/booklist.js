const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,

    },
    isbn:{
        type:String,
        required:true,


    },
   author :{
        type:String,
        required:true,


    },
    description:{
        type:String,
        required:true,


    },
    
    published_date:{
        type:Date,
        required:true,


    },
    publisher:{
        type:String,
        required:true,
       


    },
    added_by:{
        type:String,
        required:true,
     


    }
})

const Booklist = mongoose.Model(UserSchema,'booklist');
module.exports = Booklist;