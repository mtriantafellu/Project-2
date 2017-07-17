var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true, height: 900, width: 1600 });
var nightmare1 = Nightmare({ show: true, height: 900, width: 1600 });
var nightmare2 = Nightmare({ show: true, height: 900, width: 1600 });
const MAXWAIT = 8000;

nightmare
    .goto('http://localhost:3000')

    .click(".btn-lg")
    .wait('button[btn-name="login"]')
    .type('input#name', null)
    .insert('input#name', 'C-3PO')
    .type('input#game', null)
    .insert('input#game', 'game2')
    .click('button[btn-name="login"]')
        ///one loop
        .wait('button')
        .wait(MAXWAIT*Math.random())
        .wait('button')
        .click('button')
            ///one loop
        .wait('button')
        .wait(MAXWAIT*Math.random())
        .wait('button')
        .click('button')
        .wait('button')
        .wait(MAXWAIT*Math.random())
        .wait('button')
        .click('button')
        .wait('button')
        .wait(MAXWAIT*Math.random())
        .wait('button')
        .click('button')
        .wait('button')
        .wait(MAXWAIT*Math.random())
        .wait('button')
        .click('button')
        .wait('button')
        .wait(MAXWAIT*Math.random())
        .wait('button')
        .click('button')

    .then(function (result) {
        console.log('I always let the wookie win... -C-3PO');
    })
    .catch(function (error) {
        console.error('Search failed:', error);
    });

nightmare1
    .goto('http://localhost:3000')

    .click(".btn-lg")
    .wait('button[btn-name="login"]')
    .type('input#game', null)
    .insert('input#game', 'game2')
    .type('input#name', null)
    .insert('input#name', 'Bender')
    .click('button[btn-name="login"]')
        ///one loop
        .wait('button')
        .wait(MAXWAIT*Math.random())
        .wait('button')
        .click('button')
        ///one loop
        .wait('button')
        .wait(MAXWAIT*Math.random())
        .wait('button')
        .click('button')
        .wait('button')
        .wait(MAXWAIT*Math.random())
        .wait('button')
        .click('button')
        .wait('button')
        .wait(MAXWAIT*Math.random())
        .wait('button')
        .click('button')
        .wait('button')
        .wait(MAXWAIT*Math.random())
        .wait('button')
        .click('button')
        .wait('button')
        .wait(MAXWAIT*Math.random())
        .wait('button')
        .click('button')

    .then(function (result) {
        console.log('gg, losers! -Bender');
    })
    .catch(function (error) {
        console.error('Search failed:', error);
    });

nightmare2
    .goto('http://localhost:3000')

    .click(".btn-lg")
    .wait('button[btn-name="login"]')
    .type('input#game', null)
    .insert('input#game', 'game2')
    .type('input#name', null)
    .insert('input#name', 'Johnny 5')
    .click('button[btn-name="login"]')
        ///one loop
        .wait('button')
        .wait(MAXWAIT*Math.random())
        .wait('button')
        .click('button')
        ///one loop
        .wait('button')
        .wait(MAXWAIT*Math.random())
        .wait('button')
        .click('button')
        .wait('button')
        .wait(MAXWAIT*Math.random())
        .wait('button')
        .click('button')
        .wait('button')
        .wait(MAXWAIT*Math.random())
        .wait('button')
        .click('button')
        .wait('button')
        .wait(MAXWAIT*Math.random())
        .wait('button')
        .click('button')

    .then(function (result) {
        console.log('A most satisfying game. I love human entertainment. -Johnny 5');
    })
    .catch(function (error) {
        console.error('Search failed:', error);
    });


