"use stirct";

function* generator() {
    yield "s";
    yield "c";
    yield "r";
    yield "i";
    yield "p";
    yield "t";
}

const str = generator();

console.log(str); //Неправильное чтение результат Object [Generator] {}
console.log(str); //Неправильное чтение результат Object [Generator] {}
console.log(str.next()); //{ value: 's', done: false } Метод next() возвращает обьект
console.log(str.next()); //{ value: 'c', done: false } Метод next() возвращает обьект
console.log(str.next()); //{ value: 'r', done: false } Метод next() возвращает обьект
console.log(str.next()); //{ value: 'i', done: false } Метод next() возвращает обьект
console.log(str.next()); //{ value: 'p', done: false } Метод next() возвращает обьект

//Для получение значения нужно обраться к обьекту

console.log(str.next().value); // 't'

console.log(str.next()); //{ value: undefined, done: true } Генератор закончил перебор

function* count(n) {
    for (let i = 0; i < n; i++) {
        yield i;
    }
}

//Запустить генератор все возможноые разы можно через
for (let k of count(5)) console.log(k);
//0, 1, 2, 3, 4

let counter = count(7);

console.log(counter.next()); //{ value: 0, done: false }
console.log(counter.next()); //{ value: 1, done: false }
console.log(counter.next()); //{ value: 2, done: false }
console.log(counter.next()); //{ value: 3, done: false }
console.log(counter.next()); //{ value: 4, done: false }
console.log(counter.next()); //{ value: 5, done: false }
console.log(counter.next()); //{ value: 6, done: false }
console.log(counter.next()); //{ value: undefined, done: true }
