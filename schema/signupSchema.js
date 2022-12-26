const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const signupSchema = new mongoose.Schema({
    firstname:String,
    lastname:String,
    username:String,
    email:String,
    password:String,
    phone:Number
});
signupSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 12);
    }
    next();
  });
module.exports = mongoose.model("signups", signupSchema);