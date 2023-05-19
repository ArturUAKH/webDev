"use strict";
//В use strict в глобальной функции this это - undefined. Без use strict this будет - window.
function showThis() {
    console.log(this);
    function showThisInner() {
        console.log(this); // В этом случае все будет идентично первому примеру
    }
}
//В методах обьекта this будет ссылаться на обьект в котором находиться метод

const obj = {
    name: "John",
    surName: "Test",
    hello: function () {
        console.log(this); // this = obj
        function foo() {
            console.log(this); //В таком случає this ведет себя как в первом примере т.к. foo не метод обьекта а функция в методе this = undefined или window
        }
        foo();
    }
};

//В конструкторах и классах  this ссылается на новосозданный обьект ivan

function User(name, id) {
    this.name = name;
    this.id = id;
    this.sayHello = function () {
        console.log(`Hello ${this.name}`);
    };
}

const ivan = new User("Ivan", 28);
console.log(ivan);

//Привязка контекста через apply,bind,call

function thisByBindApplyCall() {
    console.log(this);
    console.log(this.name);
}

const obj1 = {
    name: "Leon",
    surName: "Killer"
};

thisByBindApplyCall.call(obj1);
thisByBindApplyCall.apply(obj1);

function double(num) {
    return this * num;
}
const myBind = double.bind(2); //тут функция myBind жестко привазана к котексту 2
myBind(5); //Тут num = 5 this = 2

//this в стрелочной функции будет брать котнекст от родителя
const obj2 = {
    name: "Artur",
    show: function () {
        const say = () => {
            console.log(this);
        };
    }
};
obj2.show();
