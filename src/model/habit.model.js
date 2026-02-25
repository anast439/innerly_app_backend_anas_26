const mongoose =require("mongoose");


const habitSchema=new mongoose.Schema({

userId:{
type:mongoose.Schema.Types.ObjectId,
ref:"users",
required:true
},

title:{
    type:String,
    required:[true,"Title is Required"],
},
targetDays:{
    type:Number,
    default:7,
},
completedDates:[
    {
        type:Date,
    }
],

streakCount:{
    type: Number,
    default: 0,
},

lastCompletedDate:{
    type:Date,

},
isActive:{
    type:Boolean,
    default:true,
}



},  { timestamps: true });
 
const habitModel=mongoose.model("Habit",habitSchema);

module.exports = habitModel;