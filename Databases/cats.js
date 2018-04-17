var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/cat_app");


var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperment: String
});


var Cat = mongoose.model("Cat", catSchema);

Cat.create({
    name: "Snow White",
    age: 15,
    temperment: "Bland"
}, (err, cat)=> {
    if (err) {
        conosle.log(err);
    } else {
        console.log(cat);
    }
})

// var george = new Cat({name: "Mrs. Norris", age: 72, temperment: "Evil"});

// george.save((err, cat)=>{
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("saved");
//         console.log(cat);
//     }
// });

Cat.find({}, (err,cats) => {

    if (err) {
        console.log('ohno');
    } else {
        console.log(cats);
    }
});