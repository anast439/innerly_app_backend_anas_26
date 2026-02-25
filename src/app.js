const express = require("express");
const cors = require("cors");

const cookieParser= require("cookie-parser");
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());



const authRouter = require("./routes/auth.routes");
const moodRouter = require("./routes/mood.routes");
app.use("/api/auth",authRouter);
app.use("/api/mood",moodRouter);


 
module.exports =app 