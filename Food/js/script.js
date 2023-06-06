"use strict";

window.addEventListener("DOMContentLoaded", () => {
    const tabs = require("./modules/tabs"),
        timer = require("./modules/timer"),
        cards = require("./modules/cards"),
        form = require("./modules/form"),
        modal = require("./modules/modal"),
        calc = require("./modules/calc"),
        slider = require("./modules/slider");

    tabs();
    timer();
    cards();
    form();
    modal();
    calc();
    slider();
});
