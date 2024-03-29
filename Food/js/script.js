import tabs from "./modules/tabs";
import timer from "./modules/timer";
import cards from "./modules/cards";
import form from "./modules/form";
import modal from "./modules/modal";
import calc from "./modules/calc";
import slider from "./modules/slider";
import { openModal } from "./modules/modal";

window.addEventListener("DOMContentLoaded", () => {
    const modalTimerId = setTimeout(
        () => openModal(".modal", modalTimerId),
        30000
    );
    tabs(
        ".tabheader__item",
        ".tabcontent",
        ".tabheader__items",
        "tabheader__item_active"
    );
    timer("2023-07-10");
    cards();
    form("form", modalTimerId, ".modal");
    modal("[data-modal]", ".modal", modalTimerId);
    calc();
    slider({
        slidesSel: ".offer__slide",
        sliderSel: ".offer__slider",
        prevSel: ".offer__slider-prev",
        nexSel: ".offer__slider-next",
        currSel: "#current",
        totalSel: "#total",
        wrapperSel: ".offer__slider-wrapper",
        fieldSel: ".offer__slider-inner"
    });
});
