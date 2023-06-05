"use strict";

const persone = {
   name: "Alex",
   age: 25,

   get userAge() {
      return this.age;
   },

   set userAge(num) {
      this.age = num;
   }
};
//При вызове get,set круглые скобки не ставятся
console.log(persone.userAge); //25

console.log((persone.userAge = 30)); // userAge = 30
console.log(persone.userAge); //30
