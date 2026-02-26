require("dotenv").config()
const app= require("./src/app");
const connectDb = require("./src/config/db");

connectDb();
 
// app.listen("https://innerly-app-backend-anas-26.vercel.app/","0.0.0.0", ()=>{
// console.log("Server is running on port 3000");   
// }); 


 
module.exports = app; 
