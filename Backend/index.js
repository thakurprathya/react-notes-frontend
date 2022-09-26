const connectToMongo = require("./db_connection");
connectToMongo(); //connection will take some time so will asynchronously go to next command till complete

//express basic code, below code can be found on http://localhost:${port}
const express= require("express");
var cors= require("cors");
const app= express();
const port= 4000;

app.use(cors()); //using cors for preventing cors errors
app.use(express.json())  //middle name added for using request.body (used in ./routes/author), now we can send data in json

//Available routes
app.use("/auth", require("./routes/auth"));  //setting route with endpoint /auth visible at http://localhost:${port}/auth
app.use("/notes", require("./routes/notes")); //setting route with endpoint /notes

app.listen(port, ()=>{
    console.log(`app backend listening at http://localhost:${port}`);
})