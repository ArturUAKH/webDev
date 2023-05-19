"use strict";
//Функция конструктор не нуждается в return.
function User(name, id) {
    this.name = name;
    this.id = id;
    this.sayHello = function () {
        console.log(`Hello ${this.name}`);
    };
}

const ivan = new User("Ivan", 28);

const alex = new User("Alex", 23);

//Функция конструктор возвращает обьект User { name: 'Alex', id: 23, sayHello: [Function (anonymous)] }

console.log(ivan);
console.log(alex);

//В конструктор можно добавлять свойства и методы

User.prototype.exit = function () {
    console.log(`${this.name} вышел из сайта`);
};

ivan.exit();

//Со стандарта ES6 используються классы вместо конструкторов

class User {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.human = true;
    }
    hello() {
        console.log(`Hello ${this.name}`);
    }
}
