
const mongoose = require("mongoose")
const port = 5000
const express = require("express")
const app = express()
// const uri = 'mongodb+srv://echemartins47:password1234@cluster0.jlopo.mongodb.net/pond-manager?retryWrites=true&w=majority'
// const uri = 'mongodb+srv://eche:eche123@cluster0.jlopo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
// const uri='mongodb+srv://promise:promise123@real.jme6j.mongodb.net/pond-manager?retryWrites=true&w=majority'
const uri = 'mongodb+srv://echemartins47:password1234@myapps.jlopo.mongodb.net/pondManager?retryWrites=true&w=majority&appName=myapps'
const ejs = require('ejs')
const methodOveride = require('method-override')
const pondController = require("./controllers/pondController");
const Mortality = require("./models/mortalityModel");
const mortalityController = require("./controllers/mortalityController");
app.use(express.json());
app.use(methodOveride('_method'))
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/",pondController.getAllPonds)
app.get("/createpond",(req,res)=>{
    res.render("createpond")
})
app.get('/ponds/search',pondController.searchPonds)
app.get('/ponds/:pondId', pondController.getPondDetails);
app.post("/ponds/:pondId/mortality",mortalityController.addMortality)
app.delete("/ponds/:pondId",pondController.deletePostById)
app.post("/createPond", pondController.createPond);







app.listen(port,()=>{
console.log(`app is running on port ${port}`)})

mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('MongoDB connection error:', err));
// mongoose.connect(uri)
// .then(()=> console.log('connected to database'))
// .catch((err)=>{console.log('error connecting to database', err)}) 

