var mongoose =require("mongoose");

var commentSchema =mongoose.Schema({
text:"string",
author:"string",
});

module.exports=mongoose.model("Comment",commentSchema);


