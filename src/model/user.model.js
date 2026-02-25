const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const userSchema = new mongoose.Schema({

name:{
    type: String,
    required:[true,"Name is Required please enter your name"],
   },
email:{
    type: String,
    required:[true,"Email is Required please enter your email"],
    unique: true,

},

password:{
type: String,
required:[true,"Password is Required please enter your password"], 
minlength:[6,"Password should contain more than 6 character"],
},


   subscriptionType: {
      type: String,
      enum: ["free", "premium"],
      default: "free",
    },

    streakCount: {
      type: Number,
      default: 0,
    },







}, { timestamps: true });

// Password hash before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
