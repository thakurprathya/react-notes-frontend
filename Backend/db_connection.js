//in this file we have set connection from database
const mongoose= require("mongoose");
//providing database name reactNotesApp if not provide will add data in test database
const mongoURI= "mongodb://localhost:27017/reactNotesApp";

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log(`Connected with Mongo Successfuly`);
    })
}

module.exports= connectToMongo; //exporting our function