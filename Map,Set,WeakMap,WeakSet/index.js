"use strict";

const shops = [{ rice: 500 }, { oli: 200 }, { bread: 50 }];

let map = new Map([[{ paper: 400 }, 8000]]); // добавляем начально значение в мап при создании
// Добавление в мап с помощью записи

// map.set(shops[0], 5000);
// map.set(shops[1], 15000);
// map.set(shops[2], 25000);
// map.set(shops[0], 5000).set(shops[1], 15000).set(shops[2], 25000);

// Добавление в мап с помощью ForEach

const budget = [5000, 15000, 25000];
shops.forEach((shop, i) => {
  map.set(shop, budget[i]);
});
console.log(map);

//Команды для получени и проверки мап

//console.log(map.get(shops[0]));
//console.log(map.has(shops[1]));
//map.delete(key); //Удаляет элемент по ключу
//map.clear(); // Полностью очищает мап
//map.size; // Количество элементов в мап

//Получаем элементы через map.keys();

let goods = [];

for (let shop of map.keys()) {
  goods.push(Object.keys(shop));
}

console.log(goods);

for (let price of map.values()) {
  console.log(price);
}

for (let entry of map.entries()) {
  console.log(entry);
}
//Деструктуризация мап в цилке
for (let [shop, price] of map.entries()) {
  console.log(price, shop);
}

//Форич для мап

map.forEach((key, value, map) => {
  console.log(key, value);
});

//Добавление всего обьекта в мап с помощью entries

const user = {
  name: "Jonh",
  id: 134,
  surname: "Walker"
};

const userMap = new Map(Object.entries(user));
console.log(userMap);

//Получаем object из мап

let newObj = Object.fromEntries(userMap);
console.log(newObj);
