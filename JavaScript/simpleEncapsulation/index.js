"use strict";

//Инкапсуляция это отделение и сокрытие от внешного мира внутренностей программы

function User(name, age) {
    this.name = name;
    this.age = age;

    this.say = function () {
        console.log(`Имя - ${this.name}.Возраст ${this.age}`);
    };
}

const ivan = new User("Ivan", 25);
console.log(ivan.name);
console.log(ivan.age);

//Произошло вмешательство в обьект и изменение

ivan.age = 35;
ivan.name = "Alex";
ivan.say(); //Имя Alex возраст 35

//Пример инкапусляции на свойстве age на другой функции конструкторе

function Persone(name, age) {
    this.name = name;
    let personeAge = age; //Инкапсулируем свойство age в переменную и она будет недоступна из вне

    this.say = function () {
        console.log(`Возраст - ${personeAge}. Имя - ${this.name}`);
    };

    this.getAge = function () {
        return personeAge;
    };

    this.setAge = function (age) {
        if (typeof age === "number" && age > 0 && age < 110) {
            personeAge = age;
        } else {
            console.log("Недопустимые данные");
        }
    };
}
const artur = new Persone("Artur", 31);
artur.say();

//Пример простой инкапсуляции теперь artur age стало недоступно из вне.

console.log(artur.personeAge); //undefined
console.log(artur.age); //undefined
//Получаем либо устанавливаем возраст через метод функции конструктор

console.log(artur.getAge()); // 31
artur.setAge(50);
console.log(artur.getAge()); //Число 50 прошло проверку и было установлено

artur.setAge(300); //Число 300 не прошло проверку получили "Недопустимые данные"
console.log(artur.getAge()); //Получили старое значение т.к. 300 не прошло проверку

//ПРОСТАЯ ИНКАПСУЛЯЦИЯ В КЛАССАХ
class Persone1 {
    constructor(name, age) {
        this.name = name;
        let userAge = age; //Так не сработает
    }
    say() {
        console.log(`Возраст - ${personeAge}. Имя - ${this.name}`);
    }
}

const artur1 = new Persone1("Art", 31);
artur1.say(); //Ошибка инкапсуляция через переменную в классах не сработала

//ТАК СРАБОТАЕТ через get,set

class Persone2 {
    constructor(name, age) {
        this.name = name;
        this._age = age; //Нижний дефис не синтаксис а обозначение для программиста что мы не вмешиваемся в работу этого свойства напрямую а будем получать или устанавливать через get,set
    }
    say() {
        console.log(`Возраст - ${this._age}. Имя - ${this.name}`);
    }

    get age() {
        return this._age;
    }

    set age(age) {
        if (typeof age === "number" && age < 110 && age > 0) {
            this._age = age;
        } else {
            console.log(`Недопустимое значение`);
        }
    }
}

const vita = new Persone2("Vita", 51);

console.log(vita.age); //Получаем значение через get ! Не на прямую vita._age
vita.age = 55; //Изменили значениие через set
console.log(vita.age); //Получили новое значение 55 через get
vita.age = 190; //Значение 190 не прошло проверку set
console.log(vita.age); //осталось старое значение 55
vita.say();
