var express = require("express");

var router = express.Router();

// Import the model (user.js) to use its database functions.

// need to change cat.js to card.js
var userinfo = require("../models/userinfo.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  userinfo.all(function(data) {
    var hbsObject = {
      userinfo: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/", function(req, res) {
  userinfo.create([
    "user_name", "user_password"
  ], [
    req.body.user_name, req.body.user_password
  ], function() {
    res.redirect("/");
  });
});

var profile = require("../models/userinfo.js");

// Create all our routes and set up logic within those routes where required.
router.get("/profile", function(req, res) {
    profile.all(function(data) {
        var hbsObject = {
            userinfo: data
        };
        console.log(hbsObject);
        res.render("profile", hbsObject);
    });
});

router.post("/", function(req, res) {
    profile.create([
        "user_name", "user_password"
    ], [
        req.body.user_name, req.body.user_password
    ], function() {
        res.redirect("/");
    });
});


/*
//  PARTIALS
var nouns = require("../models/nouns.js");

router.get("/playarea", function(req, res) {
    nouns.all(function(data) {
        var hbsObject = {
            nouns: data
        };
        console.log(hbsObject);
        res.render("playarea", hbsObject);
    });
});

router.post("/playarea", function(req, res) {
    nouns.create([
        "noun", "description"
    ], [
        req.body.noun, req.body.description
    ], function() {
        res.redirect("/");
    });
});
*/
var adjectives = require("../models/adj.js");

router.get("/playarea", function(req, res) {
    adjectives.all(function(data) {
        var hbsObject = {
            adjectives: data
        };
        console.log(hbsObject);
        res.render("playarea", hbsObject);
    });
});

router.post("/playarea", function(req, res) {
    adjectives.create([
        "adjective", "description"
    ], [
        req.body.adjective, req.body.description
    ], function() {
        res.redirect("/");
    });
});


router.put("/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  userinfo.update({
    user_name: req.body.user_name
  }, condition, function() {
    res.redirect("/");
  });
});

// Export routes for server.js to use.
module.exports = router;
