"use strict";
const btn = document.querySelector(".btn");
// let timerId;
// let counter = 0;

// btn.addEventListener("click", () => {
//   timerId = setInterval(logger, 1000);
// });

// function logger() {
//   if (counter == 3) {
//     clearInterval(timerId);
//   }
//   counter++;
//   console.log("OK");
// }

//Рекурсивный setTimeOut

let recTimeOut = setTimeout(function log() {
  console.log("OK");
  recTimeOut = setTimeout(log, 500);
});

clearTimeout(recTimeOut);
// анимация с помощью setInterval
function animation() {
  let pos = 0;
  const box = document.querySelector(".box");

  setInterval(frame, 20);
  function frame() {
    if (pos === 300) {
      clearInterval(id);
    } else {
      pos++;
      box.style.top = pos + "px";
      box.style.left = pos + "px";
    }
  }
}

btn.addEventListener("click", animation);
