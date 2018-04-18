

var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require ("mongoose");
var app = express();


mongoose.connect("mongodb://localhost/yelp_camp");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));


//Schema

var campgroundSchema = new mongoose.Schema( {
    name: String,
    image: String,
    description: String
});

var campground = mongoose.model("Campground", campgroundSchema);
// campground.create({
//     name: "Granite Hill",
//     image: "https://farm6.staticflickr.com/5319/7407436246_0ac54dd559.jpg",
//     description: "Some place by a pond or a lake or something. I dont know, look at the picture d"
// })
app.get("/", (req,res) => {
    res.render("landing");
})

app.get("/campgrounds", (req,res) => {

  let camps = campground.find({}, (err,allCampgrounds)=> {
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
   campground.create(newCampground, (err, campground)=>{
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
    campground.findById(req.params.id, (err, foundCampground)=>{
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