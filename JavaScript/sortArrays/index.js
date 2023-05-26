"use strict";

//FILTER
//Создаем условие и возвращаем элемент .Вернутся только те элементы которы прошли условие

const names = ["Ann", "Jonh", "Segey", "Oleg", "Valdemar"];

const shortNames = names.filter((name) => {
    return name.length < 5;
});
console.log(shortNames);

//MAP
//Применяет коллбэк к каждому элементу и возвращает новый массив
//В єтом примере сразу записываем результат в изначальный массив
//Но лучше создать отдельную переменную и поместить результаты туда
let answers = ["aNN", "DmitrIy", "ivaN"];

answers = answers.map((answer) => answer.toLowerCase());

console.log(answers);

//EVERY / SOME

const findNum = ["Vasya", 5, "Sonya"];

console.log(findNum.some((item) => typeof item === "number"));

const numbers = [5, 44, 83, "str"];

console.log(numbers.every((num) => typeof num === "number"));

//REDUCE
//Метод собирает массив в одно целое и возвращает результат

const fruits = ["apple", "pear", "plum"];

const resultFruits = fruits.reduce((sum, current) => {
    return `${sum}, ${current}`;
});
console.log(resultFruits);

const numbersReduce = [5, 65, 80, 25];

const resultReduce = numbersReduce.reduce((sum, current) => {
    return sum + current;
}, 10); //В этом приимере мы также передали начальное значение в коллбэк - 10 .
//начальное значение будет подставлено вместо sum при первом вызове
console.log(resultReduce);

//Используем chaining для обработки обьекта сразу несколькими методами
const testObj = {
    Ann: "person",
    Vova: "person",
    Cat: "animal",
    Dog: "animal"
};

const newArr = Object.entries(testObj)
    .filter((item) => item[1] === "person")
    .map((item) => item[0]);
console.log(newArr);
//Применяем указанные методы
const films = [
    {
        name: "Titanic",
        rating: 9
    },
    {
        name: "Die hard 5",
        rating: 5
    },
    {
        name: "Matrix",
        rating: 8
    },
    {
        name: "Some bad film",
        rating: 4
    }
];
// function showGoodFilms(arr){
//     return arr.filter((film) => film.rating >= 8);
// }

// console.log(showGoodFilms(films));

// function showListFilm(arr) {
//     return arr
//         .map((item) => item.name)
//         .reduce((sum, current) => `${sum},${current}`);
// }

// console.log(showListFilm(films));

function addFilmsId(arr) {
    return arr.map((item, i) => {
        item.id = i;
        return item;
    });
}
let transformedArray = addFilmsId(films);

const checkFilms = (arr) =>
    arr.every((film) => (film.id || film.id === 0 ? true : false));

console.log(checkFilms(transformedArray));

const funds = [
    { amount: -1400 },
    { amount: 2400 },
    { amount: -1000 },
    { amount: 500 },
    { amount: 10400 },
    { amount: -11400 }
];

const getTotalIncomeAmount = (data) => {
    data.some((item) => item.amount < 0)
        ? data.reduce((acc, curr) => acc + curr.amount, 0)
        : getTotalIncomeAmount(data);
};

getTotalIncomeAmount(funds);

console.log(-1400 + 2400 + -1000 + 500 + 10400 + -11400);

const getPositiveIncomeAmount = (data) => {
    return data
        .filter((item) => item.amount > 0)
        .reduce((acc, curr) => acc + curr.amount, 0);
};

console.log(getPositiveIncomeAmount(funds));
