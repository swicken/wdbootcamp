

var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require ("mongoose");
var app = express();

var Campground = require("./models/campground");


mongoose.connect("mongodb://localhost/yelp_camp");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", (req,res) => {
    res.render("landing");
})

app.get("/campgrounds", (req,res) => {

  let camps = Campground.find({}, (err,allCampgrounds)=> {
      if (err) {
          console.log(err);
      } else {
        res.render("index", { campgrounds: allCampgrounds});
      }
  });  
  
});



app.post("/campgrounds", (req,res) => {
   let name = req.body.name;
   let image = req.body.image;
   let desc = req.body.description;
   let newCampground = {name:name, image:image, description: desc};
   Campground.create(newCampground, (err, campground)=>{
       if(err) {
           console.log(err);
       } else {
           console.log("Created: ");
           console.log(campground);
           res.redirect("/campgrounds");
       }
   });
   
});

app.get("/campgrounds/new", (req,res)=> {
   res.render("new"); 
});

app.get("/campgrounds/:id", function (req,res){
    Campground.findById(req.params.id, (err, foundCampground)=>{
        if (err) {
            console.log(err);
        } else {
            res.render("show", {campground : foundCampground});
        }
    })
});

app.listen(3000, function() {
    console.log("YelpCamp server is listening on port " + 3000);
})