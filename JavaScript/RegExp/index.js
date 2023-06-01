"use strict";
//Первый способ
//     new RegExp('pattern', 'flags');

//Второй способ
//     /pattern/flags

//ФЛАГИ

// i - поиск вне зависимости от регистра
// g - ищем несколько вхождений
// m - мнострочный режим

//Паттерны/классы

//  /./ - точка выбирает все на все элементы
//  /\./ - экранирование символов. если мы ищем именно точку а не все элементы перед ней нужно поставить слэш
//  /\d/ - ищем все цифры
//  /\w/ - ищем все буквы
//  /\s/ - ищем все пробелы
//
//  /\D/ - ищем не цифры
//  /\W/ - ищем не буквы
//  /\S/ - ищем не пробелы

const names = ["Ann", "John", "Sergey", "Nikolay"];

const reg = /n/gi;

//метод search(reg) ищет только первое совпадение
console.log(names[0].search(reg));

//Метод match() ищет все совпадени паттернна

console.log(names[0].match(reg));

//Метод replace()

const pass = ["Ann12NN....", "35JohnGG", "sSergey1", "Nikolay12KK"];

console.log(pass[0].replace(/\./g, "*"));

console.log("12-34-55".replace(/-/g, ":"));

//Метод регулярного выражения reg.test('STR') вернет true/false.

const pass1 = ["Ann12NN....", "35JohnGG", "sSergey1", "Nikolay12KK"];

const reg1 = /n/g;

console.log(reg1.test(pass1[0])); //true
console.log(reg1.test(pass1[2])); //false

const str = "My name is R2D2";

console.log(str.match(/\w\d\w\d/i));
