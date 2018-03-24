var express=require("express");
var Campground=require("../models/campground");
var Comment=require("../models/comment");
var router = express.Router();
var User = require("../models/user");

router.get("/campground/:id/comments/newcomment",function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("newcomment", { campground: campground });
        }
    });

});

router.post("/campground/:id/comments" ,function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        }
        else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    //add username and id to comment 
                    //save comment
                    console.log(req.user.username);

                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campground/" + req.params.id);
                }

            });
        }
    });

});
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
         next();
    }
    else{
        res.redirect("/login");
    }
  
}
module.exports=router;