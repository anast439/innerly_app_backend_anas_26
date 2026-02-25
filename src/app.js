const express = require("express");
const cors = require("cors");

const cookieParser= require("cookie-parser");
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());



const authRouter = require("./routes/auth.routes");
const moodRouter = require("./routes/mood.routes");
const habitsRouter = require("./routes/habit.route");
const dashboardRouter = require("./routes/dashboard.routes");
const analyticsRouter = require("./routes/analytics.routes");
app.use("/api/auth",authRouter);
app.use("/api/mood",moodRouter);
app.use("/api/habit",habitsRouter); 
app.use("/api/dashboard",dashboardRouter);
app.use("/api/analytics",analyticsRouter);


 
module.exports =app 