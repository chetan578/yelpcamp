var express = require("express");
var User = require("../models/user");
var passport=require("passport");
LocalStrategy = require('passport-local').Strategy;
var router = express.Router();

//login routes 
router.get("/register", function (req, res) {

    res.render("register");
});
router.post("/register", function (req, res) {
    User.register(new User({ username: req.body.username }), req.body.password, function (err, user) {

        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/campground");
        });


    });

});
//show login form 
router.get("/login", function (req, res) {

    res.render("login");
});
//login logic
router.post("/login", passport.authenticate("local", {

    successRedirect: "/campground",
    failureRedirect: "/login",
    
}), function (req, res) {

});

//logout route
router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/campground");

});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
    next();
    }
    else{
        res.redirect("/login");
    }
    
}

module.exports = router;