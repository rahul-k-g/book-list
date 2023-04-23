const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const Booklist = require("./models/booklist");
const app = express();
app.use(cors());
async function run() {

    await mongoose.connect('mongodb+srv://kgrahul96:orCLMl01w9Efb7SH@cluster0.zakw7eh.mongodb.net/test?retryWrites=true&w=majority')

} run();

app.post('/register', async (req, res) => {
    let user = await User.findOne({ username: req.body.username });
    if (user) {
        res.status(500).json("Username already exist");
    } else {
        try{
        const newPassowrd = await bcrypt.hash(req.body.password, 10)
        user = await User.create({
            username: req.body.username,
            password: newPassowrd

        })
        res.status(201).json("User created successfully");
    } catch(e) {
        res.status(500).json("User not created")
    }


    }
})
app.post('/login', async (req, res) => {

    user = await User.findOne({ username: req.body.username });
    isPasswordValid = bcrypt.compare(req.bosy.password, user.password);
    if (isPasswordValid) {
        const token = jwt.sign({
            username: req.body.email,
            password: newPassowrd
        }, 'secret123'
        )
        res.status(200).json({
            'token': token,
            status: 'user logged in successfully'

        })
        window.localStorage.setItem('uid', user._id)
        window.localStorage.setItem('token', token);
    }



})
app.post('/book', async (res, req) => {
    const uid = window.localStorage.getItem('uid', user._id)
    try {
        const Booklist = await Booklist.create({
            title: req.body.title,
            isbn: req.body.isbn,
            author: req.body.author,
            description: req.body.description,
            published_date: req.body.published_date,
            publisher: req.body.publisher,
            added_by: uid,

        })
        res.status(201).json("Book added successfully")
    } catch (error) {
        res.status(500).json({ "Error": error })
    }

})

app.get('/books', async (res, req) => {
    const uid = window.localStorage.getItem('uid', user._id)
    try {
        const Booklist = await Booklist.findMany({
            added_by: uid
        })
        res.status(201).json("Book added successfully")
    } catch (error) {
        res.status(500).json({ "Error": error })
    }

})

app.get('/book/:id', async (res, req) => {

    try {
        const Booklist = await Booklist.findMany({
            _id: req.params.id
        })

        res.status(201).json("Book added successfully")

    } catch (error) {

        res.status(500).json({ "Error": error })

    }

})

app.patch('/book/:id', async (res, req) => {

    try {
        const Booklist = await Booklist.findByIdAndUpdate({
            _id: req.params.id,title: req.body.title,
            isbn: req.body.isbn,
            author: req.body.author,
            description: req.body.description,
            published_date: req.body.published_date,
            publisher: req.body.publisher,
            added_by: window.localStorage.getItem('uid')
            
        },)

        res.status(201).json("Book updated successfully")

    } catch (error) {

        res.status(500).json({ "Error": error })

    }
    app.delete('/book/:id', async (res, req) => {

        try {
            const Booklist = await Booklist.delete({
                _id: req.params.id
            })
    
            res.status(201).json("Book deleted successfully")
    
        } catch (error) {
    
            res.status(500).json({ "Error": error })
    
        }
    
    })
    

})


app.listen(3000, () => "server listening to port 3000")

