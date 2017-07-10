var express = require("express");

var router = express.Router();

// Import the model (user.js) to use its database functions.

// need to change cat.js to card.js
var userinfo = require("../models/cat.js");

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
