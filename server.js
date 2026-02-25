require("dotenv").config()
const app= require("./src/app");
const connectDb = require("./src/config/db");

connectDb();
 
app.listen(3000,"0.0.0.0", ()=>{
console.log("Server is running on port 3000");   
});


 