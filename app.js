var express=require("express");
var app=express();
var bodyparser=require("body-parser");
var mongoose =require("mongoose");
var Campground =require("./models/campground");
var seedDb=require("./seed");
var Comment=require("./models/comment");

seedDb();

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyparser.urlencoded({extended:true}));

app.set("view engine","ejs");

app.get("/campground",function(req,res){
Campground.find({},function(err,allcampgrounds){
if(err)
{ 
    console.log(err);
}
else{
    res.render("campground",{campground:allcampgrounds});
}
});
});


app.post("/campground",function(req,res)
{
var name =req.body.name;
var image=req.body.img;
var desc=req.body.description;
var newcampground={name:name,image:image,description:desc};
Campground.create(newcampground,function(err,newlyadded){
if(err)
{console.log(err);
}else{
    res.redirect("/campground");
}
});
});

app.get("/campground/new",function(req,res){

    res.render("new");
});


app.get("/campground/:id",function(req,res){
Campground.findById(req.params.id).populate("comments").exec(function(err,foundcampground){
if(err)
{console.log(err);
}
else{
    res.render("show",{campground:foundcampground});
    console.log(foundcampground);
}
});
});

app.get("/campground/:id/comments/newcomment",function(req,res){
Campground.findById(req.params.id,function(err,campground){
if(err)
{console.log(err);
}else{
    res.render("newcomment",{campground:campground});
}
});

});

app.post("/campground/:id/comments",function(req,res){
Campground.findById(req.params.id,function(err,campground){
    if(err)
    {console.log(err);
    }
    else{
   Comment.create(req.body.comment,function(err,comment)
    {
     if(err)
     {console.log(err);
    }else{
        campground.comments.push(comment);
        campground.save();
        res.redirect("/campground/"+req.params.id);
    }

    });
    }
});

});


app.get("*",function(req,res){
    res.send("sorry wrong page people");
});

app.listen(8080,function(req,res)
{
console.log("server has started");
});
