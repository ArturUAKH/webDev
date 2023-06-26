'use strict';
//prettier-ignore
const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);

const upperFirst = word => word.charAt(0).toUpperCase() + word.slice(1);

const upperCapital = s => s.split(' ').map(upperFirst).join(' ');

const lower = s => s.replace(/\d/g, '*');

const myCompose = compose(lower, upperCapital);

console.log(myCompose('ala bla well 456'));

//Композиция с любым количеством аргументов

const composeWithArgs = (...fns) =>
  fns.reduceRight(
    (f, g) =>
      (...args) =>
        g(f(...args))
  );

const add1 = arr => arr.map(num => num + 1);
const addAll = arr =>
  arr.reduce((acc, curr) => {
    return acc + curr;
  }, 0);

const testComposeWithArgs = composeWithArgs(add1, addAll);

console.log(testComposeWithArgs([1, 2, 3]));

console.log([1, 2] + 1);

//Еще пример с вычислением скидки
//prettier-ignore
const composeDisc = (...fns) => x => fns.reduceRight((res, foo) => foo(res), x);

const divineTest = price => {
  return price / 100;
};

const multiplyTest = price => {
  return price * 20;
};

const addPrefiks = price => '$' + price;

let result = composeDisc(addPrefiks, multiplyTest, divineTest);

console.log(result(200));
