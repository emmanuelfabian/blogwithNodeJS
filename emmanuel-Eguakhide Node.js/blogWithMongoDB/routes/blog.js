var express = require("express");
var router = express.Router();

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const url = "mongodb://localhost:27017";
let ObjectId = require("mongodb").ObjectID;

// Database Name
const dbName = "blogDBName";
let db;

// Use connect method to connect to the server
MongoClient.connect(
  url,
  function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    db = client.db(dbName);

    // insertDocuments(db, function() {
    //findDocuments(db, function() {
    //client.close();
    //});
  }
);
//});

// //Insert Document
// const insertDocuments = function(db, callback) {
//   // Get the documents collection
//   const collection = db.collection("blogDB");
//   // Insert some documents
//   collection.insertOne({ a: 2 }, function(err, result) {
//     assert.equal(err, null);
//     assert.equal(1, result.result.n);
//     assert.equal(1, result.ops.length);
//     console.log("Inserted 1 document into the collection");
//     callback(result);
//   });
// };

//Find All Documents
// const findDocuments = function(db, callback) {
//   // Get the documents collection
//   const collection = db.collection("article");
//   // Find some documents
//   collection.find({}).toArray(function(err, docs) {
//     console.log(`Found the following records in ${collection}`);
//     console.log(docs);
//     callback(docs);
//   });
// };

// //Find Documents with a Query Filter
// const findDocuments = function(db, callback) {
//   // Get the documents collection
//   const collection = db.collection("blogDB");
//   // Find some documents
//   collection.find({ a: 1 }).toArray(function(err, docs) {
//     assert.equal(err, null);
//     console.log("Found the following records");
//     console.log(docs);
//     callback(docs);
//   });
// };
// /* GET users listing. */
// router.get("/", function(req, res, next) {
//   res.send("respond with a resource");
// });

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("Welcome to the blog");
});

router.get("/all", function (req, res, next) {
  let blogID = req.params.id;
  db.collection("article")
    .find({})
    .toArray(function (err, result) {
      console.log(err, result);
      res.send(result);
    });
});

router.post("/create", function (req, res, next) {
  let body = req.body;
  db.collection("article").insertOne(body, function (err, result) {
    console.log(err, result);
    res.send(result);
  });
});

router.get("/read:id", function (req, res, next) {
  let blogID = req.params.id;
  blogID = new ObjectId(blogID);
  db.collection("article")
    .find({ _id: blogID })
    .toArray(function (err, result) {
      console.log(err, result);
      res.send(result);
    });
});

router.put("/update:id", function (req, res, next) {
  let body = req.body;
  let blogID = req.params.id;
  blogID = new ObjectId(blogID);
  db.collection("article").update({ _id: blogID }, { $set: body }, function (
    err,
    result
  ) {
    console.log(err, result);
    res.send(result);
  });
});

router.delete("/delete:id", function (req, res, next) {
  let blogID = req.params.id;
  blogID = new ObjectId(blogID);
  db.collection("article").deleteOne({ _id: blogID }, function (err, result) {
    console.log(err, result);
    res.send(result);
  });
});
module.exports = router;
