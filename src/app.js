const express = require("express");
const cors = require("cors");

const cookieParser= require("cookie-parser");
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());



const authRouter = require("./routes/auth.routes");
app.use("/api/auth",authRouter) 


 
module.exports =app 