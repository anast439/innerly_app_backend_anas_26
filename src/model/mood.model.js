const mongoose = require("mongoose");


const moodSchema = mongoose.Schema({

userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:true
},


moodLevel:{
type:Number,
required:[true,"Mood Level is Required"],
min:1,
max:5,
},

stressLevel:{ 
    type:Number,
    min:1,
    max:10, 
},
note:{
type:String,
},

date:{
    type:Date,
    default:Date.now,
}


},{timestamps: true});


module.exports = mongoose.model("Mood",moodSchema); 