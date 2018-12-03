var express = require("express");
var router = express.Router();
let blogArray = []; //Declare the array to hold as the DB
let id = 1; //Initialize the id

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("Blog Api");
});

router.post("/create", function(req, res, next) {
  let body = req.body; //Initailize body to req.body
  body.id = id;
  id += 1;
  blogArray.push(body);
  console.log(blogArray);
  res.send("Post created");
});

router.get("/read/:id", function(req, res, next) {
  let blogId = req.params.id;
  let output = blogArray.find(item => item.id == blogId);
  res.send(output);
});

router.put("/update/:id", function(req, res, next) {
  let blogId = req.params.id;
  blogArray[blogId - 1] = req.body;
  // let input = blogArray.find(item => item.id == blogId);
  console.log(`Updated  post ${blogId}`);
  res.send(req.body);
});

router.delete("/delete", function(req, res, next) {
  res.send("You are deleting");
});

router.get("/all", function(req, res, next) {
  res.send(blogArray);
});

module.exports = router;
