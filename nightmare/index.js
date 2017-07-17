var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true, height: 900, width: 1400 });
var nightmare1 = Nightmare({ show: true, height: 900, width: 1400 });
var nightmare2 = Nightmare({ show: true, height: 900, width: 1400 });

nightmare
    .goto('http://localhost:3000')

    .click(".btn-lg")
    .wait('button[btn-name="login"]')
    .type('input#name', null)
    .insert('input#name', 'Kevin')
    .click('button[btn-name="login"]')

    .then(function (result) {
        console.log(result);
    })
    .catch(function (error) {
        console.error('Search failed:', error);
    });

nightmare1
    .goto('http://localhost:3000')

    .click(".btn-lg")
    .wait('button[btn-name="login"]')
    .type('input#name', null)
    .insert('input#name', 'Matt B')
    .click('button[btn-name="login"]')
    .click('.play-card')

    .then(function (result) {
        console.log(result);
    })
    .catch(function (error) {
        console.error('Search failed:', error);
    });

nightmare2
    .goto('http://localhost:3000')

    .click(".btn-lg")
    .wait('button[btn-name="login"]')
    .type('input#name', null)
    .insert('input#name', 'Rhegi')
    .click('button[btn-name="login"]')

    .then(function (result) {
        console.log(result);
    })
    .catch(function (error) {
        console.error('Search failed:', error);
    });


