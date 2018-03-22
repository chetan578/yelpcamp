var mongoose = require("mongoose");
var Campground =require("./models/campground");
var Comment=require("./models/comment");


var data =[
    {name :"husky" ,
     image :"http://dogzone.tcwebsites.netdna-cdn.com/wp-content/uploads/2015/10/husky-dog-names.jpg",
     description:"he is really cute "  },
    {
        name: "husky",
        image: "http://dogzone.tcwebsites.netdna-cdn.com/wp-content/uploads/2015/10/husky-dog-names.jpg",
        description: "he is really cute "
    },
    {
        name: "husky",
        image: "http://dogzone.tcwebsites.netdna-cdn.com/wp-content/uploads/2015/10/husky-dog-names.jpg",
        description: "he is really cute"
    }
];


function seedDb()
{
Campground.remove({},function(err)
{
   if(err)
   {
       console.log(err);
   }else{
          console.log("deleted all campgrounds");
          //ADD A CAMPGROUND 
       data.forEach(function (seed) {
           Campground.create(seed, function (err, campground) {
               if (err) {
                   console.log(err);
               }
               else {
                   console.log("added a campground");
                   //ADD A COMMENT
                   Comment.create(
                       {text:"great dog",
                author:"homer"},function(err,com)
               { 
                if(err)
                {console.log(err);
                }
                else{
                    campground.comments.push(com);
                    campground.save();
                }
           
            });
               }
           });
       });
   }
});

}
module.exports = seedDb;
