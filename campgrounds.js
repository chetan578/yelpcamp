//ROUTES
var express = require("express");
var Campground = require("../models/campground");
var router = express.Router();
var passport=require("passport");

router.get("/campground", function (req, res) {
    console.log(req.user);
    Campground.find({}, function (err, allcampgrounds) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("campground", { campground: allcampgrounds });
        }
    });
});


router.post("/campground", function (req, res) {
    var name = req.body.name;
    var image = req.body.img;
    var desc = req.body.description;
    var newcampground = { name: name, image: image, description: desc };
    Campground.create(newcampground, function (err, newlyadded) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campground");
        }
    });
});

router.get("/campground/new", function (req, res) {

    res.render("new");
});


router.get("/campground/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundcampground) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("show", { campground: foundcampground});
            console.log(foundcampground);
        }
    });
});


module.exports = router;