"use strict";

const box = document.querySelector(".box");
//размер элемента без учета margin padding scroll
const width = box.clientWidth;
const height = box.clientHeight;
// Полная величина улемента с учетом margin padding
const widthOffset = box.offsetWidth;
const heightOffset = box.offsetHeight;
//Полная высотабширина элемента с учетом скролл
const widthScroll = box.scrollWidth;
const heightScroll = box.scrollHeight;
//Раскріваем єлемент на полную высоту по клику

const btn = document.querySelector("button");
// btn.addEventListener("click", () => {
//   box.style.height = box.scrollHeight + "px";
// });
// console.log(widthScroll, heightScroll);
//Получаем скрытый скролл сколько было скролено или сколько осталось до  конца скролла
btn.addEventListener("click", () => {
  console.log(box.scrollTop);
});

//Получение полных координат с помощью метода getBoundingClientRect()
console.log(box.getBoundingClientRect());
console.log(box.getBoundingClientRect().top); //получаем одно свойство

//получаем стили которые уже применились к эелементу
const style = window.getComputedStyle(box);

//Получение данных скролла у document пишется как document.documentElement

const testScroll = document.documentElement.scrollTop;

//Изменяем положение скролла scrollTo / scrollBy принимает два аргумента x,y
box.style.height = heightScroll + "px";
document.documentElement.scrollTo(0, 500); // Скролли от начала страницы
document.documentElement.scrollBy(0, 500); // Скролли от места где находитесь
