var express = require("express");
var bodyParser = require("body-parser");

var app = express();



app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

  var campgrounds = [{
      name: "Salmon Creek",
      image: "https://farm8.staticflickr.com/7042/7121867321_65b5f46ef1.jpg"
      
  }, {
      name: "Running River",
      image: "https://pixabay.com/get/eb32b9072ef3063ed1584d05fb1d4e97e07ee3d21cac104497f3c67aa6edb4b9_340.jpg"
  }, {
      name: "Granite Hill",
      image: "https://farm4.staticflickr.com/3455/3753652218_266bca0b93.jpg"
  },{
      name: "Salmon Creek",
      image: "https://farm8.staticflickr.com/7042/7121867321_65b5f46ef1.jpg"
      
  }, {
      name: "Running River",
      image: "https://pixabay.com/get/eb32b9072ef3063ed1584d05fb1d4e97e07ee3d21cac104497f3c67aa6edb4b9_340.jpg"
  }, {
      name: "Granite Hill",
      image: "https://farm4.staticflickr.com/3455/3753652218_266bca0b93.jpg"
  },{
      name: "Salmon Creek",
      image: "https://farm8.staticflickr.com/7042/7121867321_65b5f46ef1.jpg"
      
  }, {
      name: "Running River",
      image: "https://pixabay.com/get/eb32b9072ef3063ed1584d05fb1d4e97e07ee3d21cac104497f3c67aa6edb4b9_340.jpg"
  }, {
      name: "Granite Hill",
      image: "https://farm4.staticflickr.com/3455/3753652218_266bca0b93.jpg"
  }]

app.get("/", (req,res) => {
    res.render("landing");
})

app.get("/campgrounds", (req,res) => {

  
  res.render("campgrounds", { campgrounds: campgrounds});
});

app.post("/campgrounds", (req,res) => {
   let name = req.body.name;
   let image = req.body.image;
   let newCampground = {name:name, image:image};
   campgrounds.push(newCampground);
   res.redirect("/campgrounds")
});

app.get("/campgrounds/new", (req,res)=> {
   res.render("new"); 
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp server is listening on port " + process.env.PORT);
})