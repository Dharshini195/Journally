//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash")

const homeStartingContent = "Welcome to Journally, your digital sanctuary for self-discovery and personal growth. In a fast-paced world filled with distractions, it's essential to carve out moments of reflection and introspection. With Journally, embark on a transformative journey of self-expression and mindfulness. Our intuitive platform offers a space to capture your thoughts, dreams, and aspirations, allowing you to cultivate a deeper understanding of yourself and the world around you. From daily prompts that ignite inspiration to mood tracking features that promote emotional well-being, Journally is more than just a journaling app – it's a companion on your path to fulfillment. Join our community of like-minded individuals and unlock the power of reflection. Start your journey with Journally today by clicking on the new entry and discover the profound impact of writing your story.";
const aboutContent = "Welcome to Journally, your digital haven for self-expression and personal growth. At Journally, we believe in the power of storytelling as a tool for understanding ourselves and the world around us. Our mission is to provide a seamless platform where you can capture your thoughts, memories, and experiences with ease."
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
let posts = []



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){
  res.render("home", {homeStartingContent : homeStartingContent, posts : posts})
  
})

app.get("/about", function(req,res){
  res.render("about", {aboutContent:aboutContent})
})

app.get("/contact", function(req,res){
  res.render("contact", {contactContent, contactContent})
})

app.get("/compose", function(req,res){
  res.render("compose")

})

app.post("/compose", function(req,res){
  const post = {
    title : req.body.postTitle,
    content : req.body.postBody,
  }
  if(post.title === "" || post.content === ""){
    res.redirect("/")
  }
  else{
    posts.push(post)
  }
  res.redirect("/")
})

app.get("/posts/:postName", function(req,res){
  const requestedTitle =_.lowerCase(req.params.postName) 
  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title) 

    if(storedTitle === requestedTitle){
      res.render("post",{postContent: post.content,postTitle: post.title})
    }
  })
})















app.listen(3000, function() {
  console.log("Server started on port 3000");
});
