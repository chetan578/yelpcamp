var express=require("express");
var app=express();
var bodyparser=require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));

app.set("view engine","ejs");

var campground = [{
        name: "delhi",
        image: "https://www.gstatic.com/webp/gallery3/1.png"
    },
    {
        name: "mumbai",
        image: "http://www.gstatic.com/webp/gallery/1.jpg"
    },
    {
        name: "banglore",
        image: "http://www.gstatic.com/webp/gallery/2.jpg"
    },
    {
        name: "delhi",
        image: "https://www.gstatic.com/webp/gallery3/1.png"
    },
     {
        name: "mumbai",
        image: "http://www.gstatic.com/webp/gallery/1.jpg"
    },
     {
        name: "banglore",
        image: "http://www.gstatic.com/webp/gallery/2.jpg"
    },
    {
        name: "delhi",
        image: "https://www.gstatic.com/webp/gallery3/1.png"
    }, 
    {
        name: "mumbai",
        image: "http://www.gstatic.com/webp/gallery/1.jpg"
    },
     {
        name: "banglore",
        image: "http://www.gstatic.com/webp/gallery/2.jpg"
    }
];
app.get("/",function(req,res)
{
res.send("whatsup bitches !!");
});

app.get("/campground",function(req,res)
{
res.render("campground",{campground:campground});
});

app.post("/campground",function(req,res){
var name =req.body.name;
var image=req.body.img;
var newcampground ={name :name ,image:image};
campground.push(newcampground);
res.redirect("/campground");
});


app.get("/campground/new",function(req,res){
{
    res.render("new");
}
});

app.get("*",function(req,res){

res.send("sorry wrong page people");
});

app.listen(8080,function(req,res)
{
console.log("server has started !");
});