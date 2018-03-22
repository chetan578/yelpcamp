var mongoose =require ("mongoose");

var campgroundSchema =new mongoose.Schema({
name:"string",
image:"string",
description:"string",
comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }]
});

module.exports=mongoose.model("Campground",campgroundSchema);
