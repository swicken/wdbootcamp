var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    ejs = require("ejs"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer");

var app = express();



mongoose.connect("mongodb://localhost/blog");

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer())

//Schemas

var blogSchema = new mongoose.Schema({
    title: String,
    body: String,
    image: String,
    created:  {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);


//RESTFUL ROUTES

app.get("/", (req,res)=> {
    res.redirect("/blogs");
});

app.get("/blogs", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if(err){
            console.log(err);
        } else {
            res.render("index", {blogs: blogs}); 
        }
    })
});

app.post("/blogs", (req,res)=> {

    req.body.blog.body = req.sanitize(req.body.blog.body);
 
    Blog.create(req.body.blog, (err, newBlog)=> {
        if (err){
            res.render("new");    
        } else {
            console.log("Created: ");
            console.log(newBlog);
            res.redirect("/blogs");
        }
    });
});

app.get("/blogs/new", (req,res)=> {
    res.render("new")
});

app.get("/blogs/:id", (req,res)=>{
    Blog.findById(req.params.id, (err, foundBlog)=> {
        if(err) {
            res.redirect("/");
        } else {
            res.render("show", {blog: foundBlog});
        }
    });
});

app.get("/blogs/:id/edit", (req, res)=> {
    Blog.findById(req.params.id, (err, foundBlog)=> {
        if (err){
            res.redirect("/");
        } else {
            res.render("edit", {blog: foundBlog});
        }
    })
    
});

app.put("/blogs/:id", (req,res)=> {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog)=> {
        if (err) {
            res.redirect("/");
        } else {
            console.log("Successfully updated blog: ");
            console.log(updatedBlog);
            res.redirect("/blogs/" + req.params.id);
        }
        
    })
});

app.delete("/blogs/:id", (req,res)=> {
    Blog.findByIdAndRemove(req.params.id, (err, response)=> {
        if (err) {
            res.redirect("/");
        } else {
            console.log(response);
            res.redirect("/");
        }
    });
});

app.listen(3000, function() {
    console.log("Server is listening on port 3000");
});

// Blog.create({
//     title: "Test Blog",
//     image: "https://images.unsplash.com/photo-1426287658398-5a912ce1ed0a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d2ca73a2ef25eff85533a5efb4860f36&auto=format&fit=crop&w=1352&q=80",
//     body: "This is a blog post"

// }, (err, blog)=> {
//     if (err){
//         console.log(err);
//     } else {
//         console.log("Created: ");
//         console.log(blog);
//     }
// })
