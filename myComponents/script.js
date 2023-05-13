"use strict";
//Вычисление количества страниц по количеству цифр в страницах
// function amountOfPages(summary) {
// 	let pages = 0;
// 	for (let i = 0; i < summary; i++) {
// 		pages++;
// 		if (pages >= 10 && pages < 100) {
// 			i++;
// 		} else if (pages >= 100 && pages < 1000) {
// 			i += 2;
// 		}
// 	}
// 	return pages;
// }
// console.log(amountOfPages(1095));

//Является ли строка панграммой

// function isPangram(str) {
// 	let string = str.toLowerCase();

// 	return "abcdefghijklmnopqrstuvwxyz".split("").every(function (x) {
// 		return string.indexOf(x) !== 1;
// 	});
// }

// console.log(deepCount([1, 2, [3, 4, [5]]]));

//Количество єлементов во вложенных массивах с помощью рекурсии(в т.ч. и сами массивы считаются за элемент )

// function deepCount(a) {
// 	result = a.length;

// 	for (let i = 0; i < a.length; i++) {
// 		if (Array.isArray(a[i])) {
// 			result += deepCount(a[i]);
// 		}
// 	}
// 	return result;
// }

// console.log(deepCount([[[[[[[[[]]]]]]]]]));

function fact(num) {
	if (num >= 1) {
		return num * fact(num - 1);
	} else {
		return 1
	}
}
console.log(fact(5));
