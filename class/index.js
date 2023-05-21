"use strict";
//Создание класса (this в классах ссылается на новосозданный обьект)
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    calcArea() {
        return this.width * this.height;
    }
}

const square = new Rectangle(10, 10); //Новосозданный обьект
console.log(square.calcArea()); //Метод полученный от класса

const square1 = new Rectangle(20, 10); // Новый созданный обьект с другими аргументами
console.log(square1.calcArea());

//Создание нового класса с наследование от Rectangle класса

class AnotherClass extends Rectangle {
    constructor(width, height, text, bgColor) {
        super(width, height); // Метод супер в дочернем классе создает все свойства и методы из наследуемого класса Rectangle и должен находится в самом начале и принимать в себя аргументы родителя
        this.text = text;
        this.color = bgColor;
    }
    showProps() {
        console.log(`Текст: ${this.text} Цвет: ${this.color}`);
    }
}

const testAnotherClass = new AnotherClass(10, 25, "Hello world", "red");

console.log(testAnotherClass.calcArea()); // наследуемый метод от родителя Rectangle
