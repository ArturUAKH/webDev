"use strict";

// requestAnimationFrame() - что то на подобие set Interval

const big = document.querySelector(".parent"),
    small = document.querySelector(".child");
let pos = 0;

function myAnimation() {
    pos++;
    small.style.top = pos + "px";
    small.style.left = pos + "px";
    if (pos < 299) {
        requestAnimationFrame(myAnimation);
    }
}
//Для инициализация вызываеться внутренняя  requestAnimationFrame(myAnimation);
document
    .querySelector("button")
    .addEventListener("click", () => requestAnimationFrame(myAnimation));

//Отмена анимации

const id = requestAnimationFrame(myAnimation);
cancelAnimationFrame(id); // Анимация отменена
