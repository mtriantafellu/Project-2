/**
 * Created by Matt on 7/11/2017.
 */

/**
 * Created by Matt on 7/11/2017.
 */

// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var adjectives = {
    all: function(cb) {
        orm.all("adjectives", function(res) {
            cb(res);
        });
    },
    // The variables cols and vals are arrays.
    create: function(cols, vals, cb) {
        orm.create("adjectives", cols, vals, function(res) {
            cb(res);
        });
    },
    update: function(objColVals, condition, cb) {
        orm.update("adjectives", objColVals, condition, function(res) {
            cb(res);
        });
    }
};

// Export the database functions for the controller (catsController.js).
module.exports = adjectives;