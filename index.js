const express = require('express');
const {Usermodel , Todomodel} = require("./db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "asdasd123@123";
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://Ramesh:u0akvQfq1cyeqpMW@cluster0.rphfeul.mongodb.net/todo-appu-22222");
app.post("/signUp" , async function(req, res){

    const email = req.body.email;
    const password = req.body.password;
    const name  = req.body.name;

    await Usermodel.create(({
            email : email , 
            password : password ,
            name : name 
        }));
     res.json({
            message : "You are Signed Up "
        })
});

app.post("/signIn" , async function(req,res){

        const email = req.body.email;
        const password = req.body.password;

        const user = await Usermodel.findOne({
            email : email , 
            password : password
        })

        if(user){
            const token =  jwt.sign({
                id : user._id
            });
            res.json({
                    token : token 
            });
        } else {
            res.status(403).json({
                message : "Incorrect Credentials"
            })
        }

});

app.post("/todo" , function(req,res){

});

app.get("/todos" , function(req,res){

});



app.listen(3000);