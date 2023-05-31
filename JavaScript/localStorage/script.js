"use strict";
//localStorage это - обьект window который для хранения данных в виде ключ-значение
//Первый аргумент в примере  (number) - ключ, (5) - его значение.Если такой ключ уже существует то значение перезапишется

//localStorage.setItem("number", 5);

//Для получения значения
//console.log(localStorage.getItem("number"));

//Удаление элемента

//localStorage.removeItem("number"); //Теперь в localStorage ничего нет

//Также можно полностью очистить localStorage с помощью clear()

//localStorage.clear(); //Теперь localStorage полностью очищен

//Практика

const checkbox = document.querySelector("#checkbox"),
   form = document.querySelector("form"),
   change = document.querySelector("#color");

if (localStorage.getItem("isChecked")) {
   checkbox.checked = true;
}

if (localStorage.getItem("bg") === "changed") {
   form.style.backgroundColor = "red";
}
checkbox.addEventListener("change", () => {
   localStorage.setItem("isChecked", true);
});

change.addEventListener("click", () => {
   if (localStorage.getItem("bg") === "changed") {
      localStorage.removeItem("bg");
      form.style.backgroundColor = "#fff";
   } else {
      localStorage.setItem("bg", "changed");
      form.style.backgroundColor = "red";
   }
});

//Для правильного отображения обьекта в localStorage нужно сериализировать
//Самый простой способ сериализации через передать обьект как JSON
const persone = {
   name: "Alex",
   age: 25
};
const serialazedPerson = JSON.stringify(persone);

localStorage.setItem("alex", serialazedPerson);

console.log(JSON.parse(localStorage.getItem("alex"))); //Возвращаем обычный обьект

//При передаче обьекта напрямую получим [Object, Object]; что является некоректным
