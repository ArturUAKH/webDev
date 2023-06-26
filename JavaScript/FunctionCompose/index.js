"use strict";

const compose =
  (...fns) =>
  x =>
    fns.reduceRight((acc, fn) => fn(acc), x);

const upperFirst = word => word.charAt(0).toUpperCase() + word.slice(1);

const upperCapital = s => s.split(" ").map(upperFirst).join(" ");

const lower = s => s.replace(/\d/g, "*");

const myCompose = compose(lower, upperCapital);

console.log(myCompose("ala bla well 456"));
