const express = require('express');
const app = express();
const Path = require('path');
const usermodel = require('./models/user');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(Path.join(__dirname,'public'))); 


app.get('/', (req, res) => { 
    res.render("index");
})

app.get('/read', async (req, res) => {
    let users = await usermodel.find();
    res.render("read", {users});
})

app.get('/edit/:userid', async (req, res) => {
    let user = await usermodel.findOne({_id: req.params.userid});
    res.render("edit", {user});
})

app.post('/update/:userid', async (req, res) => {
    let {image, name, email} = req.body;
    let user = await usermodel.findOneAndUpdate({_id: req.params.userid}, {image, name,email}, {new:true});
    res.redirect("/read");
})

app.get('/delete/:id', async (req, res) => {
    let users = await usermodel.findOneAndDelete({_id: req.params.id});
    res.redirect("/read");
})

app.post('/create', async (req, res) => {
    let {name, email, image} = req.body;

    let createdUser = await usermodel.create({
        name,
        email,
        image
    });
    res.send(createdUser); 
})


app.listen(3000);