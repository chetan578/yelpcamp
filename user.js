var mongoose =require("mongoose");

var passportlocalmongoose =require("passport-local-mongoose");

var UserSchema= new mongoose.Schema({
username :"string",
password:"string"
});

UserSchema.plugin(passportlocalmongoose);

module.exports=mongoose.model("User",UserSchema);
