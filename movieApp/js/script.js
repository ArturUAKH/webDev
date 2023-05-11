/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

"use strict";

const movieDB = {
	movies: [
		"Логан",
		"Лига справедливости",
		"Ла-ла лэнд",
		"Одержимость",
		"Скотт Пилигрим против...",
	],
};

const adv = document.querySelectorAll(".promo__adv img"),
	poster = document.querySelector(".promo__bg"),
	genre = poster.querySelector(".promo__genre"),
	movieList = document.querySelector(".promo__interactive-list"),
	form = document.querySelector(".add"),
	btn = form.querySelector("button"),
	inp = form.querySelector(".adding__input"),
	checkbox = form.querySelector('[type="checkbox"]');

form.addEventListener("submit", (e) => {
	e.preventDefault();

	if (inp.value.trim()) {
		if (inp.value.length > 20) {
			inp.value = `${inp.value.slice(0, 20)}...`;
			movieDB.movies.push(inp.value);
		}
		movieDB.movies.push(inp.value);
	}
	sortArr(movieDB.movies);
	createMovieList(movieDB.movies, movieList);
	form.reset();
});

const sortArr = (arr) => {
	arr.sort();
};
sortArr(movieDB.movies);

const removeAdv = (arr) => {
	arr.forEach((el) => {
		el.remove();
	});
};

const someChanges = () => {
	genre.innerText = "ДРАМА";

	poster.style.backgroundImage = "url('img/bg.jpg')";
};

const createMovieList = (films, parent) => {
	parent.innerHTML = "";

	films.sort();

	films.forEach((el, i) => {
		parent.innerHTML += `
		<li class="promo__interactive-item">${i + 1}. ${el}
		<div class="delete"></div></li>
		`;
	});

	document.querySelectorAll(".delete").forEach((el, i) => {
		el.addEventListener("click", () => {
			el.parentElement.remove();
			films.splice(i, 1);
			createMovieList(movieDB.movies, movieList);
		});
	});
};

sortArr(movieDB.movies);
createMovieList(movieDB.movies, movieList);
someChanges();
removeAdv(adv);
